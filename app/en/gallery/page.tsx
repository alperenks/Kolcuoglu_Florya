import type { Metadata } from 'next'
import GalleryPage from '@/components/pages/GalleryPage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'gallery')

export default function Page() {
  return <GalleryPage lang={LANG} />
}
