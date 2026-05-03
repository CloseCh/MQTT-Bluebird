import { getClient } from './mqttConnection.js';

export function publishMessage({ topic, message, qos = 0, retain = false }: PublishPayload): void {
  const client = getClient();
  
  if (!client) {
    console.warn('No hay cliente MQTT conectado');
    return;
  }

  const buffer: Buffer = Array.isArray(message)
    ? Buffer.from(message)
    : Buffer.from(message, 'utf-8');

  client.publish(topic, buffer, { qos, retain });
}