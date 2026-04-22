import { app, BrowserWindow } from 'electron';
import { destroyClient, getClient } from './services/mqtt/mqttConnection.js';
import createMainWindow from './window/mainWindow.js';
import { ipcMainHandle, ipcWebContentsSend } from './util/until.js';
import { openWindow, closeWindow } from './services/window/windowManagement.js';

app.on('ready', () => {
  const mainWindow = createMainWindow();

  ipcMainHandle('openWindow', (windowId) => {
    const window: BrowserWindow | null = openWindow(windowId, mainWindow);
    
    window?.on('closed', () => {
      closeWindow(windowId);
      ipcWebContentsSend('closedWindow', mainWindow.webContents, windowId);
    });
  });

  ipcMainHandle('mqttPublish', (payload) => {
    const client = getClient();
    if (!client) {
      throw new Error('MQTT client no está conectado');
    }
    client.publish(payload.topic, payload.payload, {
      qos: payload.qos ?? 0,
      retain: payload.retain ?? false,
    });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  destroyClient();
});