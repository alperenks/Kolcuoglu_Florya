import localFont from 'next/font/local'
import { Inter, Playfair_Display } from 'next/font/google'

// Shared by every root layout (app/(tr)/layout.tsx, app/en/layout.tsx, …) via RootDocument.

export const kolcuogluBrand = localFont({
  src: '../public/fonts/kolcuoglu-brand.ttf',
  variable: '--font-brand',
  display: 'swap',
})

// Self-hosted at build time (no render-blocking request to fonts.googleapis.com).
// Variable fonts cover every weight in one file. Turkish needs latin-ext (ğ, ş, İ), but the
// above-the-fold h1 ("116 Yıllık Gelenek, Herkes için.") only uses the latin subset (ı is in
// latin). Each family is therefore split into a small preloaded latin file and a latin-ext /
// file that is NOT preloaded (browser fetches it only when a glyph needs it), so ~250 KB
// of font preloads no longer compete with CSS/JS on slow mobile connections.
// preload:false everywhere: with Next 16.2.1 (Turbopack) every preloaded font gets two identical @font-face rules
// (a '.p.' file and a normal one), so each preloaded file was downloaded twice (~125 KB wasted).
// Stack order matters: the ext family comes first and has no size-adjusted fallback of its own;
// the latin family (with its fallback) follows, so a glyph missing from both lands in the fallback.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})
const playfairExt = Playfair_Display({
  subsets: ['latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-ext',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})
const interExt = Inter({
  subsets: ['latin-ext'],
  variable: '--font-inter-ext',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

// Font variables live on <html> so :root's --font-serif / --font-sans can resolve them
export const htmlFontClasses = `${playfair.variable} ${playfairExt.variable} ${inter.variable} ${interExt.variable}`
