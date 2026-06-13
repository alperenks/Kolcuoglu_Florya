import type { Metadata } from 'next'
import { Mail, CheckCircle2, MessageSquare } from 'lucide-react'

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
      <section className="py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>

          {/* Image Placeholder */}
          <div
            className="aspect-[4/3] rounded-lg relative overflow-hidden flex items-center justify-center transition-all duration-300"
            style={{
              background: 'var(--color-card-inner-bg)',
              border: '1px solid rgba(163,33,36,0.2)'
            }}
          >
            <p className="text-sm tracking-widest uppercase opacity-50 text-center px-4" style={{ color: 'var(--color-gold)' }}>
              [ Şirket Yemeği Görseli Buraya Gelecek ]<br />
              <span className="text-xs text-[var(--color-muted)] lowercase tracking-normal">Görsel eklendiğinde bu kutuyu tam kaplayacaktır.</span>
            </p>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl mb-4" style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}>
                Profesyonel ve Şık Toplantılar
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Motivasyon yemekleri, bayi toplantıları ya da sadece ekibinizi ödüllendirmek için... Size özel fix menü seçenekleri ve misafir kapasitemizle isteklerinizi en üst düzeyde karşılıyoruz.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                'Özel Masa Düzeni',
                'Ekiplere Özel Fix Menü Seçenekleri',
                'Öncelikli Vale ve Otopark Hizmeti',
                'Profesyonel Servis ve Misafir Karşılama'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-copper)' }} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t space-y-4" style={{ borderColor: 'var(--color-border-strong)' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-gold)' }}>Talepleriniz İçin Bize Ulaşın</p>

              <div className="flex flex-col gap-4">
                <a
                  href="/rezervasyon"
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-transform hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                    color: 'white',
                    borderRadius: '2px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(196, 75, 59, 0.3)',
                  }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  Online Grup Rezervasyonu Yap
                </a>

                <a
                  href="https://wa.me/905331315401"
                  target="_blank" rel="noreferrer"
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-all hover:bg-[var(--color-card-inner-bg)]/80"
                  style={{
                    background: 'var(--color-card-inner-bg)',
                    color: 'var(--color-cream)',
                    borderRadius: '2px',
                    border: '1px solid rgba(163,33,36,0.2)',
                  }}
                >
                  <MessageSquare size={16} />
                  WhatsApp Destek
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
