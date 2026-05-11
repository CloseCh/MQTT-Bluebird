import { BrowserWindow, type WebContents } from 'electron';
import { type IPublishPacket } from 'mqtt';
import { getClient } from './mqttConnection';
import { ipcMainHandleWithReturn, ipcWebContentsSend } from '../../util/util';

let activeSubscriptions: Set<string> = new Set(['$SYS/#']);
let handlersRegistered: boolean = false;
let activeWebContents: WebContents | null = null;

function broadcastSubscriptions(): void {
  if (activeWebContents && !activeWebContents.isDestroyed()) {
    ipcWebContentsSend('mqtt:subscriptionsUpdated', activeWebContents, [...activeSubscriptions]);
  }
}

export function setupSubscriptor(mainWindow: BrowserWindow): void {
  activeWebContents = mainWindow.webContents;

  if (!handlersRegistered) {
    handlersRegistered = true;

    ipcMainHandleWithReturn('mqtt:subscribe', (topics) => {
      return new Promise((resolve, reject) => {
        const client = getClient();
        if (!client) return reject(new Error('Cliente MQTT no conectado'));

        client.subscribe(topics, (err) => {
          if (err) return reject(err);
          topics.forEach(t => activeSubscriptions.add(t));
          broadcastSubscriptions();
          resolve([...activeSubscriptions]);
        });
      });
    });

    ipcMainHandleWithReturn('mqtt:unsubscribe', (topics) => {
      return new Promise((resolve, reject) => {
        const client = getClient();
        if (!client) return reject(new Error('Cliente MQTT no conectado'));

        client.unsubscribe(topics, (err) => {
          if (err) return reject(err);
          topics.forEach(t => activeSubscriptions.delete(t));
          broadcastSubscriptions();
          resolve([...activeSubscriptions]);
        });
      });
    });

    ipcMainHandleWithReturn('mqtt:getSubscriptions', () => {
      return [...activeSubscriptions];
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
    client.subscribe([...activeSubscriptions], (err) => {
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
  activeSubscriptions = new Set(['$SYS/#']);
}