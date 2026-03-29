import { BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "../util/pathResolver.js";
import { isDev } from "../util/until.js";
import { setupSubscriptor } from "../services/mqtt/mqttSubscriptor.js";

function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 1200,
    height: 800
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123/');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  setupSubscriptor(mainWindow);

  return mainWindow;
}

export default createMainWindow;