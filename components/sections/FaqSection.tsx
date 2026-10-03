// Sık sorulan sorular — yerel <details> (JS yok) + FAQPage JSON-LD (aynı metin).
// Yalnızca doğrulanmış bilgiler: vale ücretsiz, kapalı ısıtmalı alan, saatler, adres, ulaşım, telefon/WhatsApp.
import Link from 'next/link'

const PHONE_TEL = 'tel:+905331315401'
const PHONE_TEXT = '0533 131 54 01'

const faqs = [
  {
    q: 'Burası gerçek Kolcuoğlu mu?',
    a: 'Evet, burası Kolcuoğlu markasının kendi restoranıdır ve franchise veya bir başka marka değildir.',
  },
  {
    q: 'Kolcuoğlu Özel Menü nasıl işliyor?',
    a: 'Menümüz minimum iki kişiliktir ve fiyatımız kişi başı 1.800 TL\'dir.',
  },
  {
    q: 'Vale ücretli mi?',
    a: 'Hayır, vale hizmetimiz ücretsizdir. Ayrıca otoparkımız bulunmaktadır.',
  },
  {
    q: 'Kışın da deniz manzarasıyla yemek yiyebilir miyiz?',
    a: 'Evet. Kapalı ve ısıtmalı alanımızda hava koşullarından bağımsız oturabilirsiniz ve her masadan denizi görebilirsiniz.',
  },
  {
    q: 'Rezervasyon nasıl yapılır?',
    a: `${PHONE_TEXT} numaralı telefondan arayarak, aynı numaradan WhatsApp ile yazarak ya da rezervasyon formunu doldurarak masa ayırtabilirsiniz.`,
    extra: 'reservation',
  },
  {
    q: 'Grup ve şirket yemeği yapıyor musunuz?',
    a: "Evet. Aile buluşmaları, kurumsal yemekler ve özel günler için 500 kişiye kadar organizasyon yapıyoruz; kişi sayısı ve tarihe göre kurumsal menü ve teklif hazırlıyoruz.",
    extra: 'corporate',
  },
  {
    q: 'Restoran nerede, Yeşilköy ve Ataköy’den ne kadar sürer?',
    a: "Basınköy, Çekmece İstanbul Cd. No:39, Bakırköy/İstanbul adresindeyiz. Yeşilköy'den yaklaşık 10, Ataköy ve Bakırköy'den yaklaşık 15 dakikadır.",
  },
  {
    q: 'Çalışma saatleriniz nedir?',
    a: 'Her gün 11:00 – 00:00 arası hizmet veriyoruz.',
  },
  {
    q: 'Çocuk oyun alanı var mı?',
    a: 'Hayır, çocuk oyun alanımız bulunmamaktadır.',
  },
  {
    q: 'Engelli erişimi var mı?',
    a: 'Restoranımızda iki tane asansör bulunmaktadır. Engelli misafirlerimiz de restoranımızı rahatça deneyimleyebilirler.',
  },
  {
    q: 'Restoran alkollü mü?',
    a: 'Evet, restoranımız alkollüdür.',
  },
] as const

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqSection() {
  return (
    <section id="sik-sorulanlar" className="py-24 px-6 relative" style={{ background: 'var(--color-surface)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative z-10 mx-auto" style={{ maxWidth: '820px', width: '100%' }}>
        <div className="text-center mb-12">
          <p className="section-label mb-4">Sık Sorulanlar</p>
          <h2
            className="font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            Merak <span className="text-gradient italic">Edilenler</span>
          </h2>
          <div className="gold-line mt-6 mx-auto" style={{ width: '60px' }} />
        </div>

        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
                {'extra' in f && f.extra === 'reservation' && (
                  <p className="faq-links">
                    <a href={PHONE_TEL}>{PHONE_TEXT}</a>
                    <span aria-hidden="true"> · </span>
                    <Link href="/rezervasyon">Rezervasyon formu</Link>
                  </p>
                )}
                {'extra' in f && f.extra === 'corporate' && (
                  <p className="faq-links">
                    <Link href="/sirket-yemekleri">Şirket yemekleri →</Link>
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
