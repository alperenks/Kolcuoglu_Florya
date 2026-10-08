import type { Metadata } from 'next'
import ReservationPage from '@/components/pages/ReservationPage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/reservation'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'reservation')
}

export default async function Page({ params }: PageProps<'/[lang]/reservation'>) {
  return <ReservationPage lang={await resolveLang(params)} />
}
