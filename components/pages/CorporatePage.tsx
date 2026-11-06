import Image from 'next/image'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { getDictionary, path, type Locale } from '@/i18n'

function Buttons({ lang, t }: { lang: Locale; t: ReturnType<typeof getDictionary>['corporate'] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
      <a
        href={path(lang, 'reservation')}
        className="w-full sm:w-[240px] flex justify-center items-center gap-2 py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-transform hover:scale-[1.01] whitespace-nowrap text-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
          color: 'white',
          borderRadius: '2px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(196, 75, 59, 0.3)',
          height: '56px',
        }}
      >
        {t.quote}
      </a>
      <a
        href="https://wa.me/905331315401"
        data-konum="sirket_yemekleri"
        target="_blank" rel="noreferrer"
        className="w-full sm:w-[240px] flex justify-center items-center gap-2 py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-all hover:bg-[var(--color-card-inner-bg)]/80 whitespace-nowrap text-center"
        style={{
          background: 'var(--color-card-inner-bg)',
          color: 'var(--color-cream)',
          borderRadius: '2px',
          border: '1px solid rgba(163,33,36,0.2)',
          height: '56px',
        }}
      >
        <MessageSquare size={16} />
        {t.whatsapp}
      </a>
    </div>
  )
}

export default function CorporatePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).corporate
  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1-3. Title, description, rating, buttons, scroll-to-menu */}
      <section className="pt-20 pb-12 px-6 text-center relative overflow-hidden" style={{ background: 'var(--color-antracite)' }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.2) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1
            className="font-serif"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 6vw, 4rem)', color: 'var(--color-cream)' }}
          >
            {t.title}
          </h1>
          <div className="space-y-4" style={{ maxWidth: '640px' }}>
            <p className="text-base" style={{ color: 'var(--color-muted)' }}>{t.intro}</p>
            <p className="text-base" style={{ color: 'var(--color-muted)' }}>{t.rating}</p>
          </div>
          <div className="gold-line" style={{ width: '60px' }} />
          <Buttons lang={lang} t={t} />
          <a
            href="#menu"
            className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest font-semibold"
            style={{ color: 'var(--color-gold)' }}
          >
            {t.scrollToMenu}
            <ChevronDown size={20} />
          </a>
        </div>
      </section>

      <div className="px-6 pb-24 flex flex-col items-center space-y-16" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        {/* 4. Photos: 2 rows of 2 */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 w-full" style={{ maxWidth: '760px' }}>
          {t.gallery.map((img) => (
            <div key={img.src} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '3 / 2' }}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 380px, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* 5. Story */}
        <div className="text-center space-y-5" style={{ maxWidth: '640px' }}>
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}>
            {t.storyTitle}
          </h2>
          {t.story.map((p, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-text-desc)' }}>{p}</p>
          ))}
        </div>

        {/* 6. Menu */}
        <div id="menu" className="grid md:grid-cols-2 gap-8 md:gap-12 w-full items-center" style={{ scrollMarginTop: '100px' }}>
          <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '4 / 3' }}>
            <Image
              src="/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg"
              alt={t.menuImageAlt}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-gold)' }}>{t.menuLabel}</p>
            <p className="font-serif" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.75rem', color: 'var(--color-cream)', lineHeight: 1 }}>
              {t.menuPrice}
            </p>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>{t.menuPriceNote}</p>
            <div className="space-y-5">
              {t.menuSections.map((sec) => (
                <div key={sec.title} className="space-y-2">
                  <h3 className="font-serif text-xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cream)' }}>{sec.title}</h3>
                  {sec.groups.map((g, i) => (
                    <p key={i} className="text-sm" style={{ color: 'var(--color-text-desc)' }}>
                      {g.label && <span className="uppercase tracking-wider text-xs font-semibold" style={{ color: 'var(--color-copper)' }}>{g.label}: </span>}
                      {g.text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-center -mt-8" style={{ color: 'var(--color-muted)' }}>{t.alcoholNote}</p>

        {/* 7. Second buttons */}
        <Buttons lang={lang} t={t} />
      </div>
    </div>
  )
}
