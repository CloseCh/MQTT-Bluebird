
export default function EncoderService(value: string, format: MessageFormatEnum): Uint8Array {
  switch (format) {
    case 'ASCIICode': return encodeAscii(value);
    case 'HEX':       return encodeHex(value);
    case 'int8':      return encodeInt(view => view.setInt8(0, Number(value)), 1);
    case 'uint8':     return encodeInt(view => view.setUint8(0, Number(value)), 1);
    case 'int16':     return encodeInt(view => view.setInt16(0, Number(value), false), 2);
    case 'uint16':    return encodeInt(view => view.setUint16(0, Number(value), false), 2);
    case 'int32':     return encodeInt(view => view.setInt32(0, Number(value), false), 4);
    case 'uint32':    return encodeInt(view => view.setUint32(0, Number(value), false), 4);
    case 'int64':     return encodeBigInt(view => view.setBigInt64(0, BigInt(value), false), 8);
    case 'uint64':    return encodeBigInt(view => view.setBigUint64(0, BigInt(value), false), 8);
    default:          return new TextEncoder().encode(value);
  }
}

function encodeAscii(value: string): Uint8Array {
  const codes = value.trim().split(/[\s,]+/).map(Number);
  return new Uint8Array(codes);
}

function encodeHex(value: string): Uint8Array {
  const clean = value.replace(/\s/g, '');
  const pairs = clean.match(/.{1,2}/g) ?? [];
  return new Uint8Array(pairs.map(b => parseInt(b, 16)));
}

function encodeInt(setter: (view: DataView) => void, byteLength: number): Uint8Array {
  const buffer = new ArrayBuffer(byteLength);
  setter(new DataView(buffer));
  return new Uint8Array(buffer);
}

function encodeBigInt(setter: (view: DataView) => void, byteLength: number): Uint8Array {
  const buffer = new ArrayBuffer(byteLength);
  setter(new DataView(buffer));
  return new Uint8Array(buffer);
}
