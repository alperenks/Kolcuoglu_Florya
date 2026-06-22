import type { Metadata } from 'next'
import { CheckCircle2, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Şirket Yemekleri & Gruplar',
  description: 'Şirket organizasyonları, toplantılar ve özel grup yemekleri için Kolcuoğlu Florya ayrıcalığı.',
}

export default function SirketYemekleriPage() {
  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'var(--color-antracite)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.2) 0%, transparent 65%)' }}
        />
        <div className="relative z-10">
          <p className="section-label mb-4">Kurumsal Lezzet &amp; Organizasyon</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--color-cream)',
            }}
          >
            Şirket Yemekleri
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            İş toplantıları, kutlamalar veya özel şirket organizasyonlarınız için Kolcuoğlu Florya'nın eşsiz menüleri ve şık salonları emrinizde.
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 animate-fade-in">
        <div 
          className="flex flex-col items-center space-y-12 animate-fade-in" 
          style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}
        >
          {/* Title - Remains Centered */}
          <div className="text-center max-w-2xl">
            <h2 
              className="font-serif text-3xl md:text-4xl leading-tight" 
              style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}
            >
              Profesyonel ve Şık Toplantılar
            </h2>
          </div>

          {/* 2-Column Layout (Paragraph Left, Checklist Right on Desktop) */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 w-full items-start text-left">
            {/* Left Column: Paragraph (With left alignment) */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-desc)', textAlign: 'justify' }}>
                Kolcuoğlu Florya olarak, şirket yemekleriniz ve kurumsal organizasyonlarınızda tüm detayları sizin yerinize biz üstleniyoruz. Masaların özenli tasarımından, nesillerdir aktarılan lezzetlerin zamanlamasına ve misafirlerinizin kusursuz şekilde karşılanmasına kadar her şeyi profesyonel ekibimize bırakın. Siz sadece işinize ve ekibinizle geçireceğiniz keyifli anlara odaklanın; geriye kalan her detayı biz sizin için düşünüp mükemmel şekilde organize edelim.
              </p>
            </div>

            {/* Right Column: Benefits List */}
            <div className="w-full bg-white/2 p-6 rounded-sm border border-white/5">
              <ul className="space-y-4">
                {[
                  'Özel Masa Düzeni ve Süsleme Seçenekleri',
                  'Tercihinize Göre Alkollü veya Alkolsüz Menü Teklifleri',
                  'Vale ve Servis Ücreti Yok',
                  'Şirket/Grup Yemeklerinde Yılların Deneyimi'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-copper)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action Container */}
          <div className="pt-8 border-t w-full max-w-lg mx-auto text-center space-y-6" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-gold)' }}>
              Talepleriniz İçin Bize Ulaşın
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <a
                href="/rezervasyon"
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
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                Online Rezervasyon
              </a>

              <a
                href="https://wa.me/905331315401"
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
                WhatsApp Destek
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
