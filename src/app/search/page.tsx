import { getPodcastIndexClient } from '@/lib/podcastindex'
import type { SearchResponse } from '@/lib/podcastindex'
import Link from 'next/link'

export default async function SearchPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined

  let results: SearchResponse | null = null
  let error: string | null = null

  if (q) {
    try {
      const client = getPodcastIndexClient()
      results = await client.search({ q, max: 20 })
    } catch (e) {
      error =
        e instanceof Error
          ? e.message
          : 'An unexpected error occurred while searching.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Home
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Search Podcasts
        </h1>

        <form action="/search" className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search for podcasts..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-800">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {results && (
          <div>
            <p className="mb-4 text-sm text-gray-500">
              {results.count} result{results.count !== 1 ? 's' : ''} for &ldquo;
              {q}&rdquo;
            </p>
            <div className="space-y-4">
              {results.feeds.map((feed) => (
                <div
                  key={feed.id}
                  className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm"
                >
                  {feed.artwork ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={feed.artwork}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200" />
                  )}
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-gray-900">
                      {feed.title}
                    </h2>
                    <p className="truncate text-sm text-gray-600">
                      {feed.author}
                    </p>
                    {feed.episodeCount != null && (
                      <p className="mt-1 text-xs text-gray-400">
                        {feed.episodeCount} episode
                        {feed.episodeCount !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!results && !error && !q && (
          <p className="text-center text-gray-500">
            Enter a search term to find podcasts.
          </p>
        )}
      </div>
    </div>
  )
}
