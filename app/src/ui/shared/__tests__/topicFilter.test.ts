import { describe, it, expect } from 'vitest'
import { filterBySubscriptions } from '../service/topicFilter'

describe('filterBySubscriptions', () => {
  describe('exact match', () => {
    it('returns topic when it matches a subscription exactly', () => {
      expect(filterBySubscriptions(['a/b/c'], ['a/b/c'])).toEqual(['a/b/c'])
    })

    it('returns empty array when no topic matches', () => {
      expect(filterBySubscriptions(['a/b/c'], ['a/b/d'])).toEqual([])
    })
  })

  describe('# wildcard — match all', () => {
    it('# alone matches any multi-segment topic', () => {
      expect(filterBySubscriptions(['home/sensor/temp', 'x/y/z'], ['#'])).toEqual([
        'home/sensor/temp',
        'x/y/z',
      ])
    })

    it('# alone matches single-segment topics', () => {
      expect(filterBySubscriptions(['foo'], ['#'])).toEqual(['foo'])
    })
  })

  describe('/# suffix wildcard', () => {
    it('home/# matches multi-level children', () => {
      expect(
        filterBySubscriptions(['home/sensor/temp', 'home/sensor/humidity', 'device/status'], ['home/#'])
      ).toEqual(['home/sensor/temp', 'home/sensor/humidity'])
    })

    it('home/# matches "home" itself (trailing slash optional)', () => {
      expect(filterBySubscriptions(['home'], ['home/#'])).toEqual(['home'])
    })

    it('a/b/# matches deeply nested topics', () => {
      expect(filterBySubscriptions(['a/b/c/d/e'], ['a/b/#'])).toEqual(['a/b/c/d/e'])
    })

    it('home/# does NOT match device/status', () => {
      expect(filterBySubscriptions(['device/status'], ['home/#'])).toEqual([])
    })
  })

  describe('+ wildcard — single level', () => {
    it('home/+/temp matches exactly one intermediate level', () => {
      expect(filterBySubscriptions(['home/sensor/temp'], ['home/+/temp'])).toEqual([
        'home/sensor/temp',
      ])
    })

    it('home/+/temp does NOT match two intermediate levels', () => {
      expect(filterBySubscriptions(['home/sensor/deep/temp'], ['home/+/temp'])).toEqual([])
    })

    it('home/sensor/+ matches any single final segment', () => {
      expect(
        filterBySubscriptions(
          ['home/sensor/temp', 'home/sensor/humidity', 'home/sensor/deep/temp'],
          ['home/sensor/+']
        )
      ).toEqual(['home/sensor/temp', 'home/sensor/humidity'])
    })

    it('+ alone matches single-segment topics', () => {
      expect(filterBySubscriptions(['foo', 'bar'], ['+'])).toEqual(['foo', 'bar'])
    })

    it('+ alone does NOT match multi-segment topics', () => {
      expect(filterBySubscriptions(['foo/bar'], ['+'])).toEqual([])
    })
  })

  describe('multiple subscriptions', () => {
    it('returns topics matching any subscription', () => {
      expect(
        filterBySubscriptions(
          ['home/sensor/temp', 'device/status', 'other'],
          ['home/#', 'device/+']
        )
      ).toEqual(['home/sensor/temp', 'device/status'])
    })

    it('topic matching two subscriptions appears only once', () => {
      expect(
        filterBySubscriptions(['home/sensor'], ['home/#', 'home/sensor'])
      ).toEqual(['home/sensor'])
    })
  })

  describe('empty inputs', () => {
    it('empty receivedTopics returns empty array', () => {
      expect(filterBySubscriptions([], ['home/#'])).toEqual([])
    })

    it('empty selectedSubscriptions returns empty array', () => {
      expect(filterBySubscriptions(['a/b'], [])).toEqual([])
    })

    it('both empty returns empty array', () => {
      expect(filterBySubscriptions([], [])).toEqual([])
    })
  })

  describe('regex special characters in topic literals', () => {
    it('dot in subscription is treated as literal, not regex wildcard', () => {
      expect(
        filterBySubscriptions(['home.device/temp', 'homeXdevice/temp'], ['home.device/temp'])
      ).toEqual(['home.device/temp'])
    })
  })
})
