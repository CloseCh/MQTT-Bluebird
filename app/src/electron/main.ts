import { app, BrowserWindow } from 'electron';
import { destroyClient } from './services/mqtt/mqttConnection.js';
import createMainWindow from './window/mainWindow.js';
import { ipcMainHandle } from './util/until.js';
import { openWindow } from './services/window/openWindow.js';

app.on('ready', () => {
  const mainWindow = createMainWindow();

  ipcMainHandle('openWindow', (windowId) => {
    openWindow(windowId, mainWindow);
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