import type { Metadata } from 'next'
import PrivacyPage from '@/components/pages/PrivacyPage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/privacy'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'privacy')
}

export default async function Page({ params }: PageProps<'/[lang]/privacy'>) {
  return <PrivacyPage lang={await resolveLang(params)} />
}
