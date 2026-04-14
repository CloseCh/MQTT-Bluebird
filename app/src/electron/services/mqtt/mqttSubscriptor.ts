import { BrowserWindow } from 'electron';
import { IPublishPacket } from 'mqtt';
import { connectClient } from './mqttConnection.js';
import { ipcMainHandleWithReturn, ipcWebContentsSend } from '../../util/until.js';

let activeSubscriptions: Set<string> = new Set();

export function setupSubscriptor(mainWindow: BrowserWindow): void {
  const client = connectClient();

  client.on('connect', () => {
    if (activeSubscriptions.size > 0) {
      client.subscribe([...activeSubscriptions]);
    }
  });

  client.on('message', (topic: string, data: Buffer, packet: IPublishPacket) => {
    const date = new Date();
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}:${String(date.getMilliseconds()).padStart(3, '0')}`;

    const messageReceived: MQTTMessage = {
      topic,
      data: data.toString('hex'),
      timeStamp: time,
      packet
    };

    ipcWebContentsSend('message', mainWindow.webContents, messageReceived);
  });

  ipcMainHandleWithReturn('mqtt:subscribe', (topics) => {
    return new Promise((resolve, reject) => {
      client.subscribe(topics, (err) => {
        if (err) return reject(err);
        topics.forEach(t => activeSubscriptions.add(t));
        resolve([...activeSubscriptions]);
      });
    });
  });

  ipcMainHandleWithReturn('mqtt:unsubscribe', (topics) => {
    return new Promise((resolve, reject) => {
      client.unsubscribe(topics, (err) => {
        if (err) return reject(err);
        topics.forEach(t => activeSubscriptions.delete(t));
        resolve([...activeSubscriptions]);
      });
    });
  });

  ipcMainHandleWithReturn('mqtt:getSubscriptions', () => {
    return [...activeSubscriptions];
  });
}