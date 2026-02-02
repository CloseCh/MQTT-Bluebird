import {ipcMain, app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './until.js';
import { getStaticData, pollResources } from './ResourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { MQTTmessage } from './MQTTsubscriptor.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 800,
    height: 600
  });

  if (isDev()){
    mainWindow.loadURL('http://localhost:5123/');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  // Envio de datos
  MQTTmessage(mainWindow);
  // pollResources(mainWindow);
  // ipcMain.handle('getStaticData', () => {
  //   return getStaticData();
  // });
};

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});