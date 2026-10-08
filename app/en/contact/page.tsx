import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'contact')

export default function Page() {
  return <ContactPage lang={LANG} />
}
