import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'contact')
}

export default async function Page({ params }: PageProps<'/[lang]/contact'>) {
  return <ContactPage lang={await resolveLang(params)} />
}
