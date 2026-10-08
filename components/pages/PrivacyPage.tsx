// Privacy page for any language. The notice itself is written per language (components/privacy/);
// the Turkish text is the binding one.
import PrivacyBodyTr from '@/components/privacy/PrivacyBodyTr'
import PrivacyBodyEn from '@/components/privacy/PrivacyBodyEn'
import { getDictionary, type Locale } from '@/i18n'

const BODIES: Record<Locale, () => React.JSX.Element> = {
  tr: PrivacyBodyTr,
  en: PrivacyBodyEn,
}

export default function PrivacyPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).privacy
  const Body = BODIES[lang]
  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px' }}>
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.2) 0%, transparent 65%)' }}
        />
        <div className="relative z-10">
          <p className="section-label mb-4">{t.label}</p>
          <h1
            className="font-serif mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-cream)' }}
          >
            {t.title}
          </h1>
          <div className="gold-line mx-auto" style={{ width: '60px' }} />
          <p className="mt-6 text-sm" style={{ color: 'var(--color-muted)' }}>
            {t.updated}
          </p>
        </div>
      </section>

      <div className="px-6 pb-24" style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <Body />
      </div>
    </div>
  )
}
