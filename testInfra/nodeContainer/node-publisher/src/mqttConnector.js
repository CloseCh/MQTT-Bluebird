import mqtt from "mqtt";
import startPublishing from "./publisher.js";

export default function connectBrocker() {
  const client = mqtt.connect('mqtt://mosquitto:1883', {
    protocolVersion: 5,
    clientId: 'nodejs_publisher_' + Math.random().toString(16).substring(2, 8),
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('connect', () => {
    console.log('✓ Conectado al broker mosquitto\n');
    startPublishing(client);
  });

  client.on('error', (err) => {
    console.error('✗ Error de conexión:', err);
  });

  client.on('reconnect', () => {
    console.log('↻ Reconectando...');
  });
}