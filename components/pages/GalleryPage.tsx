import GalleryClient from '@/components/GalleryClient'
import { getDictionary, type Locale } from '@/i18n'

// Gallery order; alt texts come from the dictionary (imageAlts)
const GALLERY_IMAGES = [
  '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
  '/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg',
  '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
  '/images/kolcuoglu-florya-restoran-salonu.jpeg',
  '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg',
  '/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg',
  '/images/kolcuoglu-florya-adana-kebap.jpg',
  '/images/kolcuoglu-florya-kebap-sofrasi.jpg',
  '/images/kolcuoglu-florya-ocakbasi-keyfi.jpg',
  '/images/florya-en-iyi-kebapci.jpg',
  '/images/istanbul-metrelik-kebap-kolcuoglu.jpg',
  '/images/kolcuoglu-kebap-florya-istanbul.jpg',
  '/images/kolcuoglu-florya-geleneksel-lezzetler.jpg',
  '/images/kolcuoglu-florya-sicak-mezeler.jpg',
  '/images/kolcuoglu-florya-kuzu-sis.jpg',
  '/images/kolcuoglu-florya-kunefe-tatlisi.jpg',
  '/images/kolcuoglu-florya-katmer-tatlisi.jpg',
  '/images/kolcuoglu-florya-ayran-salgam.jpg',
  '/images/kolcuoglu-florya-lahmacun-pide.jpg',
  '/images/kolcuoglu-florya-vip-salon.jpg',
  '/images/kolcuoglu-florya-ocakbasi-ustasi.jpg',
  '/images/kolcuoglu-florya-lezzet-duragi.jpg',
  '/images/kolcuoglu-florya-ozel-davetler.jpg',
  '/images/kolcuoglu-florya-denize-sifir-kebap.jpg',
  '/images/kolcuoglu-florya-kuzu-pirzola.jpg',
  '/images/kolcuoglu-florya-soguk-mezeler.jpg',
  '/images/kolcuoglu-florya-sofra-duzeni.jpg',
] as const

export default function GalleryPage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang)
  const t = dict.gallery
  const images = GALLERY_IMAGES.map((src) => ({ src, alt: dict.imageAlts[src] }))
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
          <p className="section-label mb-4">{t.label}</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-cream)',
            }}
          >
            {t.title}
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)', maxWidth: '576px', margin: '0 auto', width: '100%' }}>
            {t.intro}
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Dynamic Grid Layout */}
      <GalleryClient images={images} t={t} />
    </div>
  )
}
