import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'contact')

export default function Page() {
  return <ContactPage lang="tr" />
}
