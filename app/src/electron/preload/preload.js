const { contextBridge, ipcRenderer } = require('electron');

/**
 * @template {keyof EventPayloadMapping} Key
 * @param {Key} key
 * @returns {Promise<EventPayloadMapping[Key]>}
 */
function ipcInvoke(key, payload) {
  return ipcRenderer.invoke(key, payload);
}

/**
 * @template {keyof EventPayloadMapping} Key
 * @param {Key} key
 * @param {(payload: EventPayloadMapping[Key]) => void} callback
 */
function ipcOn(key, callback) {
  const cb = (_, payload) => callback(payload);
  ipcRenderer.on(key, cb);
  return () => ipcRenderer.off(key, cb);
}

contextBridge.exposeInMainWorld('electron', {
  subscribeMQTT: (callback) =>
    ipcOn('message', (temp) => {
      callback(temp);
    }),
  publishMQTT: (message) =>
    ipcInvoke('mqttPublish', message),
  
  mqttSubscribe: (topics) =>
    ipcInvoke('mqtt:subscribe', topics),
  mqttUnsubscribe: (topics) =>
    ipcInvoke('mqtt:unsubscribe', topics),
  mqttGetSubscriptions: () =>
    ipcInvoke('mqtt:getSubscriptions', undefined),

  mqttConnection: (endpoint) =>
    ipcInvoke('mqtt:connection', endpoint),
  mqttDisconnect: () =>
    ipcInvoke('mqtt:disconnect', undefined),
});