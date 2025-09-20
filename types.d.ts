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

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (stadistics: Statistics)=> void) => void;
    getStadisticData: () => Promise<StaticData>;
  };
}