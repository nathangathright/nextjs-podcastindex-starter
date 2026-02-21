import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PodcastIndexClient } from '../client'
import { PodcastIndexError } from '../errors'

const mockFetch = vi.fn()
global.fetch = mockFetch

function createClient() {
  return new PodcastIndexClient({
    apiKey: 'test-key',
    apiSecret: 'test-secret',
    userAgent: 'TestApp/1.0',
    baseUrl: 'https://api.example.com/api/1.0',
  })
}

function mockOk(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(data),
  })
}

function mockError(status: number, body?: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
    statusText: 'Bad Request',
    json: body ? () => Promise.resolve(body) : () => Promise.reject(),
  })
}

beforeEach(() => {
  mockFetch.mockReset()
})

describe('PodcastIndexClient', () => {
  describe('search endpoints', () => {
    it('search calls /search/byterm', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.search({ q: 'test' })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/search/byterm')
      expect(url.searchParams.get('q')).toBe('test')
    })

    it('searchByTitle calls /search/bytitle', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.searchByTitle({ q: 'test' })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/search/bytitle')
    })

    it('searchByPerson calls /search/byperson', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.searchByPerson({ q: 'joe' })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/search/byperson')
      expect(url.searchParams.get('q')).toBe('joe')
    })
  })

  describe('podcast endpoints', () => {
    it('getPodcastByFeedUrl calls /podcasts/byfeedurl', async () => {
      const client = createClient()
      mockOk({ status: 'true', feed: {} })

      await client.getPodcastByFeedUrl('https://example.com/feed')

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/podcasts/byfeedurl')
      expect(url.searchParams.get('url')).toBe('https://example.com/feed')
    })

    it('getPodcastsByMedium calls /podcasts/bymedium', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.getPodcastsByMedium({ medium: 'music' })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/podcasts/bymedium')
      expect(url.searchParams.get('medium')).toBe('music')
    })
  })

  describe('episode endpoints', () => {
    it('getEpisodesByPodcastGuid calls /episodes/bypodcastguid', async () => {
      const client = createClient()
      mockOk({ status: 'true', items: [], count: 0 })

      await client.getEpisodesByPodcastGuid({ guid: 'abc-123' })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/episodes/bypodcastguid')
      expect(url.searchParams.get('guid')).toBe('abc-123')
    })

    it('getLiveEpisodes calls /episodes/live', async () => {
      const client = createClient()
      mockOk({ status: 'true', items: [], count: 0 })

      await client.getLiveEpisodes()

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/episodes/live')
    })
  })

  describe('recent endpoints', () => {
    it('getRecentNewValueFeeds calls /recent/newvaluefeeds', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.getRecentNewValueFeeds({ max: 5 })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/recent/newvaluefeeds')
      expect(url.searchParams.get('max')).toBe('5')
    })
  })

  describe('value endpoints', () => {
    it('getValueByPodcastGuid calls /value/bypodcastguid', async () => {
      const client = createClient()
      mockOk({ status: 'true', feed: {} })

      await client.getValueByPodcastGuid('abc-123')

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/value/bypodcastguid')
      expect(url.searchParams.get('guid')).toBe('abc-123')
    })
  })

  describe('add endpoints', () => {
    it('addByItunesId calls /add/byitunesid', async () => {
      const client = createClient()
      mockOk({ status: 'true', feedId: 1 })

      await client.addByItunesId({ id: 123 })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.pathname).toBe('/api/1.0/add/byitunesid')
      expect(url.searchParams.get('id')).toBe('123')
    })
  })

  describe('error handling', () => {
    it('throws PodcastIndexError on non-OK response', async () => {
      const client = createClient()
      mockError(401, {
        status: 'false',
        description: 'Invalid API key',
      })

      await expect(client.search({ q: 'test' })).rejects.toThrow(
        PodcastIndexError
      )
    })

    it('includes parsed API fields in the error', async () => {
      const client = createClient()
      mockError(401, {
        status: 'false',
        description: 'Invalid API key',
      })

      try {
        await client.search({ q: 'test' })
        expect.fail('should have thrown')
      } catch (e) {
        expect(e).toBeInstanceOf(PodcastIndexError)
        const err = e as PodcastIndexError
        expect(err.status).toBe(401)
        expect(err.apiStatus).toBe('false')
        expect(err.description).toBe('Invalid API key')
      }
    })

    it('handles unparseable error body gracefully', async () => {
      const client = createClient()
      mockError(500)

      try {
        await client.search({ q: 'test' })
        expect.fail('should have thrown')
      } catch (e) {
        expect(e).toBeInstanceOf(PodcastIndexError)
        const err = e as PodcastIndexError
        expect(err.status).toBe(500)
        expect(err.apiStatus).toBeUndefined()
        expect(err.description).toBeUndefined()
      }
    })
  })

  describe('query parameter handling', () => {
    it('omits undefined and null params', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.search({ q: 'test', max: undefined })

      const url = new URL(mockFetch.mock.calls[0][0])
      expect(url.searchParams.has('max')).toBe(false)
    })

    it('includes auth headers in requests', async () => {
      const client = createClient()
      mockOk({ status: 'true', feeds: [], count: 0 })

      await client.search({ q: 'test' })

      const headers = mockFetch.mock.calls[0][1].headers
      expect(headers).toHaveProperty('X-Auth-Key', 'test-key')
      expect(headers).toHaveProperty('X-Auth-Date')
      expect(headers).toHaveProperty('Authorization')
      expect(headers).toHaveProperty('User-Agent', 'TestApp/1.0')
    })
  })
})
