/**
 * Error thrown when the PodcastIndex API returns a non-OK response
 */
export class PodcastIndexError extends Error {
  status: number
  statusText: string
  apiStatus?: string
  description?: string

  constructor(options: {
    status: number
    statusText: string
    apiStatus?: string
    description?: string
  }) {
    const message = options.description
      ? `PodcastIndex API error ${options.status}: ${options.description}`
      : `PodcastIndex API error ${options.status}: ${options.statusText}`
    super(message)
    this.name = 'PodcastIndexError'
    this.status = options.status
    this.statusText = options.statusText
    this.apiStatus = options.apiStatus
    this.description = options.description
  }
}
