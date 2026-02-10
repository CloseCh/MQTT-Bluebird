import mqtt from "mqtt";

const client = mqtt.connect('mqtt://mosquitto:1883', {
  protocolVersion: 5,
  clientId: 'nodejs_publisher' + Math.random.toString(16).substring(2, 8),
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

function publishMessage() {
  setInterval(() => {
    const temperatura = (Math.random() * 10 + 20).toFixed(2);
    
    const payload = {
      temperatura: parseFloat(temperatura),
      timestamp: new Date().toISOString()
    };

    client.publish('sensor/temperatura', JSON.stringify(payload), {
      qos: 1
    });
  }, 5000);
  
}

client.on('connect', () => {
  console.log('Conectado al broker mosquitto');

  publishMessage();
})


client.on('error', (err) => {
  console.error('Error de conexión:', err);
});