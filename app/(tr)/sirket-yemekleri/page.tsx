import type { Metadata } from 'next'
import CorporatePage from '@/components/pages/CorporatePage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'corporate')

export default function Page() {
  return <CorporatePage lang="tr" />
}
