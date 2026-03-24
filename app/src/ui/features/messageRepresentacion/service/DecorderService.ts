import type { MessageFormatEnum } from "../types/mqtt.types.js";

export default function DecoderService(hexData: string, format: MessageFormatEnum) {
  const bytes = new Uint8Array(
    hexData.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  const view = new DataView(bytes.buffer);

  switch (format) {
    case 'ascii':   return decodeString(bytes);
    case 'asciiCode': return decodeAscii(bytes);
    case 'hex':     return decodeHex(hexData);
    case 'json':    return decodeJson(bytes);
    case 'int8':    return String(view.getInt8(0));
    case 'uint8':   return String(view.getUint8(0));
    case 'int16':   return String(view.getInt16(0, false));
    case 'uint16':  return String(view.getUint16(0, false));
    case 'int32':   return String(view.getInt32(0, false));
    case 'uint32':  return String(view.getUint32(0, false));
    case 'int64':   return String(view.getBigInt64(0, false));
    case 'uint64':  return String(view.getBigUint64(0, false));
    default:        return decodeString(bytes);
  }
}

function decodeString(bytes: Uint8Array) {
  return new TextDecoder('ascii').decode(bytes);
}

function decodeAscii(bytes: Uint8Array) {
  return Array.from(bytes)
    .map(b => b.toString(10))
    .join(' ');
}

function decodeHex(hexData: string) {
  return hexData.toUpperCase();
}

function decodeJson(bytes: Uint8Array) {
  try {
    const str = new TextDecoder('utf-8').decode(bytes);
    const parsed = JSON.parse(str);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return new TextDecoder('ascii').decode(bytes);
  }
}