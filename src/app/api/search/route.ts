import { NextRequest, NextResponse } from 'next/server'
import { getPodcastIndexClient } from '@/lib/podcastindex'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')
  const max = searchParams.get('max')

  if (!q) {
    return NextResponse.json(
      { error: 'Missing required query parameter: q' },
      { status: 400 }
    )
  }

  try {
    const client = getPodcastIndexClient()
    const results = await client.search({
      q,
      max: max ? Number(max) : undefined,
    })
    return NextResponse.json(results)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
