import type { Metadata } from 'next'
import PrivacyPage from '@/components/pages/PrivacyPage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'privacy')

export default function Page() {
  return <PrivacyPage lang="tr" />
}
