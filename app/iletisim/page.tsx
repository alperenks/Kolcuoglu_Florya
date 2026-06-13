import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Kolcuoğlu Restoran iletişim bilgileri, konum ve çalışma saatleri. İstanbul Florya\'da bulunuyoruz.',
}

const workingHours = [
  { day: 'Her Gün', hours: '11:00 – 00:00' },
]

export default function IletisimPage() {
  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px' }}>
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
          <p className="section-label mb-4">Bize Ulaşın</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-cream)',
            }}
          >
            İletişim
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)', maxWidth: '576px', margin: '0 auto', width: '100%' }}>
            Rezervasyon, etkinlik organizasyonu veya herhangi bir konuda bize ulaşabilirsiniz.
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="grid lg:grid-cols-5 gap-10" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
          {/* Map */}
          <div className="lg:col-span-3 rounded overflow-hidden" style={{ height: '480px', border: '1px solid var(--color-border-strong)' }}>
            <iframe
              src="https://maps.google.com/maps?q=Kolcuo%C4%9Flu%20Restaurant%20Florya&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="map-iframe"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kolcuoğlu Florya Konumu"
            />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div
              className="rounded p-6 space-y-5"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <p className="section-label">İletişim Bilgileri</p>

              <div className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold)' }}>Adres</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
                    Çekmece İstanbul Cd. 39<br />
                    34153 Bakırköy / İstanbul
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a href="https://maps.app.goo.gl/2vAwEAAYAtk6AncA7" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors hover:bg-[var(--color-card-inner-bg)]/80" style={{ background: 'var(--color-card-inner-bg)', color: 'var(--color-gold)', border: '1px solid rgba(163,33,36,0.2)' }}>
                      <Navigation size={10} /> Google Maps
                    </a>
                    <a href="https://yandex.com.tr/maps/-/CPd7bWPN" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors hover:bg-[var(--color-card-inner-bg)]/80" style={{ background: 'var(--color-card-inner-bg)', color: 'var(--color-gold)', border: '1px solid rgba(163,33,36,0.2)' }}>
                      <Navigation size={10} /> Yandex Maps
                    </a>
                    <a href="https://maps.apple.com/p/2WWEUIYPiLE.kL" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors hover:bg-[var(--color-card-inner-bg)]/80" style={{ background: 'var(--color-card-inner-bg)', color: 'var(--color-gold)', border: '1px solid rgba(163,33,36,0.2)' }}>
                      <Navigation size={10} /> Apple Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold)' }}>Telefon & WhatsApp</p>
                  <a
                    href="https://wa.me/905331315401"
                    target="_blank" rel="noreferrer"
                    className="text-sm transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    +90 533 131 54 01
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold)' }}>E-posta</p>
                  <a
                    href="mailto:info@kolcuogluflorya.com"
                    className="text-sm transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    info@kolcuogluflorya.com
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div
              className="rounded p-6"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} style={{ color: 'var(--color-gold)' }} />
                <p className="section-label">Çalışma Saatleri</p>
              </div>
              <div className="space-y-3">
                {workingHours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-muted)' }}>{day}</span>
                    <span style={{ color: 'var(--color-cream)', fontWeight: 500 }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(163,33,36,0.1)' }}
      >
        <p className="font-serif text-2xl mb-4" style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}>
          Sizi Soframızda Görmek İsteriz
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
          Telefon ile rezervasyon yaptırmak için hemen arayabilirsiniz.
        </p>
        <a
          href="tel:+905331315401"
          className="px-10 py-4 text-sm tracking-widest uppercase font-semibold inline-block text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
            color: 'white',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.15em',
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 4px 20px rgba(196, 75, 59, 0.3)',
            cursor: 'pointer',
          }}
        >
          Telefon ile Rezervasyon →
        </a>
      </section>
    </div>
  )
}
