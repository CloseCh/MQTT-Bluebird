import mqtt from 'mqtt';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util/until.js';

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'mqtt_client_' + Math.random().toString(16).substring(2, 8),
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

export function MQTTmessage(mainWindow: BrowserWindow) {
  client.on('message', (topic, data) => {
    const text = data.toString();

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text; // no es JSON → lo dejamos como string
    }
    console.log(parsed)
    ipcWebContentsSend('message', mainWindow.webContents, {
      topic,
      data: parsed
    });
  });
}

client.on('connect', () => {
  console.log('Conexion establecida');
  client.subscribe('#');
});