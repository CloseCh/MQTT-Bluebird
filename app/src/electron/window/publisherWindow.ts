import { BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "../util/pathResolver.js";
import { isDev } from "../util/until.js";

function publisherWindow(parent?: BrowserWindow): BrowserWindow {
  const publisherWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 800,
    height: 600,
    parent: parent
  });

  if (isDev()) {
    publisherWindow.loadURL('http://localhost:5123/#/publish'); 
  } else {
    publisherWindow.loadFile(getUIPath(), {hash: '/publish'});
  }

  return publisherWindow;
}

export default publisherWindow;