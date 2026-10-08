// "Neden Kolcuoğlu Florya?" — kısa, anahtar kelime uyumlu, sunucuda çizilen bölüm.
// Amaç: reklam metinlerinin vaat ettiği şeyleri (denize sıfır, ücretsiz vale, kapalı ısıtmalı alan,
// metrelik kebabın mucidi, grup yemekleri, ulaşım) ana sayfada düz metin olarak göstermek.
// Animasyon/JS yok: ilk boyamayı geciktirmez.
import Link from 'next/link'
import { Waves, Car, Flame, Users, MapPin, Beef } from 'lucide-react'
import { getDictionary, path, type Locale } from '@/i18n'

const ITEMS = [
  { key: 'seaView', icon: Waves },
  { key: 'valet', icon: Car },
  { key: 'access', icon: MapPin, page: 'contact' },
  { key: 'inventor', icon: Flame },
  { key: 'meat', icon: Beef },
  { key: 'corporate', icon: Users, page: 'corporate' },
] as const

export default function WhyUsSection({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).whyUs
  return (
    <section id="neden-kolcuoglu-florya" className="py-24 px-6 relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="relative z-10" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        <div className="text-center mb-14">
          <p className="section-label mb-4">{t.label}</p>
          <h2
            className="font-serif leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            {t.titleStart}{' '}
            <span className="text-gradient italic">{t.titleAccent}</span>
          </h2>
          <div className="gold-line mt-6 mx-auto" style={{ width: '60px' }} />
          <p
            className="mt-6 mx-auto text-base leading-relaxed"
            style={{ color: 'var(--color-text-desc)', maxWidth: '640px' }}
          >
            {t.intro}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((entry) => {
            const Icon = entry.icon
            const item = t.items[entry.key]
            const link =
              'page' in entry && 'link' in item ? { href: path(lang, entry.page), label: item.link } : undefined
            return (
              <div
                key={item.title}
                className="card-glow rounded-sm p-7"
                style={{ background: 'var(--color-charcoal)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ border: '1px solid rgba(163,33,36,0.35)', color: 'var(--color-gold)' }}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3
                  className="font-serif mb-3 text-xl leading-snug"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cream)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.text}
                </p>
                {link && (
                  <Link
                    href={link.href}
                    className="mt-4 inline-block text-xs font-semibold uppercase"
                    style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
                  >
                    {link.label} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
