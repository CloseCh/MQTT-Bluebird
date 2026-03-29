//Global types
interface MQTTMessage {
  topic: string;
  data: string;
  timeStamp: string;
  packet: import('mqtt').IPublishPacket;
};

type MessageFormatEnum = 'ascii' | 'hex' | 'json' | 'asciiCode' | 'int8'| 'uint8'| 'int16'| 'uint16'| 'int32'| 'uint32'| 'int64'| 'uint64';

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
  openWindow: string;
  closedWindow: string;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
    publishMQTT: (message: PublishPayload) => Promise<void>;
    openWindow: (windowId: string) => Promise<void>;
    closedWindow: (callback: (windowId: string) => void) => void;
  };
}