'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from '@/data/menu'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function MenuPage() {
  // All categories are closed by default
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'mezeler': false,
    'salatalar': false,
    'ara-sicaklar': false,
    'kebaplar-izgaralar': false,
    'lahmacun-pide': false,
    'tatlilar': false,
    'mesrubatlar': false,
    'alkollu-icecekler': false,
  })

  // State to track expanded sub-accordions for individual drink items with variants
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleCategory = (slug: string) => {
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }))
  }

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  // Get items for a specific category
  const getCategoryItems = (slug: string) => {
    return menuItems.filter(item => item.categorySlug === slug)
  }

  // Helper to render accordion category block
  const renderAccordion = (slug: string, name: string) => {
    const items = getCategoryItems(slug)
    const isOpen = expanded[slug]

    return (
      <div 
        className="rounded-sm overflow-hidden border border-[var(--color-border)] transition-all duration-300"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Accordion Header Button */}
        <button
          onClick={() => toggleCategory(slug)}
          className="w-full py-4 px-6 flex items-center justify-between transition-colors duration-300 hover:bg-[var(--color-card-inner-bg)] text-left"
          style={{
            background: 'var(--color-card-inner-bg)',
            borderBottom: isOpen ? '1px solid var(--color-border)' : '1px solid transparent'
          }}
        >
          <div className="flex items-center gap-3">
            <span className="w-1 h-4 bg-gradient-to-b from-amber-500 to-amber-700 rounded-sm" />
            <h2
              className="text-sm tracking-widest uppercase font-semibold text-cream"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}
            >
              {name}
            </h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: 'var(--color-gold)' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        {/* Accordion Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-6 space-y-4">
                {items.map((item) => {
                  const hasVariants = item.variants && item.variants.length > 0
                  const isItemOpen = expandedItems[item.id]

                  return (
                    <div key={item.id} className="group">
                      {hasVariants && slug === 'alkollu-icecekler' ? (
                        /* Sub-accordion for alcoholic items with variants */
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left focus:outline-none block"
                        >
                          <div className="flex items-end justify-between py-1 text-sm cursor-pointer hover:text-amber-400 transition-colors duration-200">
                            <span className="text-[var(--color-cream)] font-medium flex items-center gap-1.5">
                              {item.name}
                              <motion.span
                                animate={{ rotate: isItemOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block text-gold/60"
                              >
                                <ChevronDown size={12} />
                              </motion.span>
                            </span>
                            <span className="flex-1 border-b border-dotted border-[var(--color-border-strong)] mx-3 mb-1" />
                            <span className="text-gold font-mono font-medium">
                              ₺{item.price}+
                            </span>
                          </div>
                        </button>
                      ) : (
                        /* Standard menu item layout */
                        <div className="flex items-end justify-between py-1 text-sm">
                          <span 
                            className="text-[var(--color-cream)] font-medium group-hover:text-amber-400 transition-colors duration-200"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {item.name}
                          </span>
                          <span className="flex-1 border-b border-dotted border-[var(--color-border-strong)] mx-3 mb-1" />
                          {item.weight && (
                            <span className="text-xs text-[var(--color-muted)] mr-4 font-mono whitespace-nowrap">{item.weight}</span>
                          )}
                          <span className="text-gold font-mono font-medium whitespace-nowrap">
                            ₺{item.price}{hasVariants ? '+' : ''}
                          </span>
                        </div>
                      )}

                      {/* Description if any */}
                      {item.description && item.description.length > 0 && !item.description.includes('taze günlük ürünleriyle') && (
                        <p className="text-xs text-[var(--color-text-desc)] mt-0.5 pl-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Variants Display */}
                      {hasVariants && (
                        slug !== 'alkollu-icecekler' ? (
                          /* Non-alcoholic variants are always expanded */
                          <div className="pl-4 mt-2 space-y-1.5 border-l border-[var(--color-border)]">
                            {item.variants?.map((v, idx) => (
                              <div key={idx} className="flex items-end justify-between py-0.5 text-xs">
                                <span className="text-[var(--color-muted)]">{v.name}</span>
                                <span className="flex-1 border-b border-dotted border-[var(--color-border)] mx-2 mb-1" />
                                <span className="text-gold font-mono">₺{v.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Alcoholic variants are collapsible */
                          <AnimatePresence initial={false}>
                            {isItemOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pr-1 py-1.5 space-y-1.5 border-l border-[var(--color-gold)]/20 bg-[var(--color-card-inner-bg)] my-1 rounded-r-sm">
                                  {item.variants?.map((v, idx) => (
                                    <div key={idx} className="flex items-end justify-between py-0.5 text-xs">
                                      <span className="text-[var(--color-muted)]">{v.name}</span>
                                      <span className="flex-1 border-b border-dotted border-[var(--color-border)] mx-2 mb-1" />
                                      <span className="text-[var(--color-gold)] font-mono">₺{v.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )
                      )}
                    </div>
                  )
                })}
                
                {items.length === 0 && (
                  <p className="text-xs text-[var(--color-muted)] opacity-60 text-center py-4 italic">
                    Bu kategoriye ait ürün bulunmamaktadır.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Helper to render central Special Menu card
  const renderSpecialMenuCard = () => (
    <div 
      className="rounded-sm overflow-hidden relative p-8 shadow-2xl"
      style={{ 
        background: 'var(--color-surface)',
        border: '1px solid rgba(163, 33, 36, 0.25)',
      }}
    >
      {/* Inner ornamental thin line */}
      <div 
        className="absolute inset-2 pointer-events-none rounded-sm" 
        style={{ border: '1px solid rgba(196, 75, 59, 0.25)' }}
      />

      {/* Special Menu Image */}
      <div 
        className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-6"
        style={{ border: '1px solid rgba(163, 33, 36, 0.15)' }}
      >
        <Image 
          src="/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg" 
          alt="Kolcuoğlu Özel Menü" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Title with matching header logo typography */}
      <div className="text-center mb-8 relative z-10">
        <h3
          className="font-serif leading-none mb-3 flex items-center justify-center flex-wrap"
          style={{ color: 'var(--color-cream)' }}
        >
          <span
            className="font-brand leading-none brand-logo-neon"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              letterSpacing: 'normal',
              textTransform: 'none',
              marginRight: '0.25em'
            }}
          >
            Kolcuoglu
          </span>
          <span
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Özel Menü
          </span>
        </h3>
        <div className="gold-line mx-auto" style={{ width: '40px' }} />
      </div>

      {/* Special Menu Contents */}
      <div className="space-y-6 text-center text-sm relative z-10 max-w-md mx-auto">
        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Mezeler
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">6 Çeşit Meze</p>
        </div>

        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Salatalar
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">Mevsim Salata · Adana Ezme · Çiğ Köfte</p>
        </div>

        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Ara Sıcaklar
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">Pastırmalı Humus · Mantarlı Tavuk Sote · Fındık Lahmacun</p>
        </div>

        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Ana Yemek
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">Metrelik Kebap</p>
          <p className="text-xs text-[var(--color-text-desc)] mt-0.5 leading-relaxed">
            (Adana, Sarma Beyti, Kanat, Tavuk Şiş, Külbastı)
          </p>
        </div>

        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Meyve ve Tatlılar
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">Serpme Meyve (5 çeşit) · Tatlı (3 çeşit)</p>
        </div>

        <div>
          <p 
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: 'var(--color-gold)', letterSpacing: '0.15em' }}
          >
            Meşrubatlar
          </p>
          <p className="text-[var(--color-cream)] opacity-80 font-medium">Şalgam · Ayran · Fanta · Kola · Meyve Suyu</p>
          <p className="text-xs text-[var(--color-text-desc)] mt-0.5 leading-relaxed">
            + Çay &amp; Türk Kahvesi İkramı
          </p>
        </div>

        <div className="gold-line my-6 mx-auto" style={{ width: '80px' }} />

        <div className="py-3 px-4 rounded-sm bg-[var(--color-card-inner-bg)] border border-[var(--color-border-strong)] mt-6">
          <span className="text-xs uppercase tracking-widest text-[var(--color-muted)] block mb-1">Kişi Başı Fiyat</span>
          <span 
            className="text-2xl font-serif font-bold"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
          >
            ₺1.800
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--color-antracite)', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: 'var(--color-antracite)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(196,75,59,0.25) 0%, transparent 65%)',
          }}
        />
        <div className="relative z-10">
          <p className="section-label mb-4">Geleneksel Ustaların Eliyle</p>
          <h1
            className="font-serif mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--color-cream)',
            }}
          >
            Lezzet Menümüz
          </h1>
          <p className="text-base leading-relaxed text-[var(--color-text-desc)] max-w-xl mx-auto">
            116 yılı aşkın tecrübe ve kömür ateşi ustalığıyla harmanlanan, özenle seçilmiş ürünlerimiz.
          </p>
          <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
        </div>
      </section>

      {/* Main Menu Layout Container */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto pb-24">
        
        {/* DESKTOP LAYOUT (visible on desktop) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: Mezeler, Salatalar, Ara Sıcaklar */}
          <div className="space-y-6">
            {renderAccordion('mezeler', 'MEZELER')}
            {renderAccordion('salatalar', 'SALATALAR')}
            {renderAccordion('ara-sicaklar', 'ARA SICAKLAR')}
          </div>

          {/* CENTER COLUMN: Kolcuoğlu Özel Menü Showcase & Meşrubatlar/Alkollüler */}
          <div className="space-y-8">
            {renderSpecialMenuCard()}
            <div className="space-y-6">
              {renderAccordion('mesrubatlar', 'MEŞRUBATLAR')}
              {renderAccordion('alkollu-icecekler', 'ALKOLLÜ İÇECEKLER')}
            </div>
          </div>

          {/* RIGHT COLUMN: Kebaplar ve Izgaralar, Lahmacun ve Pide, Tatlılar */}
          <div className="space-y-6">
            {renderAccordion('kebaplar-izgaralar', 'KEBAPLAR VE IZGARALAR')}
            {renderAccordion('lahmacun-pide', 'LAHMACUN VE PİDE')}
            {renderAccordion('tatlilar', 'TATLILAR')}
          </div>

        </div>

        {/* MOBILE LAYOUT (visible on mobile / tablet) */}
        <div className="flex flex-col gap-6 lg:hidden">
          
          {/* 1. Kolcuoğlu Özel Menü (en üstte) */}
          {renderSpecialMenuCard()}
          
          {/* 2. Mezeler */}
          {renderAccordion('mezeler', 'MEZELER')}
          
          {/* 3. Salatalar */}
          {renderAccordion('salatalar', 'SALATALAR')}
          
          {/* 4. Ara Sıcaklar */}
          {renderAccordion('ara-sicaklar', 'ARA SICAKLAR')}
          
          {/* 5. Kebaplar ve Izgaralar */}
          {renderAccordion('kebaplar-izgaralar', 'KEBAPLAR VE IZGARALAR')}
          
          {/* 6. Lahmacun ve Pide */}
          {renderAccordion('lahmacun-pide', 'LAHMACUN VE PİDE')}
          
          {/* 7. Tatlılar */}
          {renderAccordion('tatlilar', 'TATLILAR')}
          
          {/* 8. Meşrubatlar */}
          {renderAccordion('mesrubatlar', 'MEŞRUBATLAR')}
          
          {/* 9. Alkollü İçecekler (en altta) */}
          {renderAccordion('alkollu-icecekler', 'ALKOLLÜ İÇECEKLER')}
          
        </div>

      </section>
    </div>
  )
}
