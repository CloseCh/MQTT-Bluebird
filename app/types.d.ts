//Global types
interface MQTTMessage {
  topic: string;
  data: Buffer;
  packet: import('mqtt').IPublishPacket;
};

type EventPayloadMapping = {
  message: MQTTmessage;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
  };
}