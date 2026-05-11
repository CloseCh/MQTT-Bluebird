import { BrowserWindow } from 'electron';
import { getPreloadPath, getUIPath } from '../util/pathResolver';
import { isDev } from '../util/util';
import { setupSubscriptor } from '../services/mqtt/mqttSubscriptor';

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