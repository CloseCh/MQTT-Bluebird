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

interface EventPayloadMapping {
  message: MQTTmessage;
  mqttPublish: PublishPayload;

  // subscriptions
  'mqtt:subscribe': string[];
  'mqtt:unsubscribe': string[];
  'mqtt:getSubscriptions': void;
  'mqtt:subscriptionsUpdated': string[];

  // connection
  'mqtt:connection': MqttConnectionOptions
  'mqtt:disconnect': void;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
    publishMQTT: (message: PublishPayload) => void;

    mqttSubscribe: (topics: string[]) => Promise<string[]>;
    mqttUnsubscribe: (topics: string[]) => Promise<string[]>;
    mqttGetSubscriptions: () => Promise<string[]>;

    mqttConnection: (options: MqttConnectionOptions) => Promise<boolean>;
    mqttDisconnect: () => Promise<void>;
  };
}