import type { Metadata, Viewport } from 'next'
import RootDocument from '@/components/layout/RootDocument'
import { rootMetadata } from '@/i18n/metadata'

// Root layout of the Turkish site (original URLs, no prefix). Other languages: app/<lang>/layout.tsx.

export const metadata: Metadata = rootMetadata('tr')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="tr">{children}</RootDocument>
}
