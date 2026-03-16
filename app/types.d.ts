//Global types
interface MQTTmessage {
  topic: string;
  data: object | string;
  packet: import('mqtt').IPublishPacket;
};

interface MQTTmessageList {
  topic: string;
  data: Array<string>;
}

type EventPayloadMapping = {
  message: MQTTmessage;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (message: MQTTmessage) => void) => void;
  };
}