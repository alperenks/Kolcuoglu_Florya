import type { Metadata } from 'next'
import GalleryPage from '@/components/pages/GalleryPage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'gallery')

export default function Page() {
  return <GalleryPage lang="tr" />
}
