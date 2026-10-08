'use client'
// Mobilde ekranın altında sabit duran "Ara" + "WhatsApp" çubuğu.
// Menüye bakıp çıkan ziyaretçi için her sayfada tek dokunuşla rezervasyon.
// tel:/wa.me linkleri ConversionTracker tarafından otomatik sayılır — ek kod gerekmez.
// Konum: components/ui/StickyCallBar.tsx

import { usePathname } from 'next/navigation'
import { Phone, MessageCircle } from 'lucide-react'
import type { Dictionary } from '@/i18n/dictionaries/tr'

const PHONE_TEL = 'tel:+905331315401'

export default function StickyCallBar({
  t,
  whatsappText,
  reservationPath,
}: {
  t: Dictionary['stickyBar']
  /** WhatsApp'ta hazır gelen mesaj (sayfanın dilinde) */
  whatsappText: string
  reservationPath: string
}) {
  const pathname = usePathname()
  // Rezervasyon formu sayfasında çubuğu gösterme (form kendi CTA'sına sahip)
  if (pathname?.startsWith(reservationPath)) return null
  const whatsapp = `https://wa.me/905331315401?text=${encodeURIComponent(whatsappText)}`

  return (
    <>
      {/* Çubuk footer'ın son satırlarını örtmesin diye sayfa sonunda eşit boşluk */}
      <div className="h-16 md:hidden" aria-hidden />
      {/* z-30: menü detayı / galeri (z-50) ve mobil menü (z-40) açılınca çubuğun üstüne çıkar */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px bg-neutral-200 border-t border-neutral-200"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label={t.label}
      >
        <a
          href={PHONE_TEL}
          data-konum="alt_cubuk"
          className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-neutral-900 active:bg-neutral-100"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {t.call}
        </a>
        <a
          href={whatsapp}
          data-konum="alt_cubuk"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white active:opacity-90"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
      </div>
    </>
  )
}
