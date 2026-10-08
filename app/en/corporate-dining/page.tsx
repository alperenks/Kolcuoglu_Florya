import type { Metadata } from 'next'
import CorporatePage from '@/components/pages/CorporatePage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'corporate')

export default function Page() {
  return <CorporatePage lang={LANG} />
}
