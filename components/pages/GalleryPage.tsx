import GalleryClient from '@/components/GalleryClient'
import { getDictionary, type Locale } from '@/i18n'

// Gallery groups; alt texts come from the dictionary (imageAlts)
const RESTAURANT_IMAGES = [
  '/images/kolcuoglu-florya-gun-batimi-deniz-manzarasi.jpg',
  '/images/kolcuoglu-florya-dis-cephe-gunduz.jpg',
  '/images/kolcuoglu-florya-giris-denize-bakis.jpg',
  '/images/kolcuoglu-florya-giris-lobisi.jpg',
  '/images/kolcuoglu-florya-giris-lobisi-asansor-merdiven.jpg',
  '/images/kolcuoglu-florya-1-kat-asansor-holu-deniz.jpg',
  '/images/kolcuoglu-florya-1-kat-salon.jpg',
  '/images/kolcuoglu-florya-1-kat-dag-duvari-lambalar.jpg',
  '/images/kolcuoglu-florya-1-kat-salon-deniz-manzarasi.jpg',
  '/images/kolcuoglu-florya-1-kat-salon-duvar-sanati.jpg',
  '/images/kolcuoglu-florya-1-kat-lavabo.jpg',
  '/images/kolcuoglu-florya-2-kat-asansor-holu-deniz.jpg',
  '/images/kolcuoglu-florya-2-kat-salon.jpg',
  '/images/kolcuoglu-florya-2-kat-teras-salon.jpg',
  '/images/kolcuoglu-florya-2-kat-teras-deniz-manzarasi.jpg',
  '/images/kolcuoglu-florya-dis-cephe-aksam.jpg',
] as const

const PRODUCT_IMAGES = [
  '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
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

const HISTORY_IMAGES = ['/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg'] as const

export default function GalleryPage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang)
  const t = dict.gallery
  const toImages = (list: readonly (keyof typeof dict.imageAlts)[]) =>
    list.map((src) => ({ src: src as string, alt: dict.imageAlts[src] }))
  const groups = [
    { id: 'restaurant', title: t.groupRestaurant, images: toImages(RESTAURANT_IMAGES) },
    { id: 'products', title: t.groupProducts, images: toImages(PRODUCT_IMAGES) },
    { id: 'history', title: t.groupHistory, images: toImages(HISTORY_IMAGES) },
  ]
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
      <GalleryClient groups={groups} t={t} />
    </div>
  )
}
