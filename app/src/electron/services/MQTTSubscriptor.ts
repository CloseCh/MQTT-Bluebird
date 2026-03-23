import { BrowserWindow } from 'electron';
import { IPublishPacket } from 'mqtt';
import { connectClient } from './MQTTConnection.js';
import { ipcWebContentsSend } from '../util/until.js';

const subscriptions: string[] = ['#'];

export function setupSubscriptor(mainWindow: BrowserWindow): void {
  const client = connectClient();

  client.on('connect', () => {
    console.log('Conexion establecida');
    client.subscribe(subscriptions);
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
}