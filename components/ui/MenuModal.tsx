'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { MenuItem, MenuVariant } from '@/types'

interface MenuModalProps {
  item: MenuItem | null
  onClose: () => void
}

export default function MenuModal({ item, onClose }: MenuModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | null>(null)

  useEffect(() => {
    if (item?.variants && item.variants.length > 0) {
      setSelectedVariant(item.variants[0])
    } else {
      setSelectedVariant(null)
    }

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    if (item) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full sm:max-w-2xl max-h-screen sm:max-h-[90vh] overflow-y-auto"
            style={{
              background: 'var(--color-surface)',
              borderTop: '1px solid rgba(163, 33, 36, 0.3)',
              borderRadius: '8px 8px 0 0',
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header Image */}
            <div className="relative h-52 sm:h-64 bg-gradient-to-br from-neutral-800 to-neutral-900">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(196,75,59,0.2), rgba(184,115,51,0.2))' }}
              >
                <span className="text-6xl">🍖</span>
              </div>
              {item.isSignature && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gold), var(--color-copper))',
                    color: 'var(--color-antracite)',
                    borderRadius: '2px',
                  }}
                >
                  İmza Lezzet
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2
                  className="font-serif text-2xl sm:text-3xl leading-tight"
                  style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}
                >
                  {item.name}
                </h2>
                <span
                  className="font-serif text-2xl flex-shrink-0"
                  style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
                >
                  ₺{selectedVariant ? selectedVariant.price : item.price}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
                {item.description}
              </p>

              {/* Variants Selector */}
              {item.variants && item.variants.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--color-gold)' }}>Boyut / Porsiyon Seçimi</p>
                  <div className="flex flex-wrap gap-2">
                    {item.variants.map((variant) => {
                      const isActive = selectedVariant?.name === variant.name
                      return (
                        <button
                          key={variant.name}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-4 py-2 text-sm rounded-sm transition-all duration-300 ${
                            isActive
                              ? 'text-black font-semibold'
                              : 'text-[var(--color-cream)] hover:bg-[var(--color-card-inner-bg)]/80'
                          }`}
                          style={{
                            background: isActive ? 'var(--color-gold)' : 'transparent',
                            border: `1px solid ${isActive ? 'var(--color-gold)' : 'var(--color-border-strong)'}`
                          }}
                        >
                          {variant.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {item.weight && !item.variants && (
                  <div
                    className="p-3 rounded"
                    style={{ background: 'var(--color-card-inner-bg)', border: '1px solid var(--color-border)' }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold)' }}>Porsiyon</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>{item.weight}</p>
                  </div>
                )}
                {item.preparationTime && (
                  <div
                    className="p-3 rounded"
                    style={{ background: 'var(--color-card-inner-bg)', border: '1px solid var(--color-border)' }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold)' }}>Hazırlık</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>{item.preparationTime}</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-gold)' }}>İçindekiler</p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          background: 'var(--color-card-inner-bg)',
                          color: 'var(--color-muted)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-terracotta)' }}>⚠ Alerjenler</p>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((a) => (
                      <span
                        key={a}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          background: 'rgba(196, 75, 59, 0.1)',
                          color: 'var(--color-terracotta)',
                          border: '1px solid rgba(196, 75, 59, 0.2)',
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
