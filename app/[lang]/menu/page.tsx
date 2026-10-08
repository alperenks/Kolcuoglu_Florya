import type { Metadata } from 'next'
import MenuPage from '@/components/menu/MenuPage'
import { pageMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

export async function generateMetadata({ params }: PageProps<'/[lang]/menu'>): Promise<Metadata> {
  return pageMetadata(await resolveLang(params), 'menu')
}

export default async function Page({ params }: PageProps<'/[lang]/menu'>) {
  return <MenuPage lang={await resolveLang(params)} />
}
