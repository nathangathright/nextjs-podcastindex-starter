# Next.js PodcastIndex Starter

A barebones Next.js starter project with full [PodcastIndex API](https://podcastindex.org/) integration. Ready for you to build your podcast application upon.

## Prerequisites

- Node.js 18+ or later
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

### 4. Run Development Server

```bash
pnpm dev
```

## Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```
