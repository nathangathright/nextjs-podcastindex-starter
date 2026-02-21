# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 starter kit with a complete, typed PodcastIndex API client library. Uses App Router, React 19, Turbopack, and Tailwind CSS 4.

## Commands

- `pnpm dev` — Start dev server (Turbopack)
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm format` — Format with Prettier
- `pnpm format:check` — Check formatting

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in:
- `PODCASTINDEX_API_KEY` / `PODCASTINDEX_API_SECRET` — Free credentials from https://api.podcastindex.org/
- `USER_AGENT` — Unique app identifier string (required by the API)

## Architecture

### API Client Library (`src/lib/podcastindex/`)

The core of this repo is a server-side PodcastIndex API client:

- **`client.ts`** — `PodcastIndexClient` class implementing all PodcastIndex API v1.0 endpoints (search, podcasts, episodes, recent, value, stats, categories, add feed, hub)
- **`auth.ts`** — SHA1-based auth header generation (API key + secret + timestamp)
- **`types.ts`** — Full TypeScript types for all API requests and responses
- **`server.ts`** — `getPodcastIndexClient()` factory that reads env vars and returns a configured client
- **`index.ts`** — Re-exports everything; default export is `PodcastIndexClient`

### Usage Pattern

```typescript
import { getPodcastIndexClient } from '@/lib/podcastindex'
const client = getPodcastIndexClient()
const results = await client.search({ q: 'javascript' })
```

The client is server-side only (uses `crypto` and env vars). Pages/components should call it from Server Components or API routes.

### App Structure

- `src/app/` — Next.js App Router pages (currently just a home page with quick start guide)
- Path alias: `@/*` maps to `./src/*`

## Code Style

- TypeScript strict mode, no `any` types
- Prettier: no semicolons, single quotes, 2-space indent, 80-char width, trailing commas (ES5)
- Tailwind class sorting via prettier-plugin-tailwindcss
