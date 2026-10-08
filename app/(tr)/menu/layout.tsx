import type { Metadata } from 'next'
import { categories, menuItems } from '@/data/menu'

export const metadata: Metadata = {
  title: 'Menü – Metrelik Kebap, Adana Kebap ve Meze Fiyatları',
  description:
    "Kolcuoğlu Florya menüsü: metrelik kebap, Adana kebap, kuzu şiş, sarma beyti, mezeler, lahmacun, künefe ve katmer. Güncel fiyatlarla İstanbul Florya'da.",
  alternates: { canonical: '/menu' },
}

// Menu structured data (no prices — kept price-free on purpose so stale
// prices never surface in Google rich results)
const BOILERPLATE = 'taze günlük ürünleriyle'

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': 'https://www.kolcuogluflorya.com/menu#menu',
  name: 'Kolcuoğlu Florya Menü',
  inLanguage: 'tr',
  hasMenuSection: categories.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.name,
    description: cat.description,
    hasMenuItem: menuItems
      .filter((item) => item.categorySlug === cat.slug)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description && !item.description.includes(BOILERPLATE)
          ? { description: item.description }
          : {}),
      })),
  })),
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      {children}
    </>
  )
}
