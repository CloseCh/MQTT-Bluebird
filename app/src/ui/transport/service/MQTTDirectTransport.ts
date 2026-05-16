import mqtt, { type MqttClient } from 'mqtt';
import type { MQTTTransport, UnsubscribeFn } from '../types/transport.types';

type Listener<T> = (payload: T) => void;

function makeListenerSet<T>() {
  const set = new Set<Listener<T>>();
  return {
    on:   (cb: Listener<T>): UnsubscribeFn => { set.add(cb); return () => set.delete(cb); },
    emit: (payload: T) => set.forEach(cb => cb(payload)),
  };
}

export function createMQTTDirectTransport(): MQTTTransport {
  let client: MqttClient | null = null;
  const subscriptions = new Set<string>();

  const msgs    = makeListenerSet<MQTTMessage>();
  const sysMsgs = makeListenerSet<MQTTMessage>();
  const subUpd  = makeListenerSet<string[]>();
  const disc    = makeListenerSet<undefined>();

  return {
    mqttConnection({ endpoint, username, password }) {
      return new Promise((resolve) => {
        let url: URL;
        try { url = new URL(endpoint); }
        catch { resolve(false); return; }

        if (!['ws:', 'wss:'].includes(url.protocol)) {
          console.warn(`Protocolo "${url.protocol}" no soportado en modo web. Usa ws:// o wss://`);
          resolve(false);
          return;
        }

        client = mqtt.connect(endpoint, {
          clientId: 'mqtt_bluebird_' + Math.random().toString(16).substring(2, 8),
          clean: true,
          connectTimeout: 4000,
          reconnectPeriod: 0,
          username: username || undefined,
          password: password || undefined,
        });

        client.once('connect', () => {
          client!.subscribe('$SYS/#');
          subscriptions.add('$SYS/#');
          resolve(true);
        });

        client.once('error', () => resolve(false));

        client.on('message', (topic, payload, packet) => {
          const msg: MQTTMessage = {
            topic,
            data: payload.toString('hex'),
            timeStamp: new Date().toISOString(),
            packet,
          };
          if (topic.startsWith('$SYS/')) {
            sysMsgs.emit(msg);
          } else {
            msgs.emit(msg);
          }
        });

        client.on('close', () => {
          subscriptions.clear();
          disc.emit(undefined);
        });
      });
    },

    mqttDisconnect() {
      return new Promise(resolve => {
        if (!client) { resolve(); return; }
        client.end(false, {}, () => {
          client = null;
          subscriptions.clear();
          resolve();
        });
      });
    },

    publishMQTT({ topic, message, qos = 0, retain = false }) {
      return new Promise((resolve, reject) => {
        const buf = Array.isArray(message) ? Buffer.from(message) : message;
        client?.publish(topic, buf, { qos, retain }, err => err ? reject(err) : resolve());
      });
    },

    mqttSubscribe(topics) {
      const newTopics = topics.filter(t => !subscriptions.has(t));
      if (!newTopics.length) return Promise.resolve([]);
      return new Promise((resolve, reject) => {
        client?.subscribe(newTopics, err => {
          if (err) { reject(err); return; }
          newTopics.forEach(t => subscriptions.add(t));
          subUpd.emit([...subscriptions]);
          resolve(newTopics);
        });
      });
    },

    mqttUnsubscribe(topics) {
      return new Promise((resolve, reject) => {
        client?.unsubscribe(topics, err => {
          if (err) { reject(err); return; }
          topics.forEach(t => subscriptions.delete(t));
          subUpd.emit([...subscriptions]);
          resolve(topics);
        });
      });
    },

    mqttGetSubscriptions: () => Promise.resolve([...subscriptions]),

    subscribeMQTT:          (cb) => msgs.on(cb),
    systemMessage:          (cb) => sysMsgs.on(cb),
    onSubscriptionsUpdated: (cb) => subUpd.on(cb),
    onBrokerDisconnected:   (cb) => disc.on(cb),
  };
}
