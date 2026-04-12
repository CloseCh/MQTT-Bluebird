import path from 'path';
import { app } from 'electron'
import { isDev } from './until.js';

export function getPreloadPath() {
  if (isDev()) {
    console.log(path.join(app.getAppPath(), 'src/electron/preload/preload.js'))
    return path.join(app.getAppPath(), 'src/electron/preload/preload.js');
  }
  return path.join(app.getAppPath(), 'dist-preload/preload.js');
}

export function getUIPath() {
  return path.join(app.getAppPath(), 'dist-react/index.html');
}