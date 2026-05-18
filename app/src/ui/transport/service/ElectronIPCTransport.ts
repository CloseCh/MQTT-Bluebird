import type { MQTTTransport } from '../types/transport.types';

export function createElectronIPCTransport(): MQTTTransport {
  return {
    mqttConnection: (options) => window.electron.mqttConnection(options),
    mqttDisconnect: ()  => window.electron.mqttDisconnect(),
    publishMQTT:    (payload) => window.electron.publishMQTT(payload),
    mqttSubscribe:  (topics) => window.electron.mqttSubscribe(topics),
    mqttUnsubscribe:(topics) => window.electron.mqttUnsubscribe(topics),
    mqttGetSubscriptions: () => window.electron.mqttGetSubscriptions(),

    subscribeMQTT:          (callback) => window.electron.subscribeMQTT(callback),
    systemMessage:          (callback) => window.electron.systemMessage(callback),
    onSubscriptionsUpdated: (callback) => window.electron.onSubscriptionsUpdated(callback),
    onBrokerDisconnected:   (callback) => window.electron.onBrokerDisconnected(callback),
  };
}
