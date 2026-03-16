import mqtt, { IPublishPacket, MqttClient } from 'mqtt';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from '../util/until.js';

let client : MqttClient | null = null;

let subscriptions : string[] = ['#'];

let brocker : string = 'mqtt://localhost:1883';

export function setupClient(mainWindow: BrowserWindow) : void {
  if (client) {
    return;
  }

  client = mqtt.connect(brocker, {
    clientId: 'mqtt_client_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('connect', () => {
    console.log('Conexion establecida');
    client!.subscribe(subscriptions);
  });

  client.on('message', (topic : string, data : Buffer, packet : IPublishPacket) => {
    const text = data.toString();
    
    let parsed: object | string;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
    
    ipcWebContentsSend('message', mainWindow.webContents, {
      topic,
      data: parsed,
      packet
    });
  });

  client.on('error', (err) => {
    console.error('Error MQTT:', err);
  });

  client.on('offline', () => {
    console.warn('Cliente MQTT desconectado / sin red');
  });

  client.on('reconnect', () => {
    console.log('Intentando reconectar...');
  });
}

export function destroyClient() : void {
  if (client) {
    client.end(true);
    client = null;
  }
}