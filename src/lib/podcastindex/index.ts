/**
 * PodcastIndex API Client Library
 *
 * A complete TypeScript implementation of the PodcastIndex API
 * @see https://podcastindex-org.github.io/docs-api/
 */

export { PodcastIndexClient, createPodcastIndexClient } from './client'
export { getPodcastIndexClient } from './server'
export { generateAuthHeaders, validateCredentials } from './auth'
export * from './types'

// Default export
export { PodcastIndexClient as default } from './client'
