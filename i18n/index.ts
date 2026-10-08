// Server-side entry point for translations. Import from server components only; client components
// receive the strings they need as props, so no language ships in another language's JavaScript.

import type { Locale } from './config'
import tr, { type Dictionary } from './dictionaries/tr'
import en from './dictionaries/en'

const DICTIONARIES: Record<Locale, Dictionary> = { tr, en }

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang]
}

export type { Dictionary }
export * from './config'
