import crypto from 'crypto'

/**
 * Generate authentication headers for PodcastIndex API
 * Following Amazon-style request authorization
 */
export function generateAuthHeaders(
  apiKey: string,
  apiSecret: string,
  userAgent: string
) {
  const apiHeaderTime = Math.floor(Date.now() / 1000)

  // Create the hash using the API key, secret, and current timestamp
  const hash = crypto
    .createHash('sha1')
    .update(apiKey + apiSecret + apiHeaderTime)
    .digest('hex')

  return {
    'User-Agent': userAgent,
    'X-Auth-Date': apiHeaderTime.toString(),
    'X-Auth-Key': apiKey,
    Authorization: hash,
  }
}

/**
 * Validate API credentials
 */
export function validateCredentials(
  apiKey?: string,
  apiSecret?: string
): boolean {
  return !!(apiKey && apiSecret && apiKey.length > 0 && apiSecret.length > 0)
}
