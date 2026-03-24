//Global types
interface MQTTMessage {
  topic: string;
  data: string;
  timeStamp: string;
  packet: import('mqtt').IPublishPacket;
};

interface MQTTMessageList {
  messageList: MQTTMessage[];
  format: MessageTypes;
};

interface PublishPayload {
  topic: string;
  payload: string;
  format: 'hex' | 'string' | 'ascii' | 'json' | 'number';
  qos?: 0 | 1 | 2;
  retain?: boolean;
}

type EventPayloadMapping = {
  message: MQTTmessage;
  mqttPublish: PublishPayload;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
    publishMQTT: (message: PublishPayload) => Promise<void>;
  };
}