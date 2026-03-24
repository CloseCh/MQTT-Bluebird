// ─────────────────────────────────────────────
// HELPERS: Decoders para cada tipo de mensaje
// ─────────────────────────────────────────────
import type { MessageFormatEnum } from "../features/messageRepresentacion/types/mqtt.types.js";
import { type MessageDecodedReturns } from "../types/types.js";

export default function messageDecoder(hexData: string, format: MessageFormatEnum): MessageDecodedReturns {
  const bytes = new Uint8Array(
    hexData.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  switch (format) {
    case 'ascii': return decodeString(bytes);
    case 'asciiCode': return decodeAscii(bytes);
    case 'hex': return decodeHex(hexData);
    case 'json': return decodeJson(bytes);
    default: return decodeString(bytes);
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
    return new TextDecoder('utf-8').decode(bytes);
  }
}