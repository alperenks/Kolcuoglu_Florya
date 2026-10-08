import ReservationClient from './ReservationClient'
import { getDictionary, type Locale } from '@/i18n'

export default function ReservationPage({ lang }: { lang: Locale }) {
  return <ReservationClient t={getDictionary(lang).reservation} lang={lang} />
}
