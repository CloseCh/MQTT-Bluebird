import { app, BrowserWindow } from 'electron';
import { destroyClient, getClient, connectClient } from './services/mqtt/mqttConnection.js';
import createMainWindow from './window/mainWindow.js';
import { ipcMainHandle, ipcMainHandleWithReturn } from './util/until.js';
import { setupClientListeners } from './services/mqtt/mqttSubscriptor.js';

app.on('ready', () => {
  const mainWindow = createMainWindow();

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

  ipcMainHandleWithReturn('mqtt:connection', (endpoint) => {
    return new Promise((resolve) => {
      const client = connectClient(endpoint);

      if (client.connected) {
        setupClientListeners(mainWindow);
        resolve(true);
        return;
      }

      client.once('connect', () => {
        setupClientListeners(mainWindow);
        resolve(true);
      });

      client.once('error', () => resolve(false));

      setTimeout(() => resolve(false), 5000);
    });
  });

  ipcMainHandle('mqtt:disconnect', () => {
    destroyClient();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  destroyClient();
});