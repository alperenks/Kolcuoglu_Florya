import type { MetadataRoute } from 'next'
import { alternates, LOCALES, path, type PageKey } from '@/i18n/config'
import { SITE_URL } from '@/i18n/metadata'

// Every page in every language, each entry listing its translations (hreflang) for Google.
const PAGES: { page: PageKey; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
  { page: 'home', priority: 1, changeFrequency: 'monthly' },
  { page: 'menu', priority: 0.9, changeFrequency: 'monthly' },
  { page: 'reservation', priority: 0.8, changeFrequency: 'yearly' },
  { page: 'contact', priority: 0.7, changeFrequency: 'yearly' },
  { page: 'gallery', priority: 0.6, changeFrequency: 'monthly' },
  { page: 'corporate', priority: 0.6, changeFrequency: 'yearly' },
  { page: 'privacy', priority: 0.2, changeFrequency: 'yearly' },
]

const abs = (p: string) => (p === '/' ? SITE_URL : `${SITE_URL}${p}`)

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    PAGES.map(({ page, priority, changeFrequency }) => ({
      url: abs(path(lang, page)),
      priority,
      changeFrequency,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates(lang, page).languages).map(([l, p]) => [l, abs(p)]),
        ),
      },
    })),
  )
}
