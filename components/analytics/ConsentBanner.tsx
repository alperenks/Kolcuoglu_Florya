'use client'
// Çerez bildirimi (KVKK). Kullanıcı seçim yapınca Google etiketine izin güncellemesi gönderir
// ve seçimi localStorage'da saklar; bir daha göstermez.
// Konum: components/analytics/ConsentBanner.tsx

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { CONSENT_STORAGE_KEY } from './GoogleTag'
import { ga4Event } from './ga4'

type Choice = 'granted' | 'denied'

const STORAGE_KEY = CONSENT_STORAGE_KEY // 'granted' | 'denied'
const CHANGE_EVENT = 'kf-cookie-consent-change'

// localStorage kapalıysa (gizli sekme vb.) seçim bu oturum boyunca bellekte tutulur
let memoryChoice: Choice | null = null

function readChoice(): Choice | 'unset' {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'granted' || saved === 'denied') return saved
  } catch {
    /* localStorage erişilemiyor */
  }
  return memoryChoice ?? 'unset'
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

/** Onay geri alınınca daha önce yazılmış Google Analytics / Ads çerezlerini siler. */
function clearGoogleCookies() {
  const host = window.location.hostname
  const domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')]
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim()
    if (!/^(_ga|_gid|_gat|_gcl)/.test(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? '; domain=' + d : ''}`
    }
  }
}

function applyConsent(value: Choice) {
  if (typeof window === 'undefined') return
  if (value === 'denied') clearGoogleCookies()
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

export default function ConsentBanner() {
  // Sunucuda 'pending' → bildirim HTML'e basılmaz, yalnızca tarayıcıda karar verilir
  const choice = useSyncExternalStore(subscribe, readChoice, () => 'pending' as const)

  useEffect(() => {
    if (choice === 'granted' || choice === 'denied') applyConsent(choice)
  }, [choice])

  const choose = (value: Choice) => {
    memoryChoice = value
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* yoksay */
    }
    applyConsent(value)
    // Bu sayfanın görüntülemesi onaydan önce çerezsiz gitti (GA4 raporlamaz) → onayla birlikte yeniden gönder.
    if (value === 'granted') ga4Event('page_view')
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }

  if (choice !== 'unset') return null

  // Sitenin dili: tema değişkenleri (açık/koyu tema kendiliğinden), altın ince çizgi, büyük harf etiket,
  // 2 px köşeli düğmeler. "Reddet" ve "Kabul et" aynı boyutta (KVKK Çerez Rehberi: eşit kolaylık).
  const dugme = 'w-full px-4 py-3 text-xs font-semibold uppercase cursor-pointer transition-[filter,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="cerez-bandi-baslik"
      aria-describedby="cerez-bandi-metin"
      className="cerez-bandi fixed inset-x-0 bottom-0 z-[60] md:px-6 md:pb-4"
    >
      {/* Telefonda kenardan kenara ve en altta (alttaki Ara/WhatsApp çubuğunu tamamen örter), bilgisayarda yüzen kart */}
      <div
        className="relative mx-auto max-w-[720px] overflow-hidden border-t md:border md:rounded-[2px]"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border-strong)',
          boxShadow: '0 -6px 30px rgba(0, 0, 0, 0.12), 0 18px 50px rgba(0, 0, 0, 0.18)',
        }}
      >
        <div className="gold-line absolute inset-x-0 top-0" aria-hidden />
        <div className="flex flex-col gap-4 px-5 pt-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] md:flex-row md:items-center md:gap-8 md:p-6">
          <div className="flex-1">
            <p id="cerez-bandi-baslik" className="section-label mb-2">
              Çerez Tercihi
            </p>
            <p
              id="cerez-bandi-metin"
              className="text-[0.85rem] leading-relaxed"
              style={{ color: 'var(--color-text-desc)', fontFamily: 'var(--font-sans)' }}
            >
              Site kullanımını, rezervasyon aramalarını ve reklam performansını ölçmek için çerez
              kullanıyoruz. Kabul etmezseniz site aynı şekilde çalışır; yalnızca ölçüm çerezleri yazılmaz.{' '}
              <Link
                href="/gizlilik"
                className="cerez-bandi-link underline underline-offset-2 whitespace-nowrap"
              >
                Gizlilik ve KVKK
              </Link>
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 md:w-[260px]">
            <button
              type="button"
              onClick={() => choose('denied')}
              className={`${dugme} hover:bg-[var(--color-card-inner-bg)]`}
              style={{
                background: 'transparent',
                color: 'var(--color-cream)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '2px',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-sans)',
                outlineColor: 'var(--color-gold)',
              }}
            >
              Reddet
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className={`${dugme} hover:brightness-110`}
              style={{
                background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                color: 'white',
                border: '1px solid transparent',
                borderRadius: '2px',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-sans)',
                outlineColor: 'var(--color-gold)',
              }}
            >
              Kabul et
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
