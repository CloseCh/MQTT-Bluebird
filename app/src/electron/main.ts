import { app, BrowserWindow } from 'electron';
import { destroyClient } from './services/mqtt/mqttConnection.js';
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