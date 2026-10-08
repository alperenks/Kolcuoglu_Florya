import type { Metadata, Viewport } from 'next'
import RootDocument from '@/components/layout/RootDocument'
import { rootMetadata } from '@/i18n/metadata'
import { LANG } from './lang'

// Root layout of the English site (/en/…). A plain folder per language, not a dynamic [lang]
// segment: every page stays static and unknown URLs get a clean 404 (app/global-not-found.tsx).

export const metadata: Metadata = rootMetadata(LANG)

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang={LANG}>{children}</RootDocument>
}
