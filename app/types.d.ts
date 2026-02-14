//Global types
type MQTTmessage = {
  topic: string,
  data: unknown;
};

type EventPayloadMapping = {
  message: MQTTmessage;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (temperatura: MQTTmessage) => void) => void;
  };
}