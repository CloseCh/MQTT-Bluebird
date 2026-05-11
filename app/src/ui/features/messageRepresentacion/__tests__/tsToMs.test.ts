import { describe, it, expect } from 'vitest'
import { tsToMs } from '../utils/date.util'

describe('tsToMs', () => {
  it('converts midnight to 0 ms', () => {
    expect(tsToMs('00:00:00.000')).toBe(0)
  })

  it('converts hours, minutes, seconds and milliseconds correctly', () => {
    // 12h=43200s  30m=1800s  45s  500ms
    expect(tsToMs('12:30:45.500')).toBe(45_045_500)
  })

  it('handles end of day', () => {
    // 23*3600 + 59*60 + 59 = 86399s -> 86399000 + 999
    expect(tsToMs('23:59:59.999')).toBe(86_399_999)
  })

  it('handles 1 second and 1 ms', () => {
    expect(tsToMs('00:00:01.001')).toBe(1_001)
  })

  it('handles round hours', () => {
    expect(tsToMs('01:00:00.000')).toBe(3_600_000)
  })

  it('is used consistently for sorting (later timestamp > earlier)', () => {
    expect(tsToMs('10:00:00.001')).toBeGreaterThan(tsToMs('10:00:00.000'))
    expect(tsToMs('10:00:01.000')).toBeGreaterThan(tsToMs('10:00:00.999'))
  })
})
