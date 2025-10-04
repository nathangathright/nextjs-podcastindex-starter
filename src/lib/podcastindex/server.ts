import { createPodcastIndexClient } from './client'

/**
 * Get a configured PodcastIndex client for server-side use
 * This utility handles environment variables so you don't need to pass them everywhere
 */
export function getPodcastIndexClient() {
  return createPodcastIndexClient({
    apiKey: process.env.PODCASTINDEX_API_KEY!,
    apiSecret: process.env.PODCASTINDEX_API_SECRET!,
    userAgent: process.env.USER_AGENT!,
  })
}
