/**
 * PodcastIndex API Client Library
 *
 * A complete TypeScript implementation of the PodcastIndex API
 * @see https://podcastindex-org.github.io/docs-api/
 */

export { PodcastIndexClient, createPodcastIndexClient } from './client'
export { getPodcastIndexClient } from './server'
export { generateAuthHeaders, validateCredentials } from './auth'
export { PodcastIndexError } from './errors'
export * from './types'

// Default export
export { PodcastIndexClient as default } from './client'
