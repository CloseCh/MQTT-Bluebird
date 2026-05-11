import { app, ipcMain, type WebContents, type WebFrameMain } from 'electron';
import { getUIPath } from './pathResolver.js';
import { pathToFileURL } from 'url';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development' || !app.isPackaged;
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents, 
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function ipcMainHandleWithReturn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => unknown
) {
  ipcMain.handle(key, (event, payload: EventPayloadMapping[Key]) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) {
    throw new Error('El frame es null');
  }
  if (isDev() && new URL(frame.url).host === 'localhost:5123') {
    return;
  }
  const frameUrl = new URL(frame.url);
  const uiUrl = pathToFileURL(getUIPath());
  if (frameUrl.pathname !== uiUrl.pathname) {
    throw new Error('Malicious event');
  }
}