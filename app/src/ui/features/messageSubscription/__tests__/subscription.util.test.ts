import { describe, it, expect } from 'vitest'
import { findCoveringSubscriptions, hasCoveringSubscription } from '../utils/subscription.util'
import type { SubscriptionList } from '../types/subscription.types'

describe('findCoveringSubscriptions', () => {
  describe('exact match', () => {
    it('returns the subscription when newTopic matches a key exactly', () => {
      const list: SubscriptionList = { 'a/b/c': true }
      expect(findCoveringSubscriptions('a/b/c', list)).toEqual(['a/b/c'])
    })

    it('returns empty array when no subscription matches', () => {
      const list: SubscriptionList = { 'a/b/d': true }
      expect(findCoveringSubscriptions('a/b/c', list)).toEqual([])
    })
  })

  describe('# wildcard coverage', () => {
    it('# alone covers any topic', () => {
      const list: SubscriptionList = { '#': true }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual(['#'])
    })

    it('home/# covers home/sensor/temp', () => {
      const list: SubscriptionList = { 'home/#': true }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual(['home/#'])
    })

    it('home/# covers "home" itself', () => {
      const list: SubscriptionList = { 'home/#': true }
      expect(findCoveringSubscriptions('home', list)).toEqual(['home/#'])
    })

    it('home/# does NOT cover device/status', () => {
      const list: SubscriptionList = { 'home/#': true }
      expect(findCoveringSubscriptions('device/status', list)).toEqual([])
    })
  })

  describe('+ wildcard coverage', () => {
    it('home/+/temp covers home/sensor/temp', () => {
      const list: SubscriptionList = { 'home/+/temp': true }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual(['home/+/temp'])
    })

    it('home/sensor/+ covers home/sensor/temp', () => {
      const list: SubscriptionList = { 'home/sensor/+': true }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual(['home/sensor/+'])
    })

    it('+ alone does NOT cover a multi-segment topic', () => {
      const list: SubscriptionList = { '+': true }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual([])
    })
  })

  describe('multiple covering subscriptions', () => {
    it('returns all subscriptions that cover the topic', () => {
      const list: SubscriptionList = {
        '#': true,
        'home/#': true,
        'home/+/temp': true,
        'home/sensor/+': true,
        'other/topic': true,
      }
      expect(findCoveringSubscriptions('home/sensor/temp', list)).toEqual([
        '#',
        'home/#',
        'home/+/temp',
        'home/sensor/+',
      ])
    })
  })

  describe('empty subscription list', () => {
    it('returns empty array', () => {
      expect(findCoveringSubscriptions('a/b', {})).toEqual([])
    })
  })
})

describe('hasCoveringSubscription', () => {
  it('returns true when a subscription covers the topic', () => {
    expect(hasCoveringSubscription('home/sensor/temp', { 'home/#': true })).toBe(true)
  })

  it('returns false when no subscription covers the topic', () => {
    expect(hasCoveringSubscription('other/topic', { 'home/#': true })).toBe(false)
  })

  it('returns true for exact match', () => {
    expect(hasCoveringSubscription('a/b', { 'a/b': true })).toBe(true)
  })

  it('returns false for empty list', () => {
    expect(hasCoveringSubscription('a/b', {})).toBe(false)
  })

  it('is consistent with findCoveringSubscriptions', () => {
    const cases: Array<[string, SubscriptionList]> = [
      ['home/sensor/temp', { 'home/#': true }],
      ['other/topic', { 'home/#': true }],
      ['a/b', { 'a/b': true }],
      ['a/b', {}],
    ]
    for (const [topic, list] of cases) {
      const covering = findCoveringSubscriptions(topic, list)
      expect(hasCoveringSubscription(topic, list)).toBe(covering.length > 0)
    }
  })
})
