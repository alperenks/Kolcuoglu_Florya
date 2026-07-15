'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// Gerçek restoran görselleri (SEO uyumlu adlandırılmış + betimleyici alt metinler)
const allImages = [
  { src: '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg', alt: 'Kolcuoğlu Florya özel menü – metrelik kebap sunumu' },
  { src: '/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg', alt: 'Metrelik kebabın mucidi Hasan Kolcuoğlu' },
  { src: '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg', alt: 'Kolcuoğlu Florya deniz manzaralı teras' },
  { src: '/images/kolcuoglu-florya-restoran-salonu.jpeg', alt: 'Kolcuoğlu Florya restoran salonu' },
  { src: '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg', alt: 'Kolcuoğlu Florya deniz manzaralı yemek salonu' },
  { src: '/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg', alt: 'Kolcuoğlu Florya iç mekan tasarımı' },
  { src: '/images/kolcuoglu-florya-adana-kebap.jpg', alt: 'Kolcuoğlu Florya Adana kebap' },
  { src: '/images/kolcuoglu-florya-kebap-sofrasi.jpg', alt: 'Kolcuoğlu Florya kebap sofrası ve mezeler' },
  { src: '/images/kolcuoglu-florya-ocakbasi-keyfi.jpg', alt: 'Kolcuoğlu Florya ocakbaşı keyfi' },
  { src: '/images/florya-en-iyi-kebapci.jpg', alt: "Florya'nın en iyi kebapçısı Kolcuoğlu'nda kebap sofrası" },
  { src: '/images/istanbul-metrelik-kebap-kolcuoglu.jpg', alt: "İstanbul'da metrelik kebap – Kolcuoğlu Florya" },
  { src: '/images/kolcuoglu-kebap-florya-istanbul.jpg', alt: 'Kolcuoğlu kebap – Florya, İstanbul' },
  { src: '/images/kolcuoglu-florya-geleneksel-lezzetler.jpg', alt: 'Kolcuoğlu Florya geleneksel Türk lezzetleri' },
  { src: '/images/kolcuoglu-florya-sicak-mezeler.jpg', alt: 'Kolcuoğlu Florya sıcak mezeler' },
  { src: '/images/kolcuoglu-florya-kuzu-sis.jpg', alt: 'Kolcuoğlu Florya kuzu şiş' },
  { src: '/images/kolcuoglu-florya-kunefe-tatlisi.jpg', alt: 'Kolcuoğlu Florya künefe tatlısı' },
  { src: '/images/kolcuoglu-florya-katmer-tatlisi.jpg', alt: 'Kolcuoğlu Florya katmer tatlısı' },
  { src: '/images/kolcuoglu-florya-ayran-salgam.jpg', alt: 'Kolcuoğlu Florya ayran ve şalgam' },
  { src: '/images/kolcuoglu-florya-lahmacun-pide.jpg', alt: 'Kolcuoğlu Florya lahmacun ve pide' },
  { src: '/images/kolcuoglu-florya-vip-salon.jpg', alt: 'Kolcuoğlu Florya VIP salon' },
  { src: '/images/kolcuoglu-florya-ocakbasi-ustasi.jpg', alt: 'Kolcuoğlu Florya ocakbaşı ustası kebap pişirirken' },
  { src: '/images/kolcuoglu-florya-lezzet-duragi.jpg', alt: 'Kolcuoğlu Florya lezzet durağı' },
  { src: '/images/kolcuoglu-florya-ozel-davetler.jpg', alt: 'Kolcuoğlu Florya özel davet ve organizasyonlar' },
  { src: '/images/kolcuoglu-florya-denize-sifir-kebap.jpg', alt: 'Denize sıfır kebap keyfi – Kolcuoğlu Florya' },
  { src: '/images/kolcuoglu-florya-kuzu-pirzola.jpg', alt: 'Kolcuoğlu Florya kuzu pirzola' },
  { src: '/images/kolcuoglu-florya-soguk-mezeler.jpg', alt: 'Kolcuoğlu Florya soğuk mezeler' },
  { src: '/images/kolcuoglu-florya-sofra-duzeni.jpg', alt: 'Kolcuoğlu Florya sofra düzeni' },
]

export default function GalleryClient() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, allImages.length))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const visibleImages = allImages.slice(0, visibleCount)
  const hasMore = visibleCount < allImages.length

  return (
    <>
      <section className="py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <AnimatePresence>
            {visibleImages.map((img, i) => (
              <motion.div
                key={img.src + i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.1 }}
                layout
                onClick={() => setSelectedImage(img.src)}
                className="aspect-square relative overflow-hidden rounded-sm group cursor-pointer"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: 'var(--color-card-inner-bg)',
                border: '1px solid rgba(163,33,36,0.3)',
                color: 'var(--color-gold)'
              }}
              whileHover={{ scale: 1.1, background: 'rgba(163,33,36,0.1)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
              onClick={handleLoadMore}
              aria-label="Daha fazla görsel yükle"
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            style={{ background: 'rgba(10,10,10,0.95)' }}
          >
            {/* Kapat Butonu */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-xs tracking-widest uppercase transition-colors" style={{ color: 'var(--color-muted)' }}>
              Kapat (ESC) ✕
            </div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-[85vh] cursor-default"
            >
              <Image
                src={selectedImage}
                alt={allImages.find((img) => img.src === selectedImage)?.alt ?? 'Kolcuoğlu Florya galeri görseli'}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

