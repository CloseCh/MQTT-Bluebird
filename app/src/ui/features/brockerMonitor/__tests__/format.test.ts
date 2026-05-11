import { describe, it, expect } from 'vitest'
import { formatBytes, formatUptime } from '../utils/format.util'

describe('formatBytes', () => {
  it('returns "0 B" for 0 bytes', () => {
    expect(formatBytes(0)).toBe('0 B')
  })

  it('returns "1.0 B" for 1 byte (toFixed always adds decimal)', () => {
    expect(formatBytes(1)).toBe('1.0 B')
  })

  it('returns "500.0 B" for 500 bytes', () => {
    expect(formatBytes(500)).toBe('500.0 B')
  })

  it('returns "1023.0 B" for 1023 bytes (boundary below KB)', () => {
    expect(formatBytes(1023)).toBe('1023.0 B')
  })

  it('returns "1.0 KB" for 1024 bytes', () => {
    expect(formatBytes(1024)).toBe('1.0 KB')
  })

  it('returns "1.5 KB" for 1536 bytes', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')
  })

  it('returns "1.0 MB" for 1 MiB', () => {
    expect(formatBytes(1024 * 1024)).toBe('1.0 MB')
  })

  it('returns "1.0 GB" for 1 GiB', () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe('1.0 GB')
  })

  it('caps at GB — no TB unit in the array', () => {
    // 1 TiB = 1024 GiB → '1024.0 GB'
    expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe('1024.0 GB')
  })
})

describe('formatUptime', () => {
  describe('seconds only (< 60s)', () => {
    it('0 seconds', () => {
      expect(formatUptime('0')).toBe('0m 0s')
    })

    it('1 second', () => {
      expect(formatUptime('1')).toBe('0m 1s')
    })

    it('59 seconds', () => {
      expect(formatUptime('59')).toBe('0m 59s')
    })
  })

  describe('minutes and seconds (60s – 3599s)', () => {
    it('60 seconds = 1m 0s', () => {
      expect(formatUptime('60')).toBe('1m 0s')
    })

    it('61 seconds = 1m 1s', () => {
      expect(formatUptime('61')).toBe('1m 1s')
    })

    it('3599 seconds = 59m 59s', () => {
      expect(formatUptime('3599')).toBe('59m 59s')
    })
  })

  describe('hours, minutes, seconds (3600s – 86399s)', () => {
    it('3600 seconds = 1h 0m 0s', () => {
      expect(formatUptime('3600')).toBe('1h 0m 0s')
    })

    it('7384 seconds = 2h 3m 4s', () => {
      // 7384 / 3600 = 2h rem 1184; 1184 / 60 = 19m rem 44s
      // Wait: 7384 = 2*3600 + 184; 184 = 3*60 + 4 → 2h 3m 4s
      expect(formatUptime('7384')).toBe('2h 3m 4s')
    })

    it('86399 seconds = 23h 59m 59s', () => {
      expect(formatUptime('86399')).toBe('23h 59m 59s')
    })
  })

  describe('days (>= 86400s) — seconds omitted', () => {
    it('86400 seconds = 1d 0h 0m', () => {
      expect(formatUptime('86400')).toBe('1d 0h 0m')
    })

    it('90061 seconds = 1d 1h 1m (no seconds shown when days present)', () => {
      // 90061 = 1*86400 + 3661; 3661 = 1*3600 + 61; 61 = 1*60 + 1
      expect(formatUptime('90061')).toBe('1d 1h 1m')
    })
  })

  describe('non-numeric input', () => {
    it('returns raw string for non-numeric input', () => {
      expect(formatUptime('not-a-number')).toBe('not-a-number')
    })

    it('returns empty string for empty input', () => {
      expect(formatUptime('')).toBe('')
    })
  })
})
