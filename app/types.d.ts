//Global types
type MQTTmessage = {
  topic: string,
  data: object | string;
};

type MQTTmessageList = {
  topic: string,
  data: Array<string>
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