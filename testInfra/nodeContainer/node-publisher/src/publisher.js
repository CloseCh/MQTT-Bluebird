import {
  encodeASCII, 
  encodeCustom,
  encodeHex,
  encodeJSON,
  encodeNumeric
} from "./encoder.js"
import client from "./mqttConnector.js";

function publishASCII() {
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

function publishJSON() {
  const payload = encodeJSON({
    temperatura: parseFloat((Math.random() * 10 + 20).toFixed(2)),
    humedad:     parseFloat((Math.random() * 30 + 50).toFixed(1)),
    timestamp:   new Date().toISOString(),
  });

  client.publish('test/json', payload, { qos: 1 });
  console.log(`[JSON]    → ${payload.toString()}`);
}

function publishNumeric() {
  const types = ['int8','uint8','int16','uint16','int32','uint32','int64','uint64'];

  for (const type of types) {
    let value;
    switch (type) {
      case 'int8':   value = Math.floor(Math.random() * 256) - 128; break;
      case 'uint8':  value = Math.floor(Math.random() * 256);       break;
      case 'int16':  value = Math.floor(Math.random() * 65536) - 32768; break;
      case 'uint16': value = Math.floor(Math.random() * 65536);     break;
      case 'int32':  value = Math.floor(Math.random() * 2**31) * (Math.random() < 0.5 ? -1 : 1); break;
      case 'uint32': value = Math.floor(Math.random() * 2**32);     break;
      case 'int64':  value = BigInt(Math.floor(Math.random() * 1e15)) * (Math.random() < 0.5 ? -1n : 1n); break;
      case 'uint64': value = BigInt(Math.floor(Math.random() * 1e15)); break;
    }

    const payload = encodeNumeric(value, type);
    client.publish(`test/numeric/${type}`, payload, { qos: 1 });
    console.log(`[NUMERIC] ${type.padEnd(6)} → ${value}  (${payload.toString('hex')})`);
  }
}

function publishHex() {
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

function publishCustom() {
  const temp = Math.random() * 10 + 20;
  const rpm  = Math.floor(Math.random() * 3000 + 500);
  const flag = Math.random() > 0.5 ? 1 : 0;

  // Trama binaria: [header uint8][temp float32][rpm uint16][flag int8][label string]
  const payload = encodeCustom([
    { type: 'uint8',   value: 0xA5 },         // magic byte / header
    { type: 'float32', value: temp },          // temperatura
    { type: 'uint16',  value: rpm },           // RPM motor
    { type: 'int8',    value: flag ? 1 : -1 }, // estado (activo/inactivo)
    { type: 'float64', value: Date.now() / 1000 }, // timestamp unix
    { type: 'string',  value: 'END' },         // terminador
  ]);

  client.publish('test/custom', payload, { qos: 1 });
  console.log(`[CUSTOM]  → temp=${temp.toFixed(2)} rpm=${rpm} flag=${flag}  (${payload.length} bytes: ${payload.toString('hex')})`);
}

export {publishASCII, publishCustom, publishHex, publishJSON, publishNumeric}