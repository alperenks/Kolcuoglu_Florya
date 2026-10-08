import { notFound } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale, type Locale } from './config'

/** The language of an app/[lang] route; 404 for anything that isn't a prefixed language. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) notFound()
  return lang
}
