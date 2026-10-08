import type { Metadata } from 'next'
import MenuPage from '@/components/menu/MenuPage'
import { pageMetadata } from '@/i18n/metadata'
import { LANG } from '../lang'

export const metadata: Metadata = pageMetadata(LANG, 'menu')

export default function Page() {
  return <MenuPage lang={LANG} />
}
