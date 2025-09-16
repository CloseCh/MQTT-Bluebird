import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './until.js';
import { pollResources } from './ResourceManager.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  if (isDev()){
    mainWindow.loadURL('http://localhost:5123/');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
}

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  pollResources();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});