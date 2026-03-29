import mqtt, { MqttClient } from 'mqtt';

let client: MqttClient | null = null;
const broker: string = 'mqtt://localhost:1883';

export function getClient(): MqttClient | null {
  return client;
}

export function connectClient(): MqttClient {
  if (client) return client;

  client = mqtt.connect(broker, {
    clientId: 'mqtt_client_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('error', (err) => console.error('Error MQTT:', err));
  client.on('offline', () => console.warn('Cliente MQTT desconectado / sin red'));
  client.on('reconnect', () => console.log('Intentando reconectar...'));

  return client;
}

export function destroyClient(): void {
  if (client) {
    client.end(true);
    client = null;
  }
}