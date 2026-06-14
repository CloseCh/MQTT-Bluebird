/// <reference types="vite/client" />
interface MQTTMessage {
  topic: string;
  data: string;
  timeStamp: string;
  packet: import('mqtt').IPublishPacket;
};

type MessageFormatEnum = 'UTF-8' | 'ASCIICode' | 'HEX' | 'int8' | 'uint8' | 'int16' | 'uint16'| 'int32' | 'uint32'| 'int64'| 'uint64';

interface PublishPayload {
  topic: string;
  message: string | number[];
  qos?: 0 | 1 | 2;
  retain?: boolean;
}

interface MqttConnectionOptions {
  endpoint: string;
  username?: string;
  password?: string;
}

interface MqttSubscription {
  topic: string;
  qos: 0 | 1 | 2;
}

interface EventPayloadMapping {
  // Message
  message: MQTTMessage;
  'mqtt:systemMessage': MQTTMessage;

  mqttPublish: PublishPayload;

  // subscriptions
  'mqtt:subscribe': MqttSubscription;
  'mqtt:unsubscribe': string;
  'mqtt:getSubscriptions': void;
  'mqtt:subscriptionsUpdated': MqttSubscription[];

  // broker lifecycle
  'mqtt:brokerDisconnected': void;

  // connection
  'mqtt:connection': MqttConnectionOptions
  'mqtt:disconnect': void;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTMessage) => void) => UnsubscribeFunction;
    systemMessage: (callback: (message: MQTTMessage) => void) => UnsubscribeFunction;
    onSubscriptionsUpdated: (callback: (subscriptions: MqttSubscription[]) => void) => UnsubscribeFunction;
    onBrokerDisconnected: (callback: () => void) => UnsubscribeFunction;

    publishMQTT: (message: PublishPayload) => Promise<void>;

    mqttSubscribe: (subscription: MqttSubscription) => Promise<MqttSubscription[]>;
    mqttUnsubscribe: (topic: string) => Promise<MqttSubscription[]>;
    mqttGetSubscriptions: () => Promise<MqttSubscription[]>;

    mqttConnection: (options: MqttConnectionOptions) => Promise<boolean>;
    mqttDisconnect: () => Promise<void>;
  };
}