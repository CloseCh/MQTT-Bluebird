import { BrowserWindow } from 'electron';
import { getPreloadPath, getUIPath } from '../util/pathResolver.js';
import { isDev } from '../util/util.js';
import { setupSubscriptor } from '../services/mqtt/mqttSubscriptor.js';

function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    width: 1200,
    height: 800
  });

  if (!isDev()) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'F12') event.preventDefault();
    });
  }

  setupSubscriptor(mainWindow);
  

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123/#/login');
  } else {
    mainWindow.loadFile(getUIPath(), { hash: '/login' });
  }

  return mainWindow;
}

export default createMainWindow;