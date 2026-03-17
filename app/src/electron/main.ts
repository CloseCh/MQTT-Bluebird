import { app, BrowserWindow} from 'electron';
import { isDev } from './util/until.js';
import { getPreloadPath, getUIPath } from './util/pathResolver.js';
import { setupClient, destroyClient } from './services/MQTTsubscriptor.js';

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
  setupClient(mainWindow);
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