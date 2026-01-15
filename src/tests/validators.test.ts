import { describe, it, expect, vi } from 'vitest'
import { validateEmail, validatePassword, sanitizeInput } from '../utils/validators'

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = validateEmail('test@example.com')
      expect(result).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = validateEmail('invalid-email')
      expect(result).not.toBe(true)
    })

    it('should reject empty email', () => {
      const result = validateEmail('')
      expect(result).not.toBe(true)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = validatePassword('StrongPass123')
      expect(result).toBe(true)
    })

    it('should reject weak password', () => {
      const result = validatePassword('weak')
      expect(result).not.toBe(true)
    })

    it('should reject password without uppercase', () => {
      const result = validatePassword('weakpass123')
      expect(result).not.toBe(true)
    })

    it('should reject password without number', () => {
      const result = validatePassword('WeakPass')
      expect(result).not.toBe(true)
    })
  })

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<script>')
    })

    it('should handle normal input', () => {
      const input = 'Normal text'
      const result = sanitizeInput(input)
      expect(result).toContain('Normal text')
    })

    it('should truncate long strings', () => {
      const input = 'a'.repeat(1000)
      const result = sanitizeInput(input)
      expect(result.length).toBeLessThanOrEqual(500)
    })
  })
})
