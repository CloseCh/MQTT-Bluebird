import mqtt, { type MqttClient } from 'mqtt';
import { resetSubscriptions } from './mqttSubscriptor';

let client: MqttClient | null = null;

export function getClient(): MqttClient | null {
  return client;
}

export function connectClient({endpoint, username, password}: MqttConnectionOptions): MqttClient {
  if (client && (client.connected || client.reconnecting)) return client;
  if (client) { client.end(true); client = null; } // limpia zombie

  const url = new URL(endpoint);
  if (!['mqtt:', 'mqtts:', 'ws:', 'wss:'].includes(url.protocol)) {
    throw new Error(`Protocolo no soportado: ${url.protocol}`);
  }
  
  client = mqtt.connect(endpoint, {
    clientId: 'mqtt_bluebird_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 0,
    username: username || undefined,
    password: password || undefined,
  });

  client.on('error', (err) => {
    console.error('Error MQTT:', err);
  });

  client.on('close', () => {
    console.warn('Conexión MQTT cerrada');
    destroyClient();
  });

  client.on('offline', () => console.warn('Cliente MQTT desconectado / sin red'));

  return client;
}

export function destroyClient(): void {
  if (client) {
    client.end(true);
    client = null;
  }
  resetSubscriptions();
}