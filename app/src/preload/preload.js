const electron = require('electron');

/**
 * @template {keyof EventPayloadMapping} Key
 * @param {Key} key
 * @returns {Promise<EventPayloadMapping[Key]>}
 */
function ipcInvoke(key) {
  return electron.ipcRenderer.invoke(key);
}

/**
 * @template {keyof EventPayloadMapping} Key
 * @param {Key} key
 * @param {(payload: EventPayloadMapping[Key]) => void} callback
 */
function ipcOn(key, callback) {
  const cb = (_, payload) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeMQTT: (callback) =>
    ipcOn('message', (temp) => {
      callback(temp);
    }),
});