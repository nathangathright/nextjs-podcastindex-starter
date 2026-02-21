import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPodcastIndexClient } from '../server'

beforeEach(() => {
  vi.unstubAllEnvs()
})

describe('getPodcastIndexClient', () => {
  it('throws when PODCASTINDEX_API_KEY is missing', () => {
    vi.stubEnv('PODCASTINDEX_API_KEY', '')
    vi.stubEnv('PODCASTINDEX_API_SECRET', 'secret')
    vi.stubEnv('USER_AGENT', 'TestApp/1.0')

    expect(() => getPodcastIndexClient()).toThrow('PODCASTINDEX_API_KEY')
  })

  it('throws when PODCASTINDEX_API_SECRET is missing', () => {
    vi.stubEnv('PODCASTINDEX_API_KEY', 'key')
    vi.stubEnv('PODCASTINDEX_API_SECRET', '')
    vi.stubEnv('USER_AGENT', 'TestApp/1.0')

    expect(() => getPodcastIndexClient()).toThrow('PODCASTINDEX_API_SECRET')
  })

  it('throws when USER_AGENT is missing', () => {
    vi.stubEnv('PODCASTINDEX_API_KEY', 'key')
    vi.stubEnv('PODCASTINDEX_API_SECRET', 'secret')
    vi.stubEnv('USER_AGENT', '')

    expect(() => getPodcastIndexClient()).toThrow('USER_AGENT')
  })

  it('lists all missing variables in the error message', () => {
    vi.stubEnv('PODCASTINDEX_API_KEY', '')
    vi.stubEnv('PODCASTINDEX_API_SECRET', '')
    vi.stubEnv('USER_AGENT', '')

    expect(() => getPodcastIndexClient()).toThrow(
      'PODCASTINDEX_API_KEY, PODCASTINDEX_API_SECRET, USER_AGENT'
    )
  })

  it('returns a client when all env vars are set', () => {
    vi.stubEnv('PODCASTINDEX_API_KEY', 'key')
    vi.stubEnv('PODCASTINDEX_API_SECRET', 'secret')
    vi.stubEnv('USER_AGENT', 'TestApp/1.0')

    const client = getPodcastIndexClient()
    expect(client).toBeDefined()
    expect(client.search).toBeTypeOf('function')
  })
})
