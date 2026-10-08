// Localized menu for the menu page and its structured data. Server-side only: each page passes the
// result to the client menu as props, so a language's menu text ships only with that language's page.

import { categories, menuItems } from '@/data/menu'
import type { Locale } from '../config'
import type { MenuEntry, MenuTranslation } from './types'
import menuEn from './en'

const TRANSLATIONS: Partial<Record<Locale, MenuTranslation>> = { en: menuEn }

// Placeholder description shared by most dishes in data/menu.ts; never shown
const BOILERPLATE = 'taze günlük ürünleriyle'

export function getMenu(lang: Locale): { categories: { slug: string; name: string; description: string }[]; items: MenuEntry[] } {
  const t = TRANSLATIONS[lang]

  const items = menuItems.map((item): MenuEntry => {
    const tItem = t?.items[item.id]
    const description = t
      ? tItem?.description ?? ''
      : item.description.includes(BOILERPLATE) ? '' : item.description
    return {
      id: item.id,
      name: tItem?.name ?? item.name,
      description,
      price: item.price,
      categorySlug: item.categorySlug,
      ...(item.subCategory ? { subCategory: t?.subCategories[item.subCategory] ?? item.subCategory } : {}),
      ...(item.weight ? { weight: t ? t.weight(item.weight) : item.weight } : {}),
      ...(item.variants
        ? { variants: item.variants.map((v) => ({ name: t?.variants[v.name] ?? v.name, price: v.price })) }
        : {}),
    }
  })

  return {
    categories: categories.map((c) => ({
      slug: c.slug,
      name: t?.categories[c.slug]?.name ?? c.name,
      description: t?.categories[c.slug]?.description ?? c.description ?? '',
    })),
    items,
  }
}
