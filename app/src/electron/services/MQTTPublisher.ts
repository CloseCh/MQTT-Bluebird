import { getClient } from './MQTTConnection.js';
import { ipcMainHandle } from '../util/until.js';

export function setupPublisher(): void {
  ipcMainHandle('mqttPublish', (message) => {
    publishMessage(message);
  });
}

export function publishMessage({ topic, payload, format, qos = 1, retain = false }: PublishPayload): void {
  const client = getClient();
  if (!client) {
    console.warn('No hay cliente MQTT conectado');
    return;
  }

  let buffer: Buffer;

  switch (format) {
    case 'hex':
      buffer = Buffer.from(payload.replace(/0x|[\s,]/gi, ''), 'hex');
      break;
    case 'number':
      buffer = Buffer.alloc(4);
      buffer.writeFloatBE(parseFloat(payload), 0);
      break;
    case 'json':
    case 'string':
    case 'ascii':
    default:
      buffer = Buffer.from(payload, 'utf-8');
      break;
  }

  client.publish(topic, buffer, { qos, retain });
}