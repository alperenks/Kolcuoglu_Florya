// 404 for URLs that match no page. Needed because each language has its own root layout
// (app/(tr)/layout.tsx, app/en/layout.tsx), so there is no single layout to build a 404 from.
// Bilingual on purpose: we can't know the visitor's language from an unknown URL.
import type { Metadata } from 'next'
import './globals.css'
import { htmlFontClasses, kolcuogluBrand } from './fonts'

export const metadata: Metadata = {
  title: 'Sayfa bulunamadı · Page not found | Kolcuoğlu Florya',
}

const button = {
  border: '1px solid var(--color-border-subtle)',
  color: 'var(--color-cream)',
  borderRadius: '2px',
  letterSpacing: '0.15em',
} as const

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={htmlFontClasses}>
      <body
        className={`${kolcuogluBrand.variable} theme-light min-h-screen flex items-center justify-center px-6`}
        style={{ background: 'var(--color-antracite)' }}
      >
        <main className="text-center py-24" style={{ maxWidth: '560px' }}>
          <p className="font-brand leading-none mb-1" style={{ fontSize: '2.6rem', color: 'rgba(163, 33, 36, 1)' }}>
            Kolcuoglu
          </p>
          <p className="text-xs uppercase mb-10" style={{ color: 'var(--color-muted)', letterSpacing: '0.2em' }}>
            FLORYA
          </p>
          <p className="section-label mb-4">404</p>
          <h1
            className="font-serif mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-cream)' }}
          >
            Sayfa bulunamadı
          </h1>
          <p className="text-base mb-1" style={{ color: 'var(--color-text-desc)' }}>
            Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
          </p>
          <p lang="en" className="text-sm mb-10" style={{ color: 'var(--color-muted)' }}>
            Page not found. The page you’re looking for may have moved or never existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="px-8 py-3.5 text-xs uppercase font-semibold" style={button}>
              Ana Sayfa
            </a>
            <a href="/en" hrefLang="en" lang="en" className="px-8 py-3.5 text-xs uppercase font-semibold" style={button}>
              English Home
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
