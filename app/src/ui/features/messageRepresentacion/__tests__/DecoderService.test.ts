import { describe, it, expect } from 'vitest'
import DecoderService from '../service/DecorderService'

const toHex = (str: string) =>
  Array.from(new TextEncoder().encode(str))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

describe('DecoderService', () => {
  describe('UTF-8', () => {
    it('decodes plain text', () => {
      expect(DecoderService(toHex('Hello'), 'UTF-8')).toBe('Hello')
    })

    it('pretty-prints valid JSON', () => {
      const result = DecoderService(toHex('{"key":"value"}'), 'UTF-8')
      expect(result).toBe(JSON.stringify({ key: 'value' }, null, 2))
    })

    it('returns raw text when JSON is invalid', () => {
      expect(DecoderService(toHex('not json'), 'UTF-8')).toBe('not json')
    })
  })

  describe('HEX', () => {
    it('returns the hex string in uppercase', () => {
      expect(DecoderService('48656c6c6f', 'HEX')).toBe('48656C6C6F')
    })

    it('already-uppercase hex stays the same', () => {
      expect(DecoderService('FF00', 'HEX')).toBe('FF00')
    })
  })

  describe('ASCIICode', () => {
    it('returns decimal values of each byte', () => {
      // "Hi" = [0x48, 0x69] = [72, 105]
      expect(DecoderService('4869', 'ASCIICode')).toEqual(['72', '105'])
    })

    it('handles a single byte', () => {
      // 0xFF = 255
      expect(DecoderService('ff', 'ASCIICode')).toEqual(['255'])
    })
  })

  describe('int8', () => {
    it('decodes 0xFF as -1', () => {
      expect(DecoderService('ff', 'int8')).toBe('-1')
    })

    it('decodes 0x7F as 127 (max positive)', () => {
      expect(DecoderService('7f', 'int8')).toBe('127')
    })

    it('decodes 0x80 as -128 (min negative)', () => {
      expect(DecoderService('80', 'int8')).toBe('-128')
    })
  })

  describe('uint8', () => {
    it('decodes 0xFF as 255', () => {
      expect(DecoderService('ff', 'uint8')).toBe('255')
    })

    it('decodes 0x00 as 0', () => {
      expect(DecoderService('00', 'uint8')).toBe('0')
    })
  })

  describe('int16 (big-endian)', () => {
    it('decodes 0xFFFF as -1', () => {
      expect(DecoderService('ffff', 'int16')).toBe('-1')
    })

    it('decodes 0xFF00 as -256', () => {
      expect(DecoderService('ff00', 'int16')).toBe('-256')
    })

    it('decodes 0x0001 as 1', () => {
      expect(DecoderService('0001', 'int16')).toBe('1')
    })
  })

  describe('uint16 (big-endian)', () => {
    it('decodes 0xFF00 as 65280', () => {
      expect(DecoderService('ff00', 'uint16')).toBe('65280')
    })

    it('decodes 0xFFFF as 65535', () => {
      expect(DecoderService('ffff', 'uint16')).toBe('65535')
    })
  })

  describe('int32', () => {
    it('decodes 0xFFFFFFFF as -1', () => {
      expect(DecoderService('ffffffff', 'int32')).toBe('-1')
    })

    it('decodes 0x00000001 as 1', () => {
      expect(DecoderService('00000001', 'int32')).toBe('1')
    })
  })

  describe('uint32', () => {
    it('decodes 0xFFFFFFFF as 4294967295', () => {
      expect(DecoderService('ffffffff', 'uint32')).toBe('4294967295')
    })
  })

  describe('int64', () => {
    it('decodes 0xFFFFFFFFFFFFFFFF as -1', () => {
      expect(DecoderService('ffffffffffffffff', 'int64')).toBe('-1')
    })

    it('decodes 0x0000000000000001 as 1', () => {
      expect(DecoderService('0000000000000001', 'int64')).toBe('1')
    })
  })

  describe('uint64', () => {
    it('decodes 0x0000000000000001 as 1', () => {
      expect(DecoderService('0000000000000001', 'uint64')).toBe('1')
    })

    it('decodes 0xFFFFFFFFFFFFFFFF as max uint64', () => {
      expect(DecoderService('ffffffffffffffff', 'uint64')).toBe('18446744073709551615')
    })
  })

  describe('empty input', () => {
    it('returns empty string for empty payload', () => {
      expect(DecoderService('', 'UTF-8')).toBe('')
    })
  })
})
