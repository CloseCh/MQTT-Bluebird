import mqtt, { MqttClient } from 'mqtt';

let client: MqttClient | null = null;

export function getClient(): MqttClient | null {
  return client;
}

export function connectClient(endpoint: string): MqttClient {
  if (client) return client;

  const url = new URL(endpoint);
  if (!['mqtt:', 'mqtts:', 'ws:', 'wss:'].includes(url.protocol)) {
    throw new Error(`Protocolo no soportado: ${url.protocol}`);
  }

  client = mqtt.connect(endpoint, {
    clientId: 'mqtt_client_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 0,
  });

  client.on('error', (err) => {
    console.error('Error MQTT:', err);
    
    if (isUnrecoverableError(err)) {
      destroyClient();
    }
  });

  client.on('offline', () => console.warn('Cliente MQTT desconectado / sin red'));

  return client;
}

export function destroyClient(): void {
  if (client) {
    client.end(true);
    client = null;
  }
}

function isUnrecoverableError(err: Error): boolean {
  const msg = err.message.toLowerCase();
  
  return (
    msg.includes('not authorized') ||
    msg.includes('bad user name') ||
    msg.includes('connection refused') ||
    msg.includes('invalid protocol')
  );
}