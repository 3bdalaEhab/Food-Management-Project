import { describe, it, expect } from 'vitest'
import { cacheManager } from '../utils/cacheManager'

describe('CacheManager', () => {
  beforeEach(() => {
    cacheManager.clear()
  })

  it('should set and get value from cache', () => {
    const key = 'testKey'
    const value = { data: 'test' }

    cacheManager.set(key, value)
    const result = cacheManager.get(key)

    expect(result).toEqual(value)
  })

  it('should return null for non-existent key', () => {
    const result = cacheManager.get('nonExistent')
    expect(result).toBeNull()
  })

  it('should delete cache entry', () => {
    const key = 'testKey'
    cacheManager.set(key, 'value')
    cacheManager.delete(key)

    const result = cacheManager.get(key)
    expect(result).toBeNull()
  })

  it('should clear all cache', () => {
    cacheManager.set('key1', 'value1')
    cacheManager.set('key2', 'value2')
    cacheManager.clear()

    expect(cacheManager.getSize()).toBe(0)
  })

  it('should handle TTL expiration', () => {
    const key = 'ttlKey'
    const value = 'test'
    const ttl = 1000

    cacheManager.set(key, value, ttl)
    expect(cacheManager.get(key)).toBe(value)

    // Simulate time passing
    vi.useFakeTimers()
    vi.advanceTimersByTime(1100)

    expect(cacheManager.get(key)).toBeNull()
    vi.useRealTimers()
  })

  it('should respect max size limit', () => {
    const maxSize = 100
    const manager = new cacheManager.constructor(maxSize)

    for (let i = 0; i < maxSize + 10; i++) {
      manager.set(`key${i}`, `value${i}`)
    }

    expect(manager.getSize()).toBeLessThanOrEqual(maxSize)
  })
})
