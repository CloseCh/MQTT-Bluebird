import { BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "../util/pathResolver.js";
import { isDev } from "../util/until.js";
import { setupPublisher } from "../services/mqtt/mqttPublisher.js";

function publisherWindow(parent?: BrowserWindow) {
  const publisherWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 800,
    height: 600,
    parent: parent
  });

  if (isDev()) {
    publisherWindow.loadURL('http://localhost:5123/publish'); 
  } else {
    publisherWindow.loadFile(getUIPath(), {hash: '/publish'});
  }

  setupPublisher();
}

export default publisherWindow;