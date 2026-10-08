// Sık sorulan sorular — yerel <details> (JS yok) + FAQPage JSON-LD (aynı metin).
// Yalnızca doğrulanmış bilgiler: vale ücretsiz, kapalı ısıtmalı alan, saatler, adres, ulaşım, telefon/WhatsApp.
import Link from 'next/link'
import { getDictionary, path, type Dictionary, type Locale } from '@/i18n'

const PHONE_TEL = 'tel:+905331315401'

function faqJsonLd(faqs: Dictionary['faq']['items']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export default function FaqSection({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang)
  const t = dict.faq
  const faqs = t.items
  const PHONE_TEXT = dict.phoneDisplay // tr: 0533 131 54 01, other languages: +90 533 131 54 01
  return (
    <section id="sik-sorulanlar" className="py-24 px-6 relative" style={{ background: 'var(--color-surface)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <div className="relative z-10 mx-auto" style={{ maxWidth: '820px', width: '100%' }}>
        <div className="text-center mb-12">
          <p className="section-label mb-4">{t.label}</p>
          <h2
            className="font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            {t.titleStart} <span className="text-gradient italic">{t.titleAccent}</span>
          </h2>
          <div className="gold-line mt-6 mx-auto" style={{ width: '60px' }} />
        </div>

        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
                {f.extra === 'reservation' && (
                  <p className="faq-links">
                    <a href={PHONE_TEL} data-konum="sss">{PHONE_TEXT}</a>
                    <span aria-hidden="true"> · </span>
                    <Link href={path(lang, 'reservation')}>{t.reservationForm}</Link>
                  </p>
                )}
                {f.extra === 'call' && (
                  <p className="faq-links">
                    <a href={PHONE_TEL} data-konum="sss">{t.callForQuote} · {PHONE_TEXT}</a>
                  </p>
                )}
                {f.extra === 'corporate' && (
                  <p className="faq-links">
                    <Link href={path(lang, 'corporate')}>{t.corporateLink}</Link>
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
