import type { MQTTTransport } from '../types/transport.types';

export function createElectronIPCTransport(): MQTTTransport {
  return {
    mqttConnection: (o) => window.electron.mqttConnection(o),
    mqttDisconnect: ()  => window.electron.mqttDisconnect(),
    publishMQTT:    (p) => window.electron.publishMQTT(p),
    mqttSubscribe:  (t) => window.electron.mqttSubscribe(t),
    mqttUnsubscribe:(t) => window.electron.mqttUnsubscribe(t),
    mqttGetSubscriptions: () => window.electron.mqttGetSubscriptions(),

    subscribeMQTT:          (cb) => window.electron.subscribeMQTT(cb),
    systemMessage:          (cb) => window.electron.systemMessage(cb),
    onSubscriptionsUpdated: (cb) => window.electron.onSubscriptionsUpdated(cb),
    onBrokerDisconnected:   (cb) => window.electron.onBrokerDisconnected(cb),
  };
}
