import type { BrowserWindow, WebContents } from 'electron';
import { type IPublishPacket } from 'mqtt';
import { getClient } from './mqttConnection';
import { ipcMainHandleWithReturn, ipcWebContentsSend } from '../../util/util';

const SYS_SUBSCRIPTION: MqttSubscription = { topic: '$SYS/#', qos: 0 };

function defaultSubscriptions(): Map<string, MqttSubscription> {
  return new Map([[SYS_SUBSCRIPTION.topic, SYS_SUBSCRIPTION]]);
}

let activeSubscriptions: Map<string, MqttSubscription> = defaultSubscriptions();
let handlersRegistered: boolean = false;
let activeWebContents: WebContents | null = null;

function broadcastSubscriptions(): void {
  if (activeWebContents && !activeWebContents.isDestroyed()) {
    ipcWebContentsSend('mqtt:subscriptionsUpdated', activeWebContents, [...activeSubscriptions.values()]);
  }
}

export function setupSubscriptor(mainWindow: BrowserWindow): void {
  activeWebContents = mainWindow.webContents;

  if (!handlersRegistered) {
    handlersRegistered = true;

    ipcMainHandleWithReturn('mqtt:subscribe', (subscription) => {
      return new Promise((resolve, reject) => {
        const client = getClient();
        if (!client) return reject(new Error('Cliente MQTT no conectado'));

        client.subscribe(subscription.topic, { qos: subscription.qos }, (err) => {
          if (err) return reject(err);
          activeSubscriptions.set(subscription.topic, subscription);
          broadcastSubscriptions();
          resolve([...activeSubscriptions.values()]);
        });
      });
    });

    ipcMainHandleWithReturn('mqtt:unsubscribe', (topic) => {
      return new Promise((resolve, reject) => {
        const client = getClient();
        if (!client) return reject(new Error('Cliente MQTT no conectado'));

        client.unsubscribe(topic, (err) => {
          if (err) return reject(err);
          activeSubscriptions.delete(topic);
          broadcastSubscriptions();
          resolve([...activeSubscriptions.values()]);
        });
      });
    });

    ipcMainHandleWithReturn('mqtt:getSubscriptions', () => {
      return [...activeSubscriptions.values()];
    });
  }

  mainWindow.on('closed', () => {
    const client = getClient();
    if (client) client.end();
    activeWebContents = null;
    resetSubscriptions();
  });
}

export function setupClientListeners(mainWindow: BrowserWindow): void {
  const client = getClient();
  if (!client) return;

  if (activeSubscriptions.size > 0) {
    const subscriptionMap = Object.fromEntries(
      [...activeSubscriptions.values()].map(({ topic, qos }) => [topic, { qos }]),
    );
    client.subscribe(subscriptionMap, (err) => {
      if (err) console.error('Error re-subscribing on reconnect:', err);
    });
  }

  client.on('message', (topic: string, data: Buffer, packet: IPublishPacket) => {
    const date = new Date();
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`;

    const messageReceived: MQTTMessage = {
      topic,
      data: data.toString('hex'),
      timeStamp: time,
      packet
    };

    const isSysTopic: boolean = topic.startsWith('$SYS/');
    if (isSysTopic) {
      ipcWebContentsSend('mqtt:systemMessage', mainWindow.webContents, messageReceived);
    } else {
      ipcWebContentsSend('message', mainWindow.webContents, messageReceived);
    }
  });
}

export function resetSubscriptions(): void {
  activeSubscriptions = defaultSubscriptions();
}