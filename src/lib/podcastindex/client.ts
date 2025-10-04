import { generateAuthHeaders } from './auth'
import type {
  PodcastIndexConfig,
  SearchParams,
  SearchResponse,
  PodcastByFeedParams,
  PodcastByItunesParams,
  PodcastResponse,
  EpisodeByIdParams,
  EpisodesByFeedParams,
  EpisodesByItunesParams,
  EpisodesRandomParams,
  EpisodesResponse,
  RecentEpisodesParams,
  RecentFeedsParams,
  RecentNewFeedsParams,
  RecentFeedsResponse,
  TrendingParams,
  ValueByFeedParams,
  StatsResponse,
  CategoriesResponse,
  AddByFeedParams,
  AddFeedResponse,
  HubNotifyParams,
  HubNotifyResponse,
} from './types'

/**
 * PodcastIndex API Client
 * Full implementation of the PodcastIndex API
 *
 * @see https://podcastindex-org.github.io/docs-api/
 */
export class PodcastIndexClient {
  private apiKey: string
  private apiSecret: string
  private userAgent: string
  private baseUrl: string

  constructor(config: PodcastIndexConfig) {
    this.apiKey = config.apiKey
    this.apiSecret = config.apiSecret
    this.userAgent = config.userAgent
    this.baseUrl = config.baseUrl || 'https://api.podcastindex.org/api/1.0'
  }

  /**
   * Make a fetch request with authentication headers
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = generateAuthHeaders(
      this.apiKey,
      this.apiSecret,
      this.userAgent
    )

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Make a GET request with query parameters
   */
  private async get<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const authHeaders = generateAuthHeaders(
      this.apiKey,
      this.apiSecret,
      this.userAgent
    )

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Make a POST request with JSON body
   */
  private async post<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const authHeaders = generateAuthHeaders(
      this.apiKey,
      this.apiSecret,
      this.userAgent
    )

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // ============================================
  // SEARCH ENDPOINTS
  // ============================================

  /**
   * Search for podcasts by title, author, or owner
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    return this.get<SearchResponse>('/search/byterm', params)
  }

  /**
   * Search for podcasts by title only
   */
  async searchByTitle(
    params: Omit<SearchParams, 'fulltext'>
  ): Promise<SearchResponse> {
    return this.get<SearchResponse>('/search/bytitle', params)
  }

  /**
   * Search for music podcasts
   */
  async searchMusicByTerm(params: SearchParams): Promise<SearchResponse> {
    return this.get<SearchResponse>('/search/music/byterm', params)
  }

  // ============================================
  // PODCASTS ENDPOINTS
  // ============================================

  /**
   * Get podcast by Feed URL, Feed ID, or Podcast GUID
   */
  async getPodcastByFeed(
    params: PodcastByFeedParams
  ): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/podcasts/byfeedurl', params)
  }

  /**
   * Get podcast by Feed ID
   */
  async getPodcastById(id: number): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/podcasts/byfeedid', { id })
  }

  /**
   * Get podcast by Podcast GUID
   */
  async getPodcastByGuid(guid: string): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/podcasts/byguid', { guid })
  }

  /**
   * Get podcast by iTunes ID
   */
  async getPodcastByItunesId(
    params: PodcastByItunesParams
  ): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/podcasts/byitunesid', params)
  }

  /**
   * Get podcasts by tag
   */
  async getPodcastsByTag(tag: string, max?: number): Promise<SearchResponse> {
    return this.get<SearchResponse>('/podcasts/bytag', { tag, max })
  }

  /**
   * Get trending podcasts
   */
  async getTrendingPodcasts(params?: TrendingParams): Promise<SearchResponse> {
    return this.get<SearchResponse>('/podcasts/trending', params)
  }

  /**
   * Get dead podcasts (no longer active)
   */
  async getDeadPodcasts(): Promise<SearchResponse> {
    return this.get<SearchResponse>('/podcasts/dead')
  }

  // ============================================
  // EPISODES ENDPOINTS
  // ============================================

  /**
   * Get episode by ID
   */
  async getEpisodeById(params: EpisodeByIdParams): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/byid', params)
  }

  /**
   * Get episode by GUID
   */
  async getEpisodeByGuid(
    guid: string,
    feedurl?: string,
    feedid?: number
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/byguid', {
      guid,
      feedurl,
      feedid,
    })
  }

  /**
   * Get episodes by feed ID or URL
   */
  async getEpisodesByFeed(
    params: EpisodesByFeedParams
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/byfeedid', params)
  }

  /**
   * Get episodes by feed URL
   */
  async getEpisodesByFeedUrl(
    url: string,
    max?: number,
    since?: number
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/byfeedurl', {
      url,
      max,
      since,
    })
  }

  /**
   * Get episodes by iTunes ID
   */
  async getEpisodesByItunesId(
    params: EpisodesByItunesParams
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/byitunesid', params)
  }

  /**
   * Get random episodes
   */
  async getRandomEpisodes(
    params?: EpisodesRandomParams
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/episodes/random', params)
  }

  // ============================================
  // RECENT ENDPOINTS
  // ============================================

  /**
   * Get recently added episodes
   */
  async getRecentEpisodes(
    params?: RecentEpisodesParams
  ): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/recent/episodes', params)
  }

  /**
   * Get recently updated feeds
   */
  async getRecentFeeds(
    params?: RecentFeedsParams
  ): Promise<RecentFeedsResponse> {
    return this.get<RecentFeedsResponse>('/recent/feeds', params)
  }

  /**
   * Get newly added feeds
   */
  async getRecentNewFeeds(
    params?: RecentNewFeedsParams
  ): Promise<RecentFeedsResponse> {
    return this.get<RecentFeedsResponse>('/recent/newfeeds', params)
  }

  /**
   * Get recently found soundbites
   */
  async getRecentSoundbites(max?: number): Promise<EpisodesResponse> {
    return this.get<EpisodesResponse>('/recent/soundbites', { max })
  }

  // ============================================
  // VALUE ENDPOINTS (Value4Value)
  // ============================================

  /**
   * Get value block information by feed ID or URL
   */
  async getValueByFeed(params: ValueByFeedParams): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/value/byfeedid', params)
  }

  /**
   * Get value block information by feed URL
   */
  async getValueByFeedUrl(url: string): Promise<PodcastResponse> {
    return this.get<PodcastResponse>('/value/byfeedurl', { url })
  }

  // ============================================
  // STATS ENDPOINTS
  // ============================================

  /**
   * Get current stats for the Podcast Index
   */
  async getStats(): Promise<StatsResponse> {
    return this.get<StatsResponse>('/stats/current')
  }

  // ============================================
  // CATEGORIES ENDPOINTS
  // ============================================

  /**
   * Get list of all categories
   */
  async getCategories(): Promise<CategoriesResponse> {
    return this.get<CategoriesResponse>('/categories/list')
  }

  // ============================================
  // ADD ENDPOINTS (Requires write permissions)
  // ============================================

  /**
   * Add a new podcast feed to the index
   * NOTE: Requires API key with write or publisher permissions
   */
  async addByFeedUrl(params: AddByFeedParams): Promise<AddFeedResponse> {
    return this.post<AddFeedResponse>('/add/byfeedurl', params)
  }

  // ============================================
  // HUB ENDPOINTS (PubSubHubbub)
  // ============================================

  /**
   * Notify the index that a feed has been updated
   * Implements PubSubHubbub notification
   */
  async hubNotify(params: HubNotifyParams): Promise<HubNotifyResponse> {
    return this.get<HubNotifyResponse>('/hub/pubnotify', params)
  }
}

/**
 * Create a new PodcastIndex API client instance
 */
export function createPodcastIndexClient(
  config: PodcastIndexConfig
): PodcastIndexClient {
  return new PodcastIndexClient(config)
}

/**
 * Default export for convenience
 */
export default PodcastIndexClient
