'use client'

import React from 'react'

interface FloatingImageProps {
  src: string
  alt: string
  className: string
}

export interface FloatingFoodHeroProps {
  label?: string
  title: string
  description: string
  images: FloatingImageProps[]
  className?: string
}

/** Decorative background swirl lines, tinted with the brand crimson. */
const Swirls = () => (
  <>
    <svg
      className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
      style={{ color: 'rgba(163, 33, 36, 0.12)' }}
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4"
      style={{ color: 'rgba(184, 115, 51, 0.12)' }}
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
)

/**
 * Hero section with floating food images (adapted from 21st.dev
 * FloatingFoodHero to match the Kolcuoğlu theme).
 */
export function FloatingFoodHero({
  label,
  title,
  description,
  images,
  className = '',
}: FloatingFoodHeroProps) {
  return (
    <section
      className={`relative w-full min-h-[60vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden py-20 md:py-28 px-6 text-center ${className}`}
      style={{ background: 'var(--color-antracite)' }}
    >
      {/* Existing radial glow, kept from the old menu header */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(196,75,59,0.25) 0%, transparent 65%)',
        }}
      />

      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>

      {/* Floating food images */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {images.map((image, index) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute object-contain animate-float ${image.className}`}
            style={{ animationDelay: `${index * 300}ms` }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-xl mx-auto">
        {label && <p className="section-label mb-4">{label}</p>}
        <h1
          className="font-serif mb-4"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--color-cream)',
          }}
        >
          {title}
        </h1>
        <p className="text-base leading-relaxed text-[var(--color-text-desc)]">
          {description}
        </p>
        <div className="gold-line mt-8 mx-auto" style={{ width: '60px' }} />
      </div>
    </section>
  )
}
