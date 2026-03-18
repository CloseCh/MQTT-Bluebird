import {
  encodeASCII,
  encodeHex,
  encodeJSON,
  encodeNumeric
} from "./encoder.js"

function publishASCII(client) {
  const messages = [
    'Hola desde MQTT',
    'Status: OK',
    `Uptime: ${process.uptime().toFixed(0)}s`,
  ];
  const text = messages[Math.floor(Math.random() * messages.length)];
  const payload = encodeASCII(text);

  client.publish('test/ascii', payload, { qos: 1 });
  console.log(`[ASCII]   → "${text}"`);
}

function publishJSON(client) {
  const payload = encodeJSON({
    temperatura: parseFloat((Math.random() * 10 + 20).toFixed(2)),
    humedad: parseFloat((Math.random() * 30 + 50).toFixed(1)),
    timestamp: new Date().toISOString(),
  });

  client.publish('test/json', payload, { qos: 1 });
  console.log(`[JSON]    → ${payload.toString()}`);
}

function publishNumeric(client) {
  let value, type;
  let num = Math.floor(Math.random() * 8);

  switch (num) {
    case 0 : 
      value = Math.floor(Math.random() * 256) - 128; 
      type = 'int8';
      break;
    case 1 : 
      value = Math.floor(Math.random() * 256); 
      type = 'uint8';
      break;
    case 2 : 
      value = Math.floor(Math.random() * 65536) - 32768; 
      type = 'int16';
      break;
    case 3 : 
      value = Math.floor(Math.random() * 65536); 
      type = 'uint16';
      break;
    case 4 : 
      value = Math.floor(Math.random() * 2 ** 31) * (Math.random() < 0.5 ? -1 : 1); 
      type = 'int32';
      break;
    case 5 : 
      value = Math.floor(Math.random() * 2 ** 32); 
      type = 'uint32';
      break;
    case 6 : 
      value = BigInt(Math.floor(Math.random() * 1e15)) * (Math.random() < 0.5 ? -1n : 1n); 
      type = 'int64';
      break;
    case 7 : 
      value = BigInt(Math.floor(Math.random() * 1e15)); 
      type = 'uint64';
      break;
  }

  const payload = encodeNumeric(value, type);
  client.publish(`test/numeric/${type}`, payload, { qos: 1 });
  console.log(`[NUMERIC] ${type.padEnd(6)} → ${value}  (${payload.toString('hex')})`);
}

function publishHex(client) {
  const samples = [
    'DEADBEEF',
    'CA FE BA BE',
    '0x00,0xFF,0x7F,0x80',
    'AABBCCDDEEFF',
  ];
  const hex = samples[Math.floor(Math.random() * samples.length)];

  try {
    const payload = encodeHex(hex);
    client.publish('test/hex', payload, { qos: 1 });
    console.log(`[HEX]     → "${hex}"  raw: 0x${payload.toString('hex').toUpperCase()}`);
  } catch (err) {
    console.error(`[HEX] Error al codificar "${hex}":`, err.message);
  }
}

export default function startPublishing(client) {
  console.log('Iniciando publicación de mensajes...\n');

  setInterval(() => publishASCII(client), 3000);
  setInterval(() => publishJSON(client), 5000);
  setInterval(() => publishNumeric(client), 15000);
  setInterval(() => publishHex(client), 4000);

  publishASCII(client);
  publishJSON(client);
  publishNumeric(client);
  publishHex(client);
}


export { publishASCII, publishHex, publishJSON, publishNumeric }