import type { MetadataRoute } from 'next'

const BASE = 'https://www.kolcuogluflorya.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1, changeFrequency: 'monthly' },
    { url: `${BASE}/menu`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/rezervasyon`, priority: 0.8, changeFrequency: 'yearly' },
    { url: `${BASE}/iletisim`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE}/galeri`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/sirket-yemekleri`, priority: 0.6, changeFrequency: 'yearly' },
  ]
}
