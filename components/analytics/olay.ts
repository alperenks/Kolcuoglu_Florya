// Çerezsiz, kimliksiz site ölçümü: tarayıcıdan /api/olay adresine olay gönderir.
// Konum: components/analytics/olay.ts
//
// Olaylar (d = ayrıntı):
//   sayfa   sayfa görüntüleme      ilk sayfada { utm_*, reklam, gelis, ekran, dil }
//   cikis   sayfadan ayrılma       { sure (sn), kaydirma (%), ilk sayfada ttfb, fcp, lcp, yukleme (ms) }
//   tik     dış bağlantıya dokunma { tur: tel | whatsapp | harita | instagram | facebook | eposta | dis, yer }
//   form    rezervasyon formu      { adim } ya da { sonuc: gonderildi | hata, kisi | hata }
//   menu    menü kategorisi/ürünü  { deger }
//   hikaye  hikâye                 { deger, sure }
//   galeri  galeri                 { deger }
//   dil     dil değişimi           { deger }
//   tema    tema değişimi          { deger }
//   bant    çerez bandı            { deger: gosterildi | kabul | ret }
//
// Çerez ve localStorage yazılmaz. "a" kodu yalnız bu sayfa yüklemesinin belleğinde yaşar, sayfa
// yenilenince değişir. Ad, telefon, e-posta, form içeriği ve gclid/fbclid değerleri GÖNDERİLMEZ
// (yalnız reklamdan gelindiği bilgisi gider). Sayım kimliği sunucuda üretilir: app/api/olay/route.ts

import { CONSENT_STORAGE_KEY } from './GoogleTag'

/**
 * "Reddet" diyen ziyaretçiler de sayılsın mı? Bu bir hukuk kararıdır (ölçüm çerezsizdir, ama tercih
 * ziyaretçi açısından "ölçülmeyeyim" diye de okunabilir). false yapılırsa "Reddet" diyenlerden hiç
 * olay gönderilmez; banda dokunmayanlar sayılmaya devam eder.
 */
export const REDDEDENLERI_SAY = true

export type OlayTuru = 'sayfa' | 'cikis' | 'tik' | 'form' | 'menu' | 'hikaye' | 'galeri' | 'dil' | 'tema' | 'bant'
export type OlayVerisi = Record<string, string | number>

const ADRES = '/api/olay'
const oturum = Math.random().toString(36).slice(2, 10)

let hikaye: { id: string; baslangic: number } | null = null

export function hikayeAcildi(id: string) {
  hikaye = { id, baslangic: Date.now() }
}

export function hikayeKapandi() {
  if (!hikaye) return
  olay('hikaye', null, { deger: hikaye.id, sure: Math.round((Date.now() - hikaye.baslangic) / 1000) })
  hikaye = null
}

/** Hiçbir durumda siteyi bozmaz: ölçüm gitmezse sessizce vazgeçer. */
export function olay(tur: OlayTuru, yol: string | null, veri: OlayVerisi = {}) {
  if (typeof window === 'undefined') return
  try {
    if (!REDDEDENLERI_SAY && window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'denied') return
    const govde = JSON.stringify({ a: oturum, o: tur, s: yol ?? window.location.pathname, d: veri })
    if (navigator.sendBeacon?.(ADRES, govde)) return
    fetch(ADRES, { method: 'POST', body: govde, keepalive: true }).catch(() => {})
  } catch {
    /* yoksay */
  }
}
