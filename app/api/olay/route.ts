// Çerezsiz, kimliksiz site ölçümü: tarayıcıdan gelen olayı doğrular ve Upstash'e yazar.
// Konum: app/api/olay/route.ts (tarayıcı tarafı: components/analytics/olay.ts)
//
// Gerekli ortam değişkenleri (yoksa olaylar sessizce atılır, site etkilenmez):
//   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
//
// Kimlik: IP + tarayıcı bilgisi, o güne özel rastgele bir tuzla özetlenip 12 haneli "z" kodu olur.
// Tuz Upstash'te 26 saat durur ve silinir; IP ve tarayıcı bilgisinin kendisi hiçbir yere yazılmaz.
// Böylece aynı günün ziyaretleri ayırt edilir, ama günler arasında kimse izlenemez.
//
// Kayıt: "olay" akışına (Redis stream) tek alanlı JSON { t, z, a, o, s, d }.
// Okuyanlar: Panel (canlı görünüm) ve restoran sunucusu (kalıcı arşiv).

import { createHash, randomBytes } from 'node:crypto'
import type { NextRequest } from 'next/server'

export const preferredRegion = 'fra1' // Upstash veri tabanı Frankfurt'ta

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const TURLER = new Set(['sayfa', 'cikis', 'tik', 'form', 'menu', 'hikaye', 'galeri', 'dil', 'tema', 'bant'])
// Yalnız bu alanlar yazılır: istemci başka bir şey gönderse bile (ad, telefon vb.) kayda giremez
const ALANLAR = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'reklam', 'gelis', 'ekran', 'dil',
  'sure', 'kaydirma', 'ttfb', 'fcp', 'lcp', 'yukleme', 'tur', 'yer', 'hedef', 'adim', 'sonuc', 'kisi', 'hata', 'deger',
])
const BOT = /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|facebookexternalhit|preview/i
const EN_BUYUK_GOVDE = 2000
const DAKIKADA_EN_FAZLA = 120
const AKIS_SINIRI = '200000' // kesinti olursa ~50 günlük kayıt; 256 MB'ın çok altında
const TUZ_OMRU_SN = '93600' // 26 saat

const bos = () => new Response(null, { status: 204 })

async function upstash<T>(govde: unknown, yol = ''): Promise<T> {
  const r = await fetch(`${UPSTASH_URL}${yol}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${UPSTASH_TOKEN}` },
    body: JSON.stringify(govde),
    cache: 'no-store',
    signal: AbortSignal.timeout(1500),
  })
  if (!r.ok) throw new Error(`upstash ${r.status}`)
  return r.json() as Promise<T>
}

let tuzBellek: { gun: string; tuz: string } | null = null

async function gununTuzu(gun: string) {
  if (tuzBellek?.gun === gun) return tuzBellek.tuz
  const anahtar = `tuz:${gun}`
  const sonuc = await upstash<{ result: string | null }[]>(
    [['SET', anahtar, randomBytes(16).toString('hex'), 'NX', 'EX', TUZ_OMRU_SN], ['GET', anahtar]],
    '/pipeline',
  )
  const tuz = sonuc[1]?.result
  if (!tuz) throw new Error('tuz okunamadı')
  tuzBellek = { gun, tuz }
  return tuz
}

// Kötüye kullanıma karşı basit sınır (sunucu örneği başına, Upstash işlemi harcamaz)
let dakika = 0
const sayac = new Map<string, number>()
function fazlaIstek(kod: string) {
  const d = Math.floor(Date.now() / 60000)
  if (d !== dakika) {
    dakika = d
    sayac.clear()
  }
  const n = (sayac.get(kod) ?? 0) + 1
  sayac.set(kod, n)
  return n > DAKIKADA_EN_FAZLA
}

function temizle(ham: unknown) {
  const d: Record<string, string | number> = {}
  if (!ham || typeof ham !== 'object') return d
  for (const [k, v] of Object.entries(ham)) {
    if (!ALANLAR.has(k)) continue
    if (typeof v === 'number' && Number.isFinite(v)) d[k] = Math.round(v)
    else if (typeof v === 'string' && v) d[k] = v.slice(0, 120)
  }
  return d
}

/** Tarayıcı bilgisinin kendisi saklanmaz; yalnız bu genel bilgiler çıkarılır. */
function cihazBilgisi(ua: string) {
  const uygulama = /FBAN|FBAV|FB_IAB/.test(ua)
    ? 'facebook'
    : /Instagram/.test(ua)
      ? 'instagram'
      : /TikTok|musical_ly/.test(ua)
        ? 'tiktok'
        : /LinkedInApp/.test(ua)
          ? 'linkedin'
          : ''
  const cihaz = /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'mobil' : 'masaustu'
  const sistem = /iPhone|iPad|iOS/.test(ua)
    ? 'iOS'
    : /Android/.test(ua)
      ? 'Android'
      : /Windows/.test(ua)
        ? 'Windows'
        : /Mac OS X/.test(ua)
          ? 'macOS'
          : /Linux/.test(ua)
            ? 'Linux'
            : 'diger'
  const tarayici = /Edg\//.test(ua)
    ? 'Edge'
    : /SamsungBrowser/.test(ua)
      ? 'Samsung'
      : /OPR\/|Opera/.test(ua)
        ? 'Opera'
        : /Chrome\/|CriOS/.test(ua)
          ? 'Chrome'
          : /Firefox|FxiOS/.test(ua)
            ? 'Firefox'
            : /Safari/.test(ua)
              ? 'Safari'
              : 'diger'
  return { cihaz, sistem, tarayici, ...(uygulama ? { uygulama } : {}) }
}

function konumBilgisi(request: NextRequest) {
  const ulke = request.headers.get('x-vercel-ip-country') ?? ''
  let sehir = request.headers.get('x-vercel-ip-city') ?? ''
  try {
    sehir = decodeURIComponent(sehir)
  } catch {
    sehir = ''
  }
  return { ...(ulke ? { ulke } : {}), ...(sehir ? { sehir } : {}) }
}

export async function POST(request: NextRequest) {
  try {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) return bos()

    // Yalnız sitenin kendi sayfalarından
    const kaynak = request.headers.get('origin')
    if (!kaynak || new URL(kaynak).host !== request.headers.get('host')) return bos()

    const ua = request.headers.get('user-agent') ?? ''
    if (!ua || BOT.test(ua)) return bos()

    const metin = await request.text()
    if (metin.length > EN_BUYUK_GOVDE) return bos()
    const g = JSON.parse(metin) as { a?: unknown; o?: unknown; s?: unknown; d?: unknown }
    if (typeof g.o !== 'string' || !TURLER.has(g.o)) return bos()
    if (typeof g.s !== 'string' || !g.s.startsWith('/')) return bos()
    const oturum = typeof g.a === 'string' ? g.a.slice(0, 12) : ''

    const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
    const gun = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(new Date())
    const tuz = await gununTuzu(gun)
    const kod = createHash('sha256').update(`${tuz}|${ip}|${ua}`).digest('hex').slice(0, 12)
    if (fazlaIstek(kod)) return bos()

    const temiz = temizle(g.d)
    // Cihaz ve konum yalnız sayfa yüklemesinin ilk kaydında; sonrakiler "a" koduyla ona bağlanır
    const d = { ...temiz, ...(g.o === 'sayfa' && temiz.ekran ? { ...cihazBilgisi(ua), ...konumBilgisi(request) } : {}) }
    const kayit = { t: Date.now(), z: kod, a: oturum, o: g.o, s: g.s.split('?')[0].slice(0, 120), d }
    await upstash(['XADD', 'olay', 'MAXLEN', '~', AKIS_SINIRI, '*', 'v', JSON.stringify(kayit)])
  } catch {
    /* ölçüm hatası ziyaretçiyi etkilemez */
  }
  return bos()
}
