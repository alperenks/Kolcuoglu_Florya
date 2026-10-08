/** One menu line as the menu page renders it (description already filtered, names localized). */
export interface MenuEntry {
  id: string
  name: string
  description: string
  price: number
  categorySlug: string
  subCategory?: string
  weight?: string
  variants?: { name: string; price: number }[]
}

export interface MenuTranslation {
  /** Converts a printed weight/size such as '200 gr.' or '5 Adet' */
  weight: (weight: string) => string
  categories: Record<string, { name: string; description: string }>
  /** Printed sub-headings (Viski, Kırmızı, …); a missing key keeps the original */
  subCategories: Record<string, string>
  /** Variant labels (Tek, Duble, 15 Yıllık, …); a missing key keeps the original */
  variants: Record<string, string>
  items: Record<string, { name?: string; description?: string }>
}
