'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Dictionary } from '@/i18n/dictionaries/tr'


type Img = { src: string; alt: string }
type Group = { id: string; title: string; images: Img[] }

// Three group cards (one cover photo each); "show more" opens the group's photos below the cards
export default function GalleryClient({ groups, t }: { groups: Group[]; t: Dictionary['gallery'] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<Img | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const open = groups.find((g) => g.id === openId) ?? null

  return (
    <>
      <section className="py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          {groups.map((g) => {
            const hasMore = g.images.length > 1
            const isOpen = g.id === openId
            return (
              <div
                key={g.id}
                className="aspect-square relative overflow-hidden rounded-sm group cursor-pointer"
                style={{ border: '1px solid var(--color-border)' }}
                onClick={() => setSelectedImage(g.images[0])}
                data-olay="galeri"
                data-deger={g.id}
              >
                <Image
                  src={g.images[0].src}
                  alt={g.images[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-center gap-3 text-center"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent)' }}
                >
                  <h2 className="font-serif text-2xl" style={{ fontFamily: 'var(--font-serif)', color: '#fff' }}>{g.title}</h2>
                  {hasMore && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenId(isOpen ? null : g.id)
                      }}
                      data-olay="galeri"
                      data-deger={`${g.id}:${isOpen ? 'kapat' : 'daha-fazla'}`}
                      className="px-5 py-2 text-xs tracking-widest uppercase font-semibold"
                      style={{ background: 'transparent', color: '#fff', border: '2px solid var(--color-terracotta)', borderRadius: '2px' }}
                    >
                      {isOpen ? t.showLess : t.showMore}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {open && (
          <div className="mt-12" style={{ maxWidth: '1280px', margin: '3rem auto 0', width: '100%' }}>
            <h3 className="font-serif text-2xl text-center mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cream)' }}>
              {open.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {open.images.map((img) => (
                <div
                  key={img.src}
                  onClick={() => setSelectedImage(img)}
                  data-olay="galeri"
                  data-deger={`${open.id}:foto`}
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
                </div>
              ))}
            </div>
          </div>
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
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-xs tracking-widest uppercase transition-colors" style={{ color: 'var(--color-muted)' }}>
              {t.close}
            </div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-[85vh] cursor-default"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || t.fallbackAlt}
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
