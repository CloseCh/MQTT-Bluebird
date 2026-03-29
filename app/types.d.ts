//Global types
interface MQTTMessage {
  topic: string;
  data: string;
  timeStamp: string;
  packet: import('mqtt').IPublishPacket;
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
  openWindow: number;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
    publishMQTT: (message: PublishPayload) => Promise<void>;
    openWindow: (windowId: number) => Promise<void>;
  };
}