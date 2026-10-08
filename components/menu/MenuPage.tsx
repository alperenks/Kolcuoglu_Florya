// Menu page for any language: Menu structured data + the interactive menu.
import MenuClient from './MenuClient'
import { getDictionary, path, type Locale } from '@/i18n'
import { getMenu } from '@/i18n/menu'
import { SITE_URL } from '@/i18n/metadata'

export default function MenuPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).menu
  const { categories, items } = getMenu(lang)

  // Menu structured data (no prices — kept price-free on purpose so stale
  // prices never surface in Google rich results)
  const menuJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}${path(lang, 'menu')}#menu`,
    name: t.jsonLdName,
    inLanguage: lang,
    hasMenuSection: categories.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.name,
      description: cat.description,
      hasMenuItem: items
        .filter((item) => item.categorySlug === cat.slug)
        .map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
        })),
    })),
  }

  // The set menu is shown as its own card, not as an accordion
  const accordionItems = items.filter((item) => item.categorySlug !== 'fiks-menu')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }} />
      <MenuClient items={accordionItems} t={t} lang={lang} />
    </>
  )
}
