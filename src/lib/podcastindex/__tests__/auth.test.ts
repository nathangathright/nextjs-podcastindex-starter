import { describe, it, expect } from 'vitest'
import { generateAuthHeaders, validateCredentials } from '../auth'

describe('generateAuthHeaders', () => {
  it('returns all required headers', () => {
    const headers = generateAuthHeaders('key', 'secret', 'TestApp/1.0')

    expect(headers).toHaveProperty('User-Agent', 'TestApp/1.0')
    expect(headers).toHaveProperty('X-Auth-Key', 'key')
    expect(headers).toHaveProperty('X-Auth-Date')
    expect(headers).toHaveProperty('Authorization')
  })

  it('returns a numeric timestamp as X-Auth-Date', () => {
    const headers = generateAuthHeaders('key', 'secret', 'TestApp/1.0')
    const timestamp = Number(headers['X-Auth-Date'])

    expect(Number.isNaN(timestamp)).toBe(false)
    expect(timestamp).toBeGreaterThan(0)
  })

  it('returns a hex SHA1 hash as Authorization', () => {
    const headers = generateAuthHeaders('key', 'secret', 'TestApp/1.0')

    // SHA1 hex is 40 characters
    expect(headers.Authorization).toMatch(/^[a-f0-9]{40}$/)
  })
})

describe('validateCredentials', () => {
  it('returns true for valid credentials', () => {
    expect(validateCredentials('key', 'secret')).toBe(true)
  })

  it('returns false when apiKey is missing', () => {
    expect(validateCredentials(undefined, 'secret')).toBe(false)
  })

  it('returns false when apiSecret is missing', () => {
    expect(validateCredentials('key', undefined)).toBe(false)
  })

  it('returns false when both are missing', () => {
    expect(validateCredentials(undefined, undefined)).toBe(false)
  })

  it('returns false for empty strings', () => {
    expect(validateCredentials('', 'secret')).toBe(false)
    expect(validateCredentials('key', '')).toBe(false)
    expect(validateCredentials('', '')).toBe(false)
  })
})
