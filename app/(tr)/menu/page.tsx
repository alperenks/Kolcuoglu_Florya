import type { Metadata } from 'next'
import MenuPage from '@/components/menu/MenuPage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('tr', 'menu')

export default function Page() {
  return <MenuPage lang="tr" />
}
