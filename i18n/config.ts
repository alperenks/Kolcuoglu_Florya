// Languages and localized URLs. Small and client-safe: the navbar's language switch imports it.
//
// Turkish is the default language and keeps the original URLs (app/(tr)/…, no prefix).
// Every other language has its own folder, app/<lang>/…, with English slugs (/en/menu, /en/gallery, …).
// Adding a language: add it to LOCALES, LOCALE_NAMES and OG_LOCALES; write i18n/dictionaries/<lang>.ts,
// i18n/menu/<lang>.ts and components/privacy/PrivacyBody<Lang>.tsx and register them (i18n/index.ts,
// i18n/menu/index.ts, components/pages/PrivacyPage.tsx); copy app/en to app/<lang> and edit its lang.ts;
// add the language name to app/api/reservations/route.ts. Sitemap, hreflang and the switcher follow.

export const LOCALES = ['tr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'tr'

export const LOCALE_NAMES: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
}

/** Open Graph locale per language (en: British English, matching the copy). */
export const OG_LOCALES: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_GB',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

const TR_PATHS = {
  home: '/',
  menu: '/menu',
  gallery: '/galeri',
  corporate: '/sirket-yemekleri',
  contact: '/iletisim',
  reservation: '/rezervasyon',
  privacy: '/gizlilik',
} as const

export type PageKey = keyof typeof TR_PATHS

const INTL_SLUGS: Record<PageKey, string> = {
  home: '',
  menu: '/menu',
  gallery: '/gallery',
  corporate: '/corporate-dining',
  contact: '/contact',
  reservation: '/reservation',
  privacy: '/privacy',
}

export const PAGE_KEYS = Object.keys(TR_PATHS) as PageKey[]

/** URL path of a page in a language, e.g. path('en', 'gallery') → '/en/gallery'. */
export function path(lang: Locale, page: PageKey): string {
  return lang === DEFAULT_LOCALE ? TR_PATHS[page] : `/${lang}${INTL_SLUGS[page]}`
}

/** Which page a pathname belongs to (any language), or null. */
export function pageFromPathname(pathname: string): PageKey | null {
  const clean = pathname.replace(/\/+$/, '') || '/'
  for (const lang of LOCALES) {
    for (const page of PAGE_KEYS) {
      if (path(lang, page) === clean) return page
    }
  }
  return null
}

/** Metadata `alternates` for a page: its canonical URL plus hreflang links to every language. */
export function alternates(lang: Locale, page: PageKey) {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[l] = path(l, page)
  languages['x-default'] = path(DEFAULT_LOCALE, page)
  return { canonical: path(lang, page), languages }
}
