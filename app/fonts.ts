import localFont from 'next/font/local'
import { Inter, Playfair_Display } from 'next/font/google'

// Shared by every root layout (app/(tr)/layout.tsx, app/en/layout.tsx, …) via RootDocument.

export const kolcuogluBrand = localFont({
  src: '../public/fonts/kolcuoglu-brand.ttf',
  variable: '--font-brand',
  display: 'swap',
})

// Self-hosted at build time (no render-blocking request to fonts.googleapis.com).
// Variable fonts cover every weight in one file. The CSS next/font/google generates holds every
// unicode-range file of the family (latin, latin-ext, cyrillic, …); the browser fetches a file
// only when the page has a character in its range.
// preload:false everywhere: with Next 16.2.1 (Turbopack) every preloaded font gets two identical @font-face rules
// (a '.p.' file and a normal one), so each preloaded file was downloaded twice (~125 KB wasted).
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

// Turkish letters Ğ ğ İ Ş ş (ı is in latin) and ₺ live in Google's latin-ext file, which also carries
// dozens of other languages: ~130 KB across Inter + Playfair (Inter's alone is 85 KB) for six
// characters. These *-tr.woff2 files are those same Google latin-ext files cut down to the six
// characters with fonttools (pyftsubset --unicodes=U+011E-011F,U+0130,U+015E-015F,U+20BA
// --layout-features='*' --flavor=woff2); outlines, widths and weight axis are unchanged (~9 KB total).
// Their family comes first in --font-sans / --font-serif; any other latin-ext character falls through
// to the full Google family behind it, which then fetches its latin-ext file as before.
// Playfair has no ₺ glyph, so its files leave it out and ₺ keeps falling back as it always did.
// To regenerate, take the latin-ext files from .next/static/media (unicode-range U+0100-02BA, …).
// next/font needs literal option values, so the range is written out in both calls below.

const playfairTr = localFont({
  src: [
    { path: '../public/fonts/playfair-tr.woff2', weight: '400 900', style: 'normal' },
    { path: '../public/fonts/playfair-italic-tr.woff2', weight: '400 900', style: 'italic' },
  ],
  variable: '--font-playfair-tr',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+011E-011F, U+0130, U+015E-015F, U+20BA' }],
})

const interTr = localFont({
  src: '../public/fonts/inter-tr.woff2',
  weight: '100 900',
  variable: '--font-inter-tr',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+011E-011F, U+0130, U+015E-015F, U+20BA' }],
})

// Font variables live on <html> so :root's --font-serif / --font-sans can resolve them
export const htmlFontClasses = `${playfair.variable} ${playfairTr.variable} ${inter.variable} ${interTr.variable}`
