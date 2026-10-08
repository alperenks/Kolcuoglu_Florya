// Shared pieces of the privacy page (all languages).
import type { ReactNode } from 'react'

// Privacy notice (KVKK aydınlatma metni) + the privacy policy URL of the "Kolcuoğlu Panel"
// Google Cloud / Meta app (Google requires one to publish the OAuth app).

export const UNVAN = 'KNK Restaurant Gıda Anonim Şirketi'
export const MERSIS = '0564143022700001'
export const ADRES = 'Basınköy, Çekmece İstanbul Cd. No:39, 34153 Bakırköy/İstanbul'
export const EPOSTA = 'kolcuogluflorya@gmail.com'
export const TELEFON = '+90 533 131 54 01'

export function Bolum({ baslik, children }: { baslik: string; children: ReactNode }) {
  return (
    <section className="py-8" style={{ borderTop: '1px solid var(--color-border-strong)' }}>
      <h2
        className="font-serif mb-4"
        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-cream)' }}
      >
        {baslik}
      </h2>
      <div className="space-y-3 text-[0.95rem] leading-relaxed" style={{ color: 'var(--color-text-desc)' }}>
        {children}
      </div>
    </section>
  )
}

export const Liste = ({ children }: { children: ReactNode }) => <ul className="list-disc space-y-2 pl-5">{children}</ul>
export const Vurgu = ({ children }: { children: ReactNode }) => <strong style={{ color: 'var(--color-cream)' }}>{children}</strong>
