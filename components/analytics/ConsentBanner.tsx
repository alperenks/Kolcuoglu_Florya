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

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez bildirimi"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 md:p-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-neutral-900 text-neutral-100 shadow-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <p className="text-sm leading-snug flex-1">
          Site kullanımını, rezervasyon aramalarını ve reklam performansını ölçmek için çerez
          kullanıyoruz. Kabul etmezseniz site aynı şekilde çalışır, yalnızca ölçüm çerezleri yazılmaz.{' '}
          <Link href="/gizlilik" className="underline underline-offset-2 hover:text-white">
            Ayrıntılar
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="px-4 py-2 rounded-xl text-sm border border-neutral-500 hover:bg-neutral-800"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-200"
          >
            Kabul et
          </button>
        </div>
      </div>
    </div>
  )
}
