import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PodcastIndex Starter - Next.js',
  description:
    'A Next.js starter project for the PodcastIndex API. Search, discover, and explore podcasts from the open podcast ecosystem.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
