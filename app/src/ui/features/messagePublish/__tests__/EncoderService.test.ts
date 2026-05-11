import { describe, it, expect } from 'vitest'
import type { MessageFormatEnum } from '@/features/messageRepresentacion'
import EncoderService from '../service/EncoderService'
import DecoderService from '@/features/messageRepresentacion/service/DecorderService'

const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

describe('EncoderService', () => {
  describe('UTF-8 (default)', () => {
    it('encodes plain ASCII string', () => {
      expect(EncoderService('Hello', 'UTF-8')).toEqual(new TextEncoder().encode('Hello'))
    })

    it('encodes empty string to empty Uint8Array', () => {
      expect(EncoderService('', 'UTF-8')).toEqual(new Uint8Array([]))
    })

    it('encodes multi-byte UTF-8 character (Euro sign)', () => {
      expect(EncoderService('€', 'UTF-8')).toEqual(new Uint8Array([0xe2, 0x82, 0xac]))
    })

    it('round-trip: UTF-8 encode then decode returns original string', () => {
      const encoded = EncoderService('Hello', 'UTF-8')
      expect(DecoderService(toHex(encoded), 'UTF-8')).toBe('Hello')
    })

    it('round-trip: JSON string is pretty-printed after decode', () => {
      const encoded = EncoderService('{"a":1}', 'UTF-8')
      expect(DecoderService(toHex(encoded), 'UTF-8')).toBe(JSON.stringify({ a: 1 }, null, 2))
    })
  })

  describe('HEX', () => {
    it('strips spaces and parses hex pairs', () => {
      expect(EncoderService('48 65 6c 6c 6f', 'HEX')).toEqual(
        new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
      )
    })

    it('handles lowercase hex', () => {
      expect(EncoderService('ff00', 'HEX')).toEqual(new Uint8Array([0xff, 0x00]))
    })

    it('handles uppercase hex', () => {
      expect(EncoderService('FF00', 'HEX')).toEqual(new Uint8Array([0xff, 0x00]))
    })

    it('empty string produces empty Uint8Array', () => {
      expect(EncoderService('', 'HEX')).toEqual(new Uint8Array([]))
    })

    it('round-trip: encode hex then decode returns uppercase hex', () => {
      const encoded = EncoderService('48656c6c6f', 'HEX')
      expect(DecoderService(toHex(encoded), 'HEX')).toBe('48656C6C6F')
    })
  })

  describe('ASCIICode', () => {
    it('parses space-separated decimal codes', () => {
      expect(EncoderService('72 105', 'ASCIICode')).toEqual(new Uint8Array([72, 105]))
    })

    it('parses comma-separated codes', () => {
      expect(EncoderService('72,105', 'ASCIICode')).toEqual(new Uint8Array([72, 105]))
    })

    it('parses mixed comma and space separators', () => {
      expect(EncoderService('72, 105', 'ASCIICode')).toEqual(new Uint8Array([72, 105]))
    })

    it('parses a single code', () => {
      expect(EncoderService('65', 'ASCIICode')).toEqual(new Uint8Array([65]))
    })

    it('round-trip: ASCIICode encode then decode returns decimal strings', () => {
      const encoded = EncoderService('72 105', 'ASCIICode')
      expect(DecoderService(toHex(encoded), 'ASCIICode')).toEqual(['72', '105'])
    })
  })

  describe('int8', () => {
    it('encodes 0 as [0x00]', () => {
      expect(EncoderService('0', 'int8')).toEqual(new Uint8Array([0x00]))
    })

    it('encodes 127 (max positive) as [0x7F]', () => {
      expect(EncoderService('127', 'int8')).toEqual(new Uint8Array([0x7f]))
    })

    it('encodes -1 as [0xFF]', () => {
      expect(EncoderService('-1', 'int8')).toEqual(new Uint8Array([0xff]))
    })

    it('encodes -128 (min) as [0x80]', () => {
      expect(EncoderService('-128', 'int8')).toEqual(new Uint8Array([0x80]))
    })

    it('round-trip: int8 127', () => {
      expect(DecoderService(toHex(EncoderService('127', 'int8')), 'int8')).toBe('127')
    })

    it('round-trip: int8 -1', () => {
      expect(DecoderService(toHex(EncoderService('-1', 'int8')), 'int8')).toBe('-1')
    })
  })

  describe('uint8', () => {
    it('encodes 0 as [0x00]', () => {
      expect(EncoderService('0', 'uint8')).toEqual(new Uint8Array([0x00]))
    })

    it('encodes 255 as [0xFF]', () => {
      expect(EncoderService('255', 'uint8')).toEqual(new Uint8Array([0xff]))
    })

    it('round-trip: uint8 255', () => {
      expect(DecoderService(toHex(EncoderService('255', 'uint8')), 'uint8')).toBe('255')
    })
  })

  describe('int16 (big-endian)', () => {
    it('encodes 1000 as [0x03, 0xE8]', () => {
      expect(EncoderService('1000', 'int16')).toEqual(new Uint8Array([0x03, 0xe8]))
    })

    it('encodes -1 as [0xFF, 0xFF]', () => {
      expect(EncoderService('-1', 'int16')).toEqual(new Uint8Array([0xff, 0xff]))
    })

    it('encodes -256 as [0xFF, 0x00]', () => {
      expect(EncoderService('-256', 'int16')).toEqual(new Uint8Array([0xff, 0x00]))
    })

    it('round-trip: int16 1000', () => {
      expect(DecoderService(toHex(EncoderService('1000', 'int16')), 'int16')).toBe('1000')
    })
  })

  describe('uint16', () => {
    it('encodes 65535 as [0xFF, 0xFF]', () => {
      expect(EncoderService('65535', 'uint16')).toEqual(new Uint8Array([0xff, 0xff]))
    })

    it('round-trip: uint16 65280', () => {
      expect(DecoderService(toHex(EncoderService('65280', 'uint16')), 'uint16')).toBe('65280')
    })
  })

  describe('int32', () => {
    it('encodes -1 as 4 bytes of 0xFF', () => {
      expect(EncoderService('-1', 'int32')).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff]))
    })

    it('encodes 1 as [0x00, 0x00, 0x00, 0x01]', () => {
      expect(EncoderService('1', 'int32')).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x01]))
    })

    it('round-trip: int32 -1', () => {
      expect(DecoderService(toHex(EncoderService('-1', 'int32')), 'int32')).toBe('-1')
    })
  })

  describe('uint32', () => {
    it('encodes 4294967295 as 4 bytes of 0xFF', () => {
      expect(EncoderService('4294967295', 'uint32')).toEqual(
        new Uint8Array([0xff, 0xff, 0xff, 0xff])
      )
    })

    it('round-trip: uint32 4294967295', () => {
      expect(
        DecoderService(toHex(EncoderService('4294967295', 'uint32')), 'uint32')
      ).toBe('4294967295')
    })
  })

  describe('int64', () => {
    it('encodes -1 as 8 bytes of 0xFF', () => {
      expect(EncoderService('-1', 'int64')).toEqual(
        new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
      )
    })

    it('encodes 1 as [0x00×7, 0x01]', () => {
      expect(EncoderService('1', 'int64')).toEqual(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01])
      )
    })

    it('round-trip: int64 -1', () => {
      expect(DecoderService(toHex(EncoderService('-1', 'int64')), 'int64')).toBe('-1')
    })
  })

  describe('uint64', () => {
    it('encodes 1 as [0x00×7, 0x01]', () => {
      expect(EncoderService('1', 'uint64')).toEqual(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01])
      )
    })

    it('round-trip: uint64 1', () => {
      expect(DecoderService(toHex(EncoderService('1', 'uint64')), 'uint64')).toBe('1')
    })
  })

  describe('unknown format falls back to UTF-8', () => {
    it('encodes using TextEncoder for unrecognised format', () => {
      const unknown = 'UNKNOWN' as MessageFormatEnum
      expect(EncoderService('test', unknown)).toEqual(new TextEncoder().encode('test'))
    })
  })
})
