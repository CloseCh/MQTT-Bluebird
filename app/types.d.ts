/// <reference types="vite/client" />
interface MQTTMessage {
  topic: string;
  data: string;
  timeStamp: string;
  packet: import('mqtt').IPublishPacket;
};

type MessageFormatEnum = 'UTF-8' | 'ASCIICode' | 'HEX' | 'int8' | 'uint8' | 'int16' | 'uint16'| 'int32' | 'uint32'| 'int64'| 'uint64';;

interface PublishPayload {
  topic: string;
  payload: string;
  format: MessageFormatEnum;
  qos?: 0 | 1 | 2;
  retain?: boolean;
}

type EventPayloadMapping = {
  message: MQTTmessage;
  mqttPublish: PublishPayload;

  // subscriptions
  'mqtt:subscribe': string[];
  'mqtt:unsubscribe': string[];
  'mqtt:getSubscriptions': void;
  'mqtt:subscriptionsUpdated': string[];

  // connection
  'mqtt:connection': string
  'mqtt:disconnect': void;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
    publishMQTT: (message: PublishPayload) => Promise<void>;

    mqttSubscribe: (topics: string[]) => Promise<string[]>;
    mqttUnsubscribe: (topics: string[]) => Promise<string[]>;
    mqttGetSubscriptions: () => Promise<string[]>;

    mqttConnection: (endpoint: string) => Promise<boolean>;
    mqttDisconnect: () => Promise<void>;
  };
}