import type { Metadata } from 'next'
import ReservationPage from '@/components/pages/ReservationPage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'reservation')

export default function Page() {
  return <ReservationPage lang={LANG} />
}
