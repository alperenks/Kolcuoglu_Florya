'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Star, Clock, MapPin, Phone } from 'lucide-react'
import { featuredItems } from '@/data/menu'

// ─── Fade-in wrapper ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12"
      style={{ background: 'var(--color-antracite)' }}
    >
      {/* Background gradient fire effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(196,75,59,0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, var(--radial-bg-center) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-0 mb-2"
        >
          <span
            className="inline-block px-4 py-1.5 text-xs tracking-widest uppercase border"
            style={{
              color: 'var(--color-gold)',
              borderColor: 'rgba(163,33,36,0.3)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.3em',
            }}
          >
            Kuruluş 1910 · Adana
          </span>
        </motion.div>

        <motion.h1
          className="font-serif mb-6 leading-none"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            color: 'var(--color-cream)',
            fontWeight: 700,
            fontVariantNumeric: 'lining-nums',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          116 Yıllık Gelenek,<br />
          <span className="text-gradient italic">Herkes için.</span>
        </motion.h1>

        <motion.p
          className="mb-10 text-lg leading-relaxed mx-auto"
          style={{ color: 'var(--color-text-desc)', fontFamily: 'var(--font-sans)', maxWidth: '672px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Adana’nın asırlık ateşi, Florya sahilinde yanıyor. Denize sıfır masalarımızda, meşhur metrelik kebabımızla eşsiz bir ziyafete davetlisiniz.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Row 1: Menüyü Keşfet & Yol Tarifi Al */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 text-xs tracking-widest uppercase font-semibold min-w-[180px] cursor-pointer"
                style={{
                  background: 'transparent',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.15em',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '2px',
                }}
              >
                Menüyü Keşfet
              </motion.button>
            </Link>
            <a
              href="https://maps.app.goo.gl/2vAwEAAYAtk6AncA7"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-8 py-4 text-xs tracking-widest uppercase font-semibold min-w-[180px]"
                style={{
                  background: 'transparent',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.15em',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '2px',
                }}
              >
                Yol Tarifi Al
              </motion.button>
            </a>
          </div>

          {/* Row 2: Rezervasyon Yap (Centered Below) */}
          <motion.a
            href="tel:+905331315401"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(163,33,36,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 min-w-[180px] text-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
              color: 'white',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.15em',
              borderRadius: '2px',
              boxShadow: '0 4px 20px rgba(163, 33, 36, 0.35)',
            }}
          >
            <Phone size={14} /> Rezervasyon Yap
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt- pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { value: '116', label: 'Yıllık Gelenek' },
            { value: '150+', label: 'Lezzet Çeşidi' },
            { value: '1910', label: 'Kuruluş Yılı' },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <p
                className="font-serif text-3xl mb-1"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: 'var(--color-gold)' }}
        onClick={() => {
          document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="Hakkımızda bölümüne in"
      >
        <ArrowDown size={20} />
      </motion.div>


    </section>
  )
}

// ─── About Section ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about-section" className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--color-charcoal)' }}>
      {/* Background gradient fire effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 10% 20%, rgba(184,115,51,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(196,75,59,0.12) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        {/* Text */}
        <div>
          <FadeIn>
            <p className="section-label mb-6">Hikayemiz</p>
            <h2
              className="font-serif mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--color-cream)',
              }}
            >
              Bir Aile, Bir Ateş,<br />
              <span className="text-gradient italic">116 Yıllık Aşk</span>
            </h2>
            <div className="gold-line mb-8" style={{ width: '80px' }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-desc)' }}>
              Kolcuoğlu ismi, 1910 yılından bu yana değişmeyen kalitenin ve nesilden nesile aktarılan kebap ustalığının simgesidir. 5. nesil Hasan Kolcuoğlu’nun 1974’te yarattığı efsanevi "Metrelik Kebap", bugün 6. ve 7. neslin omuzlarında geleceğe taşınıyor.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-desc)' }}>
              Tarkan ve Hasan Kolcuoğlu'nun titizlikle sürdürdüğü bu asırlık aile geleneği, Florya sahilindeki görkemli masalarda, misafirlerine yalnızca bir yemek değil, denize nazır kusursuz bir gastronomi deneyimi vadediyor.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            {[
              { icon: Star, text: 'Metrelik Kebabın Mucidi' },
              { icon: Clock, text: '7 Nesillik Aile Geleneği' },
              { icon: MapPin, text: 'Florya, İstanbul Denize Sıfır Konum' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gold)' }}>
                <Icon size={14} className="flex-shrink-0" />
                <span style={{ color: 'var(--color-muted)' }}>{text}</span>
              </div>
            ))}
          </div>
          </FadeIn>
        </div>

        {/* Visual */}
        <FadeIn delay={0.3}>
          <div className="relative">
            <div
              className="aspect-[4/5] rounded-sm overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(196,75,59,0.15), rgba(184,115,51,0.1))' }}
            >
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{ background: 'var(--color-surface)' }}
              >
                <Image 
                  src="/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg" 
                  alt="Ocakbaşı" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="text-center relative z-10 mt-auto pb-12">
                  <p
                    className="font-serif text-2xl"
                    style={{ color: 'var(--color-white)', fontFamily: 'var(--font-serif)' }}
                  >
                    Hasan Kolcuoğlu
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>Metrelik Kebabın Üstadı</p>
                </div>
                {/* Decorative corner */}
                <div
                  className="absolute top-4 left-4 w-12 h-12 border-t border-l"
                  style={{ borderColor: 'var(--color-gold)', opacity: 0.4 }}
                />
                <div
                  className="absolute bottom-4 right-4 w-12 h-12 border-b border-r"
                  style={{ borderColor: 'var(--color-gold)', opacity: 0.4 }}
                />
              </div>
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -left-6 p-5 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                boxShadow: '0 10px 40px rgba(196,75,59,0.4)',
              }}
            >
              <p className="font-serif text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>1910</p>
              <p className="text-xs text-white opacity-80 mt-0.5">Kuruluş Yılı</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Featured Menu Section ────────────────────────────────────────────────────
function FeaturedMenuSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Background gradient fire effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 5% 50%, rgba(196,75,59,0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 95% 50%, rgba(184,115,51,0.14) 0%, transparent 45%)
          `,
        }}
      />

      <div className="relative z-10" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        <FadeIn className="text-center mb-16">
          <p className="section-label mb-4">Öne Çıkanlar</p>
          <h2
            className="font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            İmza Lezzetimiz
          </h2>
          <div className="gold-line mt-6 mx-auto" style={{ width: '60px' }} />
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <motion.div
              className="card-glow group rounded-sm overflow-hidden cursor-pointer"
              style={{ background: 'var(--color-charcoal)', border: '1px solid var(--color-border)' }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <Link href="/menu">
                <div
                  className="relative aspect-[16/9] w-full flex items-center justify-center overflow-hidden"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <Image 
                    src="/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg" 
                    alt="Kolcuoğlu Özel Menü" 
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Floating Badge */}
                 
                </div>

                {/* Content Area - Outside the image to prevent squeezing */}
                <div 
                  className="p-6 md:p-8 text-center border-t"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                  }}
                >
                  <h3
                    className="font-serif leading-none mb-3 flex items-center justify-center flex-wrap"
                    style={{
                      color: 'var(--color-cream)',
                    }}
                  >
                    <span
                      className="font-brand leading-none brand-logo-neon"
                      style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                        letterSpacing: 'normal',
                        textTransform: 'none',
                        marginRight: '0.25em'
                      }}
                    >
                      Kolcuoglu
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
                        fontFamily: 'var(--font-serif)',
                      }}
                    >
                      Özel Menü
                    </span>
                  </h3>
                  <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
                    6 Çeşit Meze, Özel Salatalar, Pastırmalı Humus, Fındık Lahmacun ve Metrelik Kebap eşliğinde eşsiz bir gastronomi şöleni.
                  </p>
                </div>
              </Link>
            </motion.div>
          </FadeIn>
        </div>

        <FadeIn className="text-center mt-12" delay={0.3}>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 text-xs tracking-widest uppercase font-semibold"
              style={{
                background: 'transparent',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.15em',
                border: '1px solid rgba(163,33,36,0.4)',
                borderRadius: '2px',
              }}
            >
              Tüm Menüyü Gör
            </motion.button>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Atmosphere Section ───────────────────────────────────────────────────────
function AtmosphereSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const galleryImages = [
    '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
    '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg',
    '/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg',
    '/images/kolcuoglu-florya-tatli-ikrami.jpg',
  ]

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--color-charcoal)' }}>
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(196,75,59,0.3) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative" style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        <FadeIn className="text-center mb-16">
          <p className="section-label mb-4">Mekan & Atmosfer</p>
          <h2
            className="font-serif"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-cream)',
            }}
          >
            Her Köşede{' '}
            <span className="text-gradient italic">Ayrı Bir Deneyim</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <FadeIn key={src} delay={i * 0.1}>
              <motion.div
                className="aspect-[3/4] rounded-sm flex flex-col justify-end relative overflow-hidden group cursor-pointer"
                style={{
                  border: '1px solid var(--color-border)',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0">
                  <Image 
                    src={src}
                    alt={`Galeri Görseli ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn className="text-center mt-16" delay={0.4}>
          <Link href="/galeri">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 40px rgba(196,75,59,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-5 text-sm tracking-widest uppercase font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                color: 'white',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.15em',
                borderRadius: '2px',
                boxShadow: '0 4px 20px rgba(196, 75, 59, 0.3)',
              }}
            >
              Galeriyi İncele
            </motion.button>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <AtmosphereSection />
    </>
  )
}
