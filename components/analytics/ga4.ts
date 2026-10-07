// Google Analytics 4 olayları için tek giriş noktası.
// Konum: components/analytics/ga4.ts
//
// Olaylar (GA4 → Yönetici → Etkinlikler; "anahtar etkinlik" olarak işaretlenenler *):
//   phone_click *      tel: bağlantısına dokunma            { link_location }
//   whatsapp_click *   wa.me bağlantısına dokunma           { link_location }
//   reservation_step   rezervasyon formunda adım tamamlandı { step: 1 }
//   generate_lead *    rezervasyon talebi sunucuya ulaştı   { form_name, party_size }
//   reservation_error  talep gönderilemedi                  { form_name, error_type }
// link_location = bağlantıdaki data-konum (ust_menu, mobil_menu, hero, alt_cubuk, footer, sss,
// iletisim, sirket_yemekleri); yoksa footer/sayfa. Ad, telefon, e-posta gibi form içeriği GA4'e GÖNDERİLMEZ.

import { GA4_ID } from './GoogleTag'

export function ga4Event(name: string, params: Record<string, string | number> = {}) {
  if (!GA4_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, { ...params, send_to: GA4_ID, transport_type: 'beacon' })
}

export function linkLocation(anchor: Element): string {
  const k = anchor.closest('[data-konum]')?.getAttribute('data-konum')
  if (k) return k
  return anchor.closest('footer') ? 'footer' : 'sayfa'
}
