// PodcastIndex API Types
// Based on OpenAPI spec: https://podcastindex-org.github.io/docs-api/pi_api.json

export interface PodcastIndexConfig {
  apiKey: string
  apiSecret: string
  userAgent: string // Required: Your app's User-Agent string (e.g., 'MyApp/1.0 (https://myapp.com)')
  baseUrl?: string
}

// Common Response Types
export interface BaseResponse {
  status: string
  feeds?: Podcast[]
  feed?: Podcast
  items?: Episode[]
  count?: number
  query?: string
  description?: string
}

// Podcast Types
export interface Podcast {
  id: number
  podcastGuid?: string
  title: string
  url: string
  originalUrl?: string
  link: string
  description: string
  author: string
  ownerName?: string
  image: string
  artwork: string
  lastUpdateTime: number
  lastCrawlTime?: number
  lastParseTime?: number
  lastGoodHttpStatusTime?: number
  lastHttpStatus?: number
  contentType?: string
  itunesId?: number
  itunesType?: string
  generator?: string
  language?: string
  type?: number
  dead?: number
  crawlErrors?: number
  parseErrors?: number
  categories?: Record<string, string>
  locked?: number
  explicit?: boolean
  episodeCount?: number
  imageUrlHash?: number
  newestItemPublishTime?: number
  funding?: Funding[]
  value?: ValueBlock
}

// Episode Types
export interface Episode {
  id: number
  guid: string
  title: string
  link: string
  description: string
  datePublished: number
  datePublishedPretty?: string
  dateCrawled: number
  enclosureUrl: string
  enclosureType: string
  enclosureLength: number
  duration: number
  explicit?: number
  episode?: number
  episodeType?: string
  season?: number
  image: string
  feedItunesId?: number
  feedId: number
  feedUrl?: string
  feedImage?: string
  feedLanguage?: string
  feedDead?: number
  feedDuplicateOf?: number
  chaptersUrl?: string
  transcriptUrl?: string
  persons?: Person[]
  soundbites?: Soundbite[]
  value?: ValueBlock
}

// Value for Value Types
export interface ValueBlock {
  model?: {
    type?: string
    method?: string
    suggested?: string
  }
  destinations?: ValueDestination[]
}

export interface ValueDestination {
  name?: string
  type?: string
  address?: string
  split?: number
  fee?: boolean
  customKey?: string
  customValue?: string
}

// Additional Types
export interface Funding {
  url: string
  message?: string
}

export interface Person {
  id?: number
  name: string
  role?: string
  group?: string
  img?: string
  href?: string
}

export interface Soundbite {
  startTime: number
  duration: number
  title?: string
}

export interface Category {
  id: number
  name: string
}

// Search Parameters
export interface SearchParams {
  q: string
  val?: string
  clean?: boolean
  fulltext?: boolean
  max?: number
  similar?: boolean
}

export interface PodcastByFeedParams {
  url?: string
  id?: number
  podcastGuid?: string
}

export interface PodcastByItunesParams {
  id: number
}

export interface EpisodeByIdParams {
  id: number
  fulltext?: boolean
}

export interface EpisodesByFeedParams {
  id?: number
  url?: string
  since?: number
  max?: number
  fulltext?: boolean
}

export interface EpisodesByItunesParams {
  id: number
  since?: number
  max?: number
  fulltext?: boolean
}

export interface EpisodesRandomParams {
  max?: number
  lang?: string
  cat?: string
  notcat?: string
  fulltext?: boolean
}

export interface RecentEpisodesParams {
  max?: number
  excludeString?: string
  before?: number
  fulltext?: boolean
}

export interface RecentFeedsParams {
  max?: number
  since?: number
  lang?: string
  cat?: string
  notcat?: string
}

export interface RecentNewFeedsParams {
  max?: number
  since?: number
  feedid?: number
  desc?: boolean
}

export interface TrendingParams {
  max?: number
  since?: number
  lang?: string
  cat?: string
  notcat?: string
}

export interface ValueByFeedParams {
  id?: number
  url?: string
}

export interface StatsParams {
  // Stats endpoint has no specific params
  [key: string]: unknown
}

export interface AddByFeedParams {
  url: string
  chash?: string
  itunesid?: number
}

// Hub (PubSubHubbub) Parameters
export interface HubNotifyParams {
  feedId?: number
  feedUrl?: string
}

// API Response Types
export interface SearchResponse extends BaseResponse {
  feeds: Podcast[]
  count: number
  query: string
  description: string
}

export interface PodcastResponse {
  status: string
  feed: Podcast
  query?: {
    id?: string
    url?: string
    podcastGuid?: string
  }
  description: string
}

export interface EpisodesResponse extends BaseResponse {
  items: Episode[]
  count: number
  query?: string
  description: string
}

export interface RecentFeedsResponse extends BaseResponse {
  feeds: Podcast[]
  count: number
  max?: number
  since?: number
  description: string
}

export interface CategoriesResponse {
  status: string
  feeds: Category[]
  count: number
  description: string
}

export interface StatsResponse {
  status: string
  stats: {
    feedCountTotal: number
    episodeCountTotal: number
    feedsWithNewEpisodes3days: number
    feedsWithNewEpisodes10days: number
    feedsWithNewEpisodes30days: number
    feedsWithNewEpisodes90days: number
    feedsWithValueBlocks: number
  }
  description: string
}

export interface AddFeedResponse {
  status: string
  feedId?: number
  existed?: boolean
  description: string
}

export interface HubNotifyResponse {
  status: string
  description: string
}
