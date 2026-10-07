'use client'
// Sitedeki telefon ve WhatsApp bağlantılarına dokunmayı Google Ads dönüşümü olarak gönderir;
// aynı dokunuş GA4'e phone_click / whatsapp_click olarak (bağlantının konumuyla) gider.
// Konum: components/analytics/ConversionTracker.tsx
//
// Tek bir global dinleyici: Navbar'daki, hero'daki, footer'daki ve ileride eklenecek her
// <a href="tel:..."> / <a href="https://wa.me/..."> otomatik kapsanır; düğmelere tek tek kod gerekmez.
//
// Dönüşüm etiketleri (Google Ads → Hedefler → Dönüşümler, 19 Eyl 2026):
//   Site - Telefon tıklaması (tel:)   → AW-18226411285/2VnMCP7zuv0cEJXug_ND
//   Site - WhatsApp tıklaması (wa.me) → AW-18226411285/Ma8LCIH0uv0cEJXug_ND

import { useEffect } from 'react'
import { ga4Event, linkLocation } from './ga4'

const SEND_TO = {
  tel: 'AW-18226411285/2VnMCP7zuv0cEJXug_ND',
  whatsapp: 'AW-18226411285/Ma8LCIH0uv0cEJXug_ND',
} as const

type ConversionKey = keyof typeof SEND_TO

function classify(href: string): ConversionKey | null {
  const h = href.trim().toLowerCase()
  if (h.startsWith('tel:')) return 'tel'
  if (h.includes('wa.me/') || h.includes('api.whatsapp.com') || h.startsWith('whatsapp:')) return 'whatsapp'
  return null
}

/** Başka bir yerden (ör. rezervasyon formu başarıyla gönderildiğinde) elle tetiklemek için. */
export function trackConversion(key: ConversionKey) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'conversion', { send_to: SEND_TO[key], transport_type: 'beacon' })
}

export default function ConversionTracker() {
  useEffect(() => {
    let lastFired = 0
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      const key = classify(anchor.getAttribute('href') || '')
      if (!key) return
      // Aynı dokunuşun iç içe elemanlardan iki kez gelmesini engelle
      const now = Date.now()
      if (now - lastFired < 800) return
      lastFired = now
      trackConversion(key)
      ga4Event(key === 'tel' ? 'phone_click' : 'whatsapp_click', { link_location: linkLocation(anchor) })
    }
    // capture: true → tel: linki tarayıcıyı arama ekranına götürmeden önce yakalar
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
