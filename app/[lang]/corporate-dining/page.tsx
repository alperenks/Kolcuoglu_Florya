import type { Metadata } from 'next'
import CorporatePage from '@/components/pages/CorporatePage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/corporate-dining'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'corporate')
}

export default async function Page({ params }: PageProps<'/[lang]/corporate-dining'>) {
  return <CorporatePage lang={await resolveLang(params)} />
}
