// Page metadata per language: titles, descriptions, canonical URL and hreflang alternates.

import type { Metadata } from 'next'
import { getDictionary } from '.'
import { alternates, LOCALES, OG_LOCALES, path, type Locale, type PageKey } from './config'

export const SITE_URL = 'https://www.kolcuogluflorya.com'
const OG_IMAGE = '/images/og-kolcuoglu-florya.jpg'

/** Metadata of a root layout (also the homepage's). */
export function rootMetadata(lang: Locale): Metadata {
  const m = getDictionary(lang).meta
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.siteTitle, template: '%s | Kolcuoğlu Florya' },
    description: m.siteDescription,
    keywords: m.keywords,
    // NOTE: canonical is per-route; every route must set its own alternates (see pageMetadata)
    alternates: alternates(lang, 'home'),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: path(lang, 'home'),
      siteName: 'Kolcuoğlu Florya',
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: m.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.twitterDescription,
      images: [OG_IMAGE],
    },
  }
}

type InnerPage = Exclude<PageKey, 'home'>

/** Metadata of an inner page: localized title/description, canonical and hreflang links. */
export function pageMetadata(lang: Locale, page: InnerPage): Metadata {
  const { title, description } = getDictionary(lang).meta[page]
  return { title, description, alternates: alternates(lang, page) }
}
