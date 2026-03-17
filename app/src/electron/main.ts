import { app, BrowserWindow} from 'electron';
import { isDev } from './util/until.js';
import { getPreloadPath, getUIPath } from './util/pathResolver.js';
import { setupSubscriptor } from './services/MQTTsubscriptor.js';
import { destroyClient } from './services/MQTTConnection.js';
import { setupPublisher } from './services/MQTTpublisher.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 1200,
    height: 800
  });

  if (isDev()){
    mainWindow.loadURL('http://localhost:5123/');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  // Envio de datos
  setupSubscriptor(mainWindow);
  setupPublisher();
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

  destroyClient();
});