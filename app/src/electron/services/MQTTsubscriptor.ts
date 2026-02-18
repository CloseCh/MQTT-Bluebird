import mqtt, { MqttClient } from 'mqtt';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from '../util/until.js';

let client : MqttClient | null = null;

const subscriptions : string[] = ['#'];

export function setupClient(mainWindow: BrowserWindow) : void {
  if (client) {
    return;
  }

  client = mqtt.connect('mqtt://localhost:1883', {
    clientId: 'mqtt_client_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('connect', () => {
    console.log('Conexion establecida');
    client!.subscribe(subscriptions);
  });

  client.on('message', (topic, data) => {
    const text = data.toString();
    console.log(topic)
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