import { createPodcastIndexClient } from './client'

/**
 * Get a configured PodcastIndex client for server-side use
 * This utility handles environment variables so you don't need to pass them everywhere
 */
export function getPodcastIndexClient() {
  const apiKey = process.env.PODCASTINDEX_API_KEY
  const apiSecret = process.env.PODCASTINDEX_API_SECRET
  const userAgent = process.env.USER_AGENT

  const missing = [
    !apiKey && 'PODCASTINDEX_API_KEY',
    !apiSecret && 'PODCASTINDEX_API_SECRET',
    !userAgent && 'USER_AGENT',
  ].filter(Boolean)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Copy .env.local.example to .env.local and fill in your credentials.'
    )
  }

  return createPodcastIndexClient({
    apiKey: apiKey!,
    apiSecret: apiSecret!,
    userAgent: userAgent!,
  })
}
