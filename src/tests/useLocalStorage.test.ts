import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLocalStorage } from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should set and retrieve value from localStorage', () => {
    const key = 'testKey'
    const value = { name: 'test' }

    localStorage.setItem(key, JSON.stringify(value))
    const stored = JSON.parse(localStorage.getItem(key) || '{}')

    expect(stored).toEqual(value)
  })

  it('should remove value from localStorage', () => {
    const key = 'testKey'
    localStorage.setItem(key, 'value')
    localStorage.removeItem(key)

    expect(localStorage.getItem(key)).toBeNull()
  })

  it('should handle null values', () => {
    const key = 'nullKey'
    const result = localStorage.getItem(key)

    expect(result).toBeNull()
  })
})
