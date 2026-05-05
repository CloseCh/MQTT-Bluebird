import { getClient } from './mqttConnection.js';

export function publishMessage({ topic, message, qos = 0, retain = false }: PublishPayload): Promise<void> {
  const client = getClient();
  
  if (!client) {
    console.warn('No hay cliente MQTT conectado');
    return new Promise(resolve => resolve());
  }

  const buffer: Buffer = Array.isArray(message)
    ? Buffer.from(message)
    : Buffer.from(message, 'utf-8');

  return new Promise((resolve, reject) => {
    client.publish(topic, buffer, { qos, retain }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}