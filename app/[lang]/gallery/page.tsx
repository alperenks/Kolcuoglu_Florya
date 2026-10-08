import type { Metadata } from 'next'
import GalleryPage from '@/components/pages/GalleryPage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/gallery'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'gallery')
}

export default async function Page({ params }: PageProps<'/[lang]/gallery'>) {
  return <GalleryPage lang={await resolveLang(params)} />
}
