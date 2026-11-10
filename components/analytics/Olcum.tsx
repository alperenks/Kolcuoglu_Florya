'use client'
// Sayfa görüntüleme, sayfada kalma, kaydırma, hız ve dokunma ölçümü (components/analytics/olay.ts).
// Konum: components/analytics/Olcum.tsx
//
// Tek global dinleyici: tel:/WhatsApp/harita gibi her dış bağlantı ve data-olay="..." data-deger="..."
// taşıyan her öğe otomatik kapsanır; bileşenlere ayrı kod gerekmez.

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { linkLocation } from './ga4'
import { olay, type OlayTuru, type OlayVerisi } from './olay'

let ilkSayfa = true

function bagliTuru(href: string): string | null {
  const h = href.trim().toLowerCase()
  if (h.startsWith('tel:')) return 'tel'
  if (h.startsWith('mailto:')) return 'eposta'
  if (h.includes('wa.me/') || h.includes('api.whatsapp.com') || h.startsWith('whatsapp:')) return 'whatsapp'
  if (/maps\.app\.goo\.gl|goo\.gl\/maps|google\.[a-z.]+\/maps|yandex\.[a-z.]+\/maps|maps\.apple/.test(h)) return 'harita'
  if (h.includes('instagram.com')) return 'instagram'
  if (h.includes('facebook.com')) return 'facebook'
  return /^https?:\/\//.test(h) ? 'dis' : null
}

/** Ziyaretin nereden başladığı. Tıklama kimliklerinin değeri değil, yalnız varlığı alınır. */
function gelisBilgisi(): OlayVerisi {
  const v: OlayVerisi = {}
  const q = new URLSearchParams(window.location.search)
  for (const k of ['source', 'medium', 'campaign', 'content', 'term']) {
    const d = q.get(`utm_${k}`)
    if (d) v[`utm_${k}`] = d.slice(0, 80)
  }
  if (q.has('gclid') || q.has('gbraid') || q.has('wbraid')) v.reklam = 'google'
  else if (q.has('fbclid')) v.reklam = 'meta'
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : ''
    if (host && host !== window.location.hostname) v.gelis = host
  } catch {
    /* yoksay */
  }
  v.ekran = `${Math.round(window.screen.width / 10) * 10}x${Math.round(window.screen.height / 10) * 10}`
  v.dil = navigator.language.slice(0, 5)
  return v
}

/** Yalnız ilk sayfa: sunucu yanıtı, ilk içerik, en büyük içerik ve yükleme süresi (ms). */
function hizOlcer() {
  let lcp = 0
  try {
    new PerformanceObserver((liste) => {
      const son = liste.getEntries().at(-1)
      if (son) lcp = son.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  } catch {
    /* tarayıcı desteklemiyor */
  }
  return (): OlayVerisi => {
    const n = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0
    const v: OlayVerisi = {}
    if (n?.responseStart) v.ttfb = Math.round(n.responseStart)
    if (fcp) v.fcp = Math.round(fcp)
    if (lcp) v.lcp = Math.round(lcp)
    if (n?.loadEventEnd) v.yukleme = Math.round(n.loadEventEnd)
    return v
  }
}

export default function Olcum() {
  const yol = usePathname()

  useEffect(() => {
    let sonDokunma = 0
    const onClick = (e: MouseEvent) => {
      const hedef = e.target as Element | null
      const isaretli = hedef?.closest?.('[data-olay]')
      if (isaretli) {
        const tur = isaretli.getAttribute('data-olay') as OlayTuru
        olay(tur, null, { deger: isaretli.getAttribute('data-deger') ?? '' })
      }
      const bag = hedef?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!bag) return
      const tur = bagliTuru(bag.getAttribute('href') || '')
      if (!tur) return
      // Aynı dokunuşun iç içe elemanlardan iki kez gelmesini engelle
      const simdi = Date.now()
      if (simdi - sonDokunma < 800) return
      sonDokunma = simdi
      if (tur === 'dis' && bag.hostname === window.location.hostname) return
      olay('tik', null, { tur, yer: linkLocation(bag), ...(tur === 'dis' ? { hedef: bag.hostname } : {}) })
    }
    // capture: true → tel: bağlantısı tarayıcıyı arama ekranına götürmeden önce yakalar
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  useEffect(() => {
    if (!yol) return
    olay('sayfa', yol, ilkSayfa ? gelisBilgisi() : {})
    const hiz = ilkSayfa ? hizOlcer() : null
    ilkSayfa = false

    const gorunurBaslangic = document.hidden ? 0 : performance.now()
    let derinlik = 0
    let bekliyor = false
    let bitti = false

    const kaydirmaOlc = () => {
      const h = document.documentElement.scrollHeight
      if (h) derinlik = Math.max(derinlik, Math.min(100, Math.round(((window.scrollY + window.innerHeight) / h) * 100)))
    }
    const onScroll = () => {
      if (bekliyor) return
      bekliyor = true
      window.setTimeout(() => {
        bekliyor = false
        kaydirmaOlc()
      }, 300)
    }
    const bitir = () => {
      if (bitti) return
      bitti = true
      kaydirmaOlc()
      const sure = gorunurBaslangic ? Math.round((performance.now() - gorunurBaslangic) / 1000) : 0
      olay('cikis', yol, { sure, kaydirma: derinlik, ...hiz?.() })
    }
    const onVisibility = () => {
      if (document.hidden) bitir()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', bitir)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', bitir)
      bitir()
    }
  }, [yol])

  return null
}
