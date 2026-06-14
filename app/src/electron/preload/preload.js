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
  systemMessage: (callback) =>
    ipcOn('mqtt:systemMessage', (temp) => {
      callback(temp);
    }),
  onSubscriptionsUpdated: (callback) =>
    ipcOn('mqtt:subscriptionsUpdated', (subscriptions) => {
      callback(subscriptions);
    }),
  onBrokerDisconnected: (callback) =>
    ipcOn('mqtt:brokerDisconnected', () => {
      callback();
    }),

  publishMQTT: (message) =>
    ipcInvoke('mqttPublish', message),
  
  mqttSubscribe: (subscription) =>
    ipcInvoke('mqtt:subscribe', subscription),
  mqttUnsubscribe: (topic) =>
    ipcInvoke('mqtt:unsubscribe', topic),
  mqttGetSubscriptions: () =>
    ipcInvoke('mqtt:getSubscriptions', undefined),

  mqttConnection: (options) =>
    ipcInvoke('mqtt:connection', options),
  mqttDisconnect: () =>
    ipcInvoke('mqtt:disconnect', undefined),
});