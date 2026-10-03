// "Neden Kolcuoğlu Florya?" — kısa, anahtar kelime uyumlu, sunucuda çizilen bölüm.
// Amaç: reklam metinlerinin vaat ettiği şeyleri (denize sıfır, ücretsiz vale, kapalı ısıtmalı alan,
// metrelik kebabın mucidi, grup yemekleri, ulaşım) ana sayfada düz metin olarak göstermek.
// Animasyon/JS yok: ilk boyamayı geciktirmez.
import Link from 'next/link'
import { Waves, Car, Flame, Users, MapPin, Beef } from 'lucide-react'

const items = [
  {
    icon: Waves,
    title: 'Denize Sıfır, Her Masadan Manzara',
    text: 'Restoranımız denize sıfırdır; boydan boya panoramik cam ve masa düzenimiz sayesinde her masamızdan denize hakimsiniz.',
  },
  {
    icon: Car,
    title: 'Ücretsiz Vale ve Otopark',
    text: 'Arabanızı bırakın, doğrudan masanıza geçin. Vale hizmetimiz ücretsiz, otoparkımız hizmetinizde.',
  },
  {
    icon: MapPin,
    title: 'Kolay Ulaşım',
    text: "Yeşilköy'den 10, Ataköy ve Bakırköy'den 15 dakika. Basınköy, Çekmece İstanbul Cd. No:39.",
    link: { href: '/iletisim', label: 'Yol tarifi' },
  },
  {
    icon: Flame,
    title: 'Metrelik Kebabın Mucidi',
    text: "1910'dan beri Adana mutfağı. Metrelik kebabı icat eden ailenin 7. kuşağı, aynı kor ateşte.",
  },
  {
    icon: Beef,
    title: "Adana'dan Gelen Et, Orijinal Zırh Kıyması",
    text: "Etimiz Adana'dan gelir; kebabımız orijinal zırh kıymasıdır. Adana mutfağının asıl lezzeti, kor ateşte pişer.",
  },
  {
    icon: Users,
    title: 'Şirket Yemekleri',
    text: 'Kurumsal yemekler için 500 kişiye kadar organizasyon. Fakir, MESİAD, Türk Telekom, İpekyol, Trendyol gibi büyük markalar şirket yemekleri için bizi tercih etmiştir.',
    link: { href: '/sirket-yemekleri', label: 'Kurumsal teklif' },
  },
] as const

export default function WhyUsSection() {
  return (
    <section id="neden-kolcuoglu-florya" className="py-24 px-6 relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="relative z-10" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        <div className="text-center mb-14">
          <p className="section-label mb-4">Neden Kolcuoğlu Florya?</p>
          <h2
            className="font-serif leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            Florya Sahilinde{' '}
            <span className="text-gradient italic">Denize Sıfır Restoran</span>
          </h2>
          <div className="gold-line mt-6 mx-auto" style={{ width: '60px' }} />
          <p
            className="mt-6 mx-auto text-base leading-relaxed"
            style={{ color: 'var(--color-text-desc)', maxWidth: '640px' }}
          >
            Kebap ve ocakbaşı sofrası, deniz manzarası ve rahat bir akşam yemeği için Yeşilköy, Ataköy ve
            Bakırköy&apos;e kısa mesafedeyiz.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            const link = 'link' in item ? item.link : undefined
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
