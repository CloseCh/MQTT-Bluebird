import mqtt from "mqtt";

const client = mqtt.connect('mqtt://mosquitto:1883', {
  protocolVersion: 5,
  clientId: 'nodejs_publisher_' + Math.random().toString(16).substring(2, 8),
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

// ─────────────────────────────────────────────
// HELPERS: Encoders para cada tipo de mensaje
// ─────────────────────────────────────────────

/** ASCII: texto plano */
function encodeASCII(text) {
  return Buffer.from(text, 'ascii');
}

/** JSON: objeto serializado */
function encodeJSON(obj) {
  return Buffer.from(JSON.stringify(obj), 'utf8');
}

/** Numérico: int8, uint8, int16, uint16, int32, uint32, int64, uint64 */
function encodeNumeric(value, type) {
  const types = {
    int8:   { size: 1, method: 'writeInt8' },
    uint8:  { size: 1, method: 'writeUInt8' },
    int16:  { size: 2, method: 'writeInt16LE' },
    uint16: { size: 2, method: 'writeUInt16LE' },
    int32:  { size: 4, method: 'writeInt32LE' },
    uint32: { size: 4, method: 'writeUInt32LE' },
    // BigInt para 64 bits
    int64:  { size: 8, method: 'writeBigInt64LE' },
    uint64: { size: 8, method: 'writeBigUInt64LE' },
  };

  const t = types[type];
  if (!t) throw new Error(`Tipo numérico desconocido: ${type}`);

  const buf = Buffer.alloc(t.size);
  const val = (type === 'int64' || type === 'uint64') ? BigInt(value) : value;
  buf[t.method](val, 0);
  return buf;
}

/** HEX: string hexadecimal → buffer binario */
function encodeHex(hexString) {
  // Acepta tanto "DEADBEEF" como "DE AD BE EF" o "0xDE,0xAD"
  const clean = hexString.replace(/0x|[\s,]/gi, '');
  return Buffer.from(clean, 'hex');
}

/**
 * Custom: secuencia binaria mixta definida como array de elementos.
 * Cada elemento: { type, value }
 * Tipos soportados: 'int8','uint8','int16','uint16','int32','uint32',
 *                   'float32','float64','char','string'
 *
 * Ejemplo:
 *   [
 *     { type: 'uint8',   value: 0xAA },
 *     { type: 'float32', value: 3.14 },
 *     { type: 'string',  value: 'hello' },
 *     { type: 'int16',   value: -300 },
 *   ]
 */
function encodeCustom(fields) {
  const parts = fields.map(({ type, value }) => {
    switch (type) {
      case 'int8':    { const b = Buffer.alloc(1); b.writeInt8(value);      return b; }
      case 'uint8':   { const b = Buffer.alloc(1); b.writeUInt8(value);     return b; }
      case 'int16':   { const b = Buffer.alloc(2); b.writeInt16LE(value);   return b; }
      case 'uint16':  { const b = Buffer.alloc(2); b.writeUInt16LE(value);  return b; }
      case 'int32':   { const b = Buffer.alloc(4); b.writeInt32LE(value);   return b; }
      case 'uint32':  { const b = Buffer.alloc(4); b.writeUInt32LE(value);  return b; }
      case 'float32': { const b = Buffer.alloc(4); b.writeFloatLE(value);   return b; }
      case 'float64': { const b = Buffer.alloc(8); b.writeDoubleLE(value);  return b; }
      case 'char':    return Buffer.from([value.charCodeAt(0)]);
      case 'string':  return Buffer.from(value, 'utf8');
      default: throw new Error(`Tipo custom desconocido: ${type}`);
    }
  });
  return Buffer.concat(parts);
}

// ─────────────────────────────────────────────
// PUBLISHERS por tipo
// ─────────────────────────────────────────────

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
  const payload = encodeHex(hex);

  client.publish('test/hex', payload, { qos: 1 });
  console.log(`[HEX]     → "${hex}"  raw: 0x${payload.toString('hex').toUpperCase()}`);
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

// ─────────────────────────────────────────────
// LOOP PRINCIPAL
// ─────────────────────────────────────────────

function startPublishing() {
  console.log('Iniciando publicación de mensajes...\n');

  setInterval(publishASCII,   3000);
  setInterval(publishJSON,    5000);
  setInterval(publishNumeric, 15000);
  setInterval(publishHex,     4000);
  setInterval(publishCustom,  6000);

  // Primera ronda inmediata
  publishASCII();
  publishJSON();
  publishNumeric();
  publishHex();
  publishCustom();
}

// ─────────────────────────────────────────────
// EVENTOS MQTT
// ─────────────────────────────────────────────

client.on('connect', () => {
  console.log('✓ Conectado al broker mosquitto\n');
  startPublishing();
});

client.on('error', (err) => {
  console.error('✗ Error de conexión:', err);
});

client.on('reconnect', () => {
  console.log('↻ Reconectando...');
});