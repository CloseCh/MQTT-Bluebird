//Global types
type Statistics = {
  cpuUsage: number;
  ramUsage: number; 
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type MQTTmessage = {
  topic: string;
  numberMessage: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  message: MQTTmessage;
};


type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeMQTT: (callback: (temperatura: MQTTmessage) => void) => void;
  };
}