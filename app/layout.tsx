import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import GoogleTag, { GTAG_CONSENT_DEFAULT_SNIPPET } from '@/components/analytics/GoogleTag'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import ConsentBanner from '@/components/analytics/ConsentBanner'
import StickyCallBar from '@/components/ui/StickyCallBar'

const kolcuogluBrand = localFont({
  src: '../public/fonts/kolcuoglu-brand.ttf',
  variable: '--font-brand',
  display: 'swap',
})

// Self-hosted at build time (no render-blocking request to fonts.googleapis.com).
// Variable fonts cover every weight in one file. Turkish needs latin-ext (ğ, ş, İ), but the
// above-the-fold h1 ("116 Yıllık Gelenek, Herkes için.") only uses the latin subset (ı is in
// latin). Each family is therefore split into a small preloaded latin file and a latin-ext /
// file that is NOT preloaded (browser fetches it only when a glyph needs it), so ~250 KB
// of font preloads no longer compete with CSS/JS on slow mobile connections.
// preload:false everywhere: with Next 16.2.1 (Turbopack) every preloaded font gets two identical @font-face rules
// (a '.p.' file and a normal one), so each preloaded file was downloaded twice (~125 KB wasted).
// Stack order matters: the ext family comes first and has no size-adjusted fallback of its own;
// the latin family (with its fallback) follows, so a glyph missing from both lands in the fallback.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})
const playfairExt = Playfair_Display({
  subsets: ['latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-ext',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})
const interExt = Inter({
  subsets: ['latin-ext'],
  variable: '--font-inter-ext',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kolcuogluflorya.com'),
  title: {
    default: 'Kolcuoğlu Florya | Metrelik Kebap ve Ocakbaşı Restoranı – İstanbul',
    template: '%s | Kolcuoğlu Florya',
  },
  description:
    "1910'dan bu yana kor ateşinde pişen metrelik kebap, Adana kebap ve geleneksel mezeler. İstanbul Florya'da deniz manzaralı kebap restoranı. Rezervasyon: 0533 131 54 01",
  keywords: ['kolcuoğlu', 'kolcuoğlu florya', 'kebap', 'metrelik kebap', 'adana kebap', 'florya restoran', 'istanbul kebapçı', 'ocakbaşı', 'meze', 'türk mutfağı'],
  // NOTE: canonical is per-route; every route must set its own alternates.canonical
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kolcuoğlu Florya | Metrelik Kebap ve Ocakbaşı Restoranı',
    description: "1910'dan bu yana İstanbul'un en köklü kebap geleneği, Florya'da.",
    url: '/',
    siteName: 'Kolcuoğlu Florya',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/images/og-kolcuoglu-florya.jpg',
        width: 1200,
        height: 630,
        alt: 'Kolcuoğlu Florya metrelik kebap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolcuoğlu Florya | Metrelik Kebap ve Ocakbaşı Restoranı',
    description: "İstanbul Florya'da deniz manzaralı kebap restoranı.",
    images: ['/images/og-kolcuoglu-florya.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Font variables live on <html> so :root's --font-serif / --font-sans can resolve them
    <html lang="tr" className={`${playfair.variable} ${playfairExt.variable} ${inter.variable} ${interExt.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              '@id': 'https://www.kolcuogluflorya.com/#restaurant',
              name: 'Kolcuoğlu Florya',
              description: "İstanbul Florya'da premium kebap ve gastronomi restoranı.",
              foundingDate: '1910',
              url: 'https://www.kolcuogluflorya.com',
              image: [
                'https://www.kolcuogluflorya.com/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
                'https://www.kolcuogluflorya.com/images/kolcuoglu-florya-restoran-salonu.jpeg',
                'https://www.kolcuogluflorya.com/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
              ],
              hasMap: 'https://maps.app.goo.gl/2vAwEAAYAtk6AncA7',
              sameAs: [
                'https://www.instagram.com/kolcuoglu.florya',
                'https://maps.app.goo.gl/2vAwEAAYAtk6AncA7',
              ],
              telephone: '+90-533-131-54-01',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Basınköy, Çekmece İstanbul Cd. No:39',
                addressLocality: 'Bakırköy',
                addressRegion: 'İstanbul',
                postalCode: '34153',
                addressCountry: 'TR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.9772531,
                longitude: 28.775728,
              },
              // Must match the Google Business Profile (every day 11:00–00:00) and /iletisim
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '11:00',
                  closes: '00:00',
                },
              ],
              servesCuisine: ['Turkish', 'Kebap', 'Mediterranean'],
              priceRange: '₺₺₺',
              menu: 'https://www.kolcuogluflorya.com/menu',
              acceptsReservations: 'True',
            }),
          }}
        />
      </head>
      <body className={`${kolcuogluBrand.variable} theme-light relative min-h-screen flex flex-col`}>
        <Navbar />
        <main style={{ flex: 1 }} className="w-full overflow-x-hidden">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
        <Footer />
        <StickyCallBar />
        {/* İzin varsayılanı etiket yüklenmeden önce ayarlanmalı (Consent Mode v2) */}
        <Script
          id="gtag-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: GTAG_CONSENT_DEFAULT_SNIPPET }}
        />
        <GoogleTag />
        <ConversionTracker />
        <ConsentBanner />
      </body>
    </html>
  )
}
