import type { Metadata } from 'next'
import ReservationPage from '@/components/pages/ReservationPage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'reservation')

export default function Page() {
  return <ReservationPage lang="tr" />
}
