import type { Metadata } from 'next'
import GalleryClient from '@/components/GalleryClient'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Kolcuoğlu Florya restoranımızdan en özel kareler. Lezzetlerimiz, ambiyansımız ve unutulmaz anlar.',
}

export default function GaleriPage() {
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
          <p className="section-label mb-4">Görsel Şölen</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-cream)',
            }}
          >
            Galeri
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)', maxWidth: '576px', margin: '0 auto', width: '100%' }}>
            Kolcuoğlu Florya'nın eşsiz ambiyansını ve enfes lezzetlerini keşfedin. (Müşteri fotoğrafları buraya eklenecektir)
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Dynamic Grid Layout */}
      <GalleryClient />
    </div>
  )
}
