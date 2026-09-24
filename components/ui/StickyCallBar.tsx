'use client'
// Mobilde ekranın altında sabit duran "Ara" + "WhatsApp" çubuğu.
// Menüye bakıp çıkan ziyaretçi için her sayfada tek dokunuşla rezervasyon.
// tel:/wa.me linkleri ConversionTracker tarafından otomatik sayılır — ek kod gerekmez.
// Konum: components/ui/StickyCallBar.tsx

import { usePathname } from 'next/navigation'
import { Phone, MessageCircle } from 'lucide-react'

const PHONE_TEL = 'tel:+905331315401'
const WHATSAPP = 'https://wa.me/905331315401?text=Merhaba%2C%20rezervasyon%20yapt%C4%B1rmak%20istiyorum.'

export default function StickyCallBar() {
  const pathname = usePathname()
  // Rezervasyon formu sayfasında çubuğu gösterme (form kendi CTA'sına sahip)
  if (pathname?.startsWith('/rezervasyon')) return null

  return (
    <>
      {/* Çubuk footer'ın son satırlarını örtmesin diye sayfa sonunda eşit boşluk */}
      <div className="h-16 md:hidden" aria-hidden />
      {/* z-30: menü detayı / galeri (z-50) ve mobil menü (z-40) açılınca çubuğun üstüne çıkar */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px bg-neutral-200 border-t border-neutral-200"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Hızlı iletişim"
      >
        <a
          href={PHONE_TEL}
          className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-neutral-900 active:bg-neutral-100"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Rezervasyon İçin Ara
        </a>
        <a
          href={WHATSAPP}
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
