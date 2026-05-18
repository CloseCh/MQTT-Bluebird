import mqtt, { type MqttClient } from 'mqtt';
import type { Listener, MQTTTransport, UnsubscribeFn } from '../types/transport.types';

function makeListenerSet<T>() {
  const set = new Set<Listener<T>>();
  return {
    on: (callback: Listener<T>): UnsubscribeFn => { set.add(callback); return () => set.delete(callback); },
    emit: (payload: T) => set.forEach(callback => callback(payload)),
  };
}

export function createMQTTDirectTransport(): MQTTTransport {
  let client: MqttClient | null = null;
  const subscriptions = new Set<string>();

  const msgs = makeListenerSet<MQTTMessage>();
  const sysMsgs = makeListenerSet<MQTTMessage>();
  const subUpd = makeListenerSet<string[]>();
  const disc = makeListenerSet<undefined>();

  const mqttConnection = ({ endpoint, username, password }: MqttConnectionOptions) => {
    return new Promise<boolean>((resolve) => {
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
        const d = new Date();
        const timeStamp = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`;
        const msg: MQTTMessage = {
          topic,
          data: payload.toString('hex'),
          timeStamp,
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
  }

  const mqttDisconnect = () => {
    return new Promise<void>(resolve => {
      if (!client) { resolve(); return; }
      client.end(false, {}, () => {
        client = null;
        subscriptions.clear();
        resolve();
      });
    });
  }

  const publishMQTT = ({ topic, message, qos = 0, retain = false }: PublishPayload) => {
    return new Promise<void>((resolve, reject) => {
      const buffer = Array.isArray(message) ? Buffer.from(message) : message;
      client?.publish(
        topic, 
        buffer, 
        { qos, retain }, 
        err => err ? reject(err) : resolve()
      );
    });
  }

  const mqttSubscribe = (topics: string[]) => {
    const newTopics = topics.filter(topic => !subscriptions.has(topic));
    if (!newTopics.length) return Promise.resolve([]);
    return new Promise<string[]>((resolve, reject) => {
      client?.subscribe(newTopics, err => {
        if (err) { reject(err); return; }
        newTopics.forEach(topic => subscriptions.add(topic));
        subUpd.emit([...subscriptions]);
        resolve(newTopics);
      });
    });
  }

  const mqttUnsubscribe = (topics: string[]) => {
    return new Promise<string[]>((resolve, reject) => {
      client?.unsubscribe(topics, err => {
        if (err) { reject(err); return; }
        topics.forEach(t => subscriptions.delete(t));
        subUpd.emit([...subscriptions]);
        resolve(topics);
      });
    });
  }

  const mqttGetSubscriptions: MQTTTransport['mqttGetSubscriptions'] = () => Promise.resolve([...subscriptions]);

  const subscribeMQTT: MQTTTransport['subscribeMQTT'] = (callback) => msgs.on(callback);

  const systemMessage: MQTTTransport['systemMessage'] = (callback) => sysMsgs.on(callback);

  const onSubscriptionsUpdated: MQTTTransport['onSubscriptionsUpdated'] = (callback) => subUpd.on(callback);

  const onBrokerDisconnected: MQTTTransport['onBrokerDisconnected'] = (callback) => disc.on(callback);

  return {
    mqttConnection,
    mqttDisconnect,
    publishMQTT,
    mqttSubscribe,
    mqttUnsubscribe,
    mqttGetSubscriptions,
    subscribeMQTT,
    systemMessage,
    onSubscriptionsUpdated,
    onBrokerDisconnected,
  };
}
