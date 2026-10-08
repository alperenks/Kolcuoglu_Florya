import type { Metadata } from 'next'
import PrivacyPage from '@/components/pages/PrivacyPage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'privacy')

export default function Page() {
  return <PrivacyPage lang={LANG} />
}
