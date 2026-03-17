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
  const clean = hexString.replace(/0x|[\s,]/gi, '');
  
  if (clean.length % 2 !== 0) {
    throw new Error(`Hex string inválido: longitud impar (${clean.length} chars)`);
  }

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

export {encodeASCII, encodeHex, encodeJSON, encodeNumeric, encodeCustom}