# Next.js PodcastIndex Starter

A barebones Next.js starter project with full [PodcastIndex API](https://podcastindex.org/) integration. Ready for you to build your podcast application upon.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PodcastIndex API credentials

## Quick Start

### 1. Get API Credentials

Get your free API key at [api.podcastindex.org](https://api.podcastindex.org/)

### 2. Clone and Install

```bash
git clone https://github.com/nathangathright/nextjs-podcastindex-starter
cd nextjs-podcastindex-starter
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

> [!IMPORTANT]
> When updating the environment variables, ensure that you create a unique USER_AGENT value.

### 4. Run Development Server

```bash
pnpm dev
```

Visit [localhost:3000/search](http://localhost:3000/search) to try the example search page.

## API Client Usage

```typescript
import { getPodcastIndexClient } from '@/lib/podcastindex'

const client = getPodcastIndexClient()

// Search podcasts
const results = await client.search({ q: 'javascript' })

// Get podcast by feed URL
const podcast = await client.getPodcastByFeedUrl('https://example.com/feed.xml')

// Get episodes by podcast GUID
const episodes = await client.getEpisodesByPodcastGuid({ guid: 'abc-123' })

// Get currently live episodes
const live = await client.getLiveEpisodes()
```

The client is server-side only. Use it from Server Components or API routes.

### API Route Example

The starter includes an example API route at `/api/search`:

```
GET /api/search?q=javascript&max=10
```

### Error Handling

Non-OK API responses throw a `PodcastIndexError` with structured fields:

```typescript
import { PodcastIndexError } from '@/lib/podcastindex'

try {
  await client.search({ q: 'test' })
} catch (e) {
  if (e instanceof PodcastIndexError) {
    console.log(e.status) // HTTP status code
    console.log(e.description) // API error description
  }
}
```

## Available Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start dev server (Turbopack) |
| `pnpm build`        | Production build             |
| `pnpm start`        | Start production server      |
| `pnpm lint`         | Run ESLint                   |
| `pnpm format`       | Format with Prettier         |
| `pnpm format:check` | Check formatting             |
| `pnpm test`         | Run tests (Vitest)           |
| `pnpm test:watch`   | Run tests in watch mode      |

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vitest](https://vitest.dev/) for testing

## How this was made

Agentically-authored commits are attributed via `Co-Authored-By` in the git log.
