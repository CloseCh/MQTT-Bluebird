import path from 'path';
import { app } from 'electron'
import { isDev } from './until.js';

export function getPreloadPath() {
  if (isDev()) {
    return path.join(app.getAppPath(), 'src/preload/preload.js');
  }
  return path.join(app.getAppPath(), 'dist-preload/preload.js');
}

export function getUIPath() {
  return path.join(app.getAppPath(), 'dist-react/index.html');
}