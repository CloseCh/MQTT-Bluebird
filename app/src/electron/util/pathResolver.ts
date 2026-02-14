import path from 'path';
import { app } from 'electron'
import { isDev } from './until.js';

export function getPreloadPath() {
  let preloadPath = path.join(
    app.getAppPath(),
    '../preload/preload.js'
  );

  if (isDev())
  preloadPath = path.join(
    app.getAppPath(),
    'src/preload/preload.js'
  );

  return preloadPath;
}

export function getUIPath() {
  return path.join(app.getAppPath(), '/dist-react/index.html');
}