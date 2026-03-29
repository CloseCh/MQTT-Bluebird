import { app, BrowserWindow } from 'electron';
import { destroyClient } from './services/mqtt/mqttConnection.js';
import createMainWindow from './window/mainWindow.js';

app.on('ready', () => {
  createMainWindow();

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