const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("stadistics", (_: any, stats: any) => {
      callback(stats);
    });
  },
  getStadisticData: () => electron.ipcRenderer.invoke('getStaticData'),
  subscribeTemperature: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("temperature", (_: any, temp: any) => {
      callback(temp);
    });
  },
})