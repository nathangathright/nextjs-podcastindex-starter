export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            PodcastIndex Starter
          </h1>
          <p className="text-xl text-gray-600">
            A barebones Next.js starter with PodcastIndex API integration
          </p>
        </div>

        <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Quick Start
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium text-gray-900">
                1. Set up environment variables
              </h3>
              <pre className="overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                {`PODCASTINDEX_API_KEY=your_api_key
PODCASTINDEX_API_SECRET=your_api_secret
USER_AGENT=MyApp/1.0 (https://myapp.com)`}
              </pre>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-gray-900">
                2. Use the API client
              </h3>
              <pre className="overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                {`import { getPodcastIndexClient } from '@/lib/podcastindex'

const client = getPodcastIndexClient()
const results = await client.search({ q: 'javascript' })`}
              </pre>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500">
          <p>Ready to build your podcast application</p>
        </div>
      </div>
    </div>
  )
}
