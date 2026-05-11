import dotenv from 'dotenv';
dotenv.config();

import { app, BrowserWindow, Menu } from 'electron';
import { destroyClient, connectClient } from './services/mqtt/mqttConnection';
import createMainWindow from './window/mainWindow';
import { ipcMainHandleWithReturn, isDev } from './util/util';
import { setupClientListeners } from './services/mqtt/mqttSubscriptor';
import { publishMessage } from './services/mqtt/mqttPublisher';

app.on('ready', () => {
  if (!isDev()) {
    Menu.setApplicationMenu(null);
  }

  const mainWindow = createMainWindow();

  ipcMainHandleWithReturn('mqttPublish', (payload) => {
    publishMessage(payload);
  });

  ipcMainHandleWithReturn('mqtt:connection', (options) => {
    return new Promise((resolve) => {
      const client = connectClient(options);

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

  ipcMainHandleWithReturn('mqtt:disconnect', () => {
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