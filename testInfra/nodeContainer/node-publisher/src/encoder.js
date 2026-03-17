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

export {encodeASCII, encodeHex, encodeJSON, encodeNumeric}