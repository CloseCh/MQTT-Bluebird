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

interface MQTTPacketList {
  topic: string;
  packet: import('mqtt').IPublishPacket;
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