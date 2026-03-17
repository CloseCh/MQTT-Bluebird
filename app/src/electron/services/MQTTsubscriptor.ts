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
    const messageReceived: MQTTMessage = {
      topic,
      data: data.toString('hex'),
      packet
    };

    ipcWebContentsSend('message', mainWindow.webContents, messageReceived);
  });
}