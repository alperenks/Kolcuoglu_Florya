'use client'
// "Çerez tercihimi değiştir": clears the saved choice and reloads, so the cookie notice
// (components/analytics/ConsentBanner.tsx) asks again. Used on /gizlilik.

import { CONSENT_STORAGE_KEY as STORAGE_KEY } from '@/components/analytics/GoogleTag'

export default function CerezTercihi() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem(STORAGE_KEY)
        } catch {
          /* localStorage erişilemiyor */
        }
        window.location.reload()
      }}
      className="mt-2 px-5 py-2.5 text-xs tracking-widest uppercase font-semibold cursor-pointer"
      style={{
        border: '1px solid var(--color-border-subtle)',
        color: 'var(--color-cream)',
        borderRadius: '2px',
        letterSpacing: '0.15em',
      }}
    >
      Çerez tercihimi değiştir
    </button>
  )
}
