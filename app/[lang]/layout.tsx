import type { Metadata, Viewport } from 'next'
import RootDocument from '@/components/layout/RootDocument'
import { PREFIXED_LOCALES } from '@/i18n'
import { rootMetadata } from '@/i18n/metadata'
import { resolveLang } from '@/i18n/params'

// Root layout of every non-Turkish language (/en, …). All pages are prerendered at build time;
// any other first segment (including /tr) is a 404.

export const dynamicParams = false

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  return rootMetadata(await resolveLang(params))
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  return <RootDocument lang={await resolveLang(params)}>{children}</RootDocument>
}
