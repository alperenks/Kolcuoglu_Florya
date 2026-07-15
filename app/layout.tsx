import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

const kolcuogluBrand = localFont({
  src: '../public/fonts/kolcuoglu-brand.ttf',
  variable: '--font-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kolcuogluflorya.com'),
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
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              '@id': 'https://kolcuogluflorya.com/#restaurant',
              name: 'Kolcuoğlu Florya',
              description: "İstanbul Florya'da premium kebap ve gastronomi restoranı.",
              foundingDate: '1910',
              url: 'https://kolcuogluflorya.com',
              image: [
                'https://kolcuogluflorya.com/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
                'https://kolcuogluflorya.com/images/kolcuoglu-florya-restoran-salonu.jpeg',
                'https://kolcuogluflorya.com/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
              ],
              hasMap: 'https://maps.app.goo.gl/2vAwEAAYAtk6AncA7',
              sameAs: [
                'https://www.instagram.com/kolcuoglu.florya',
                'https://maps.app.goo.gl/2vAwEAAYAtk6AncA7',
              ],
              telephone: '+90-533-131-54-01',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Çekmece İstanbul Cd. 39',
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
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
                  opens: '12:00',
                  closes: '00:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Friday', 'Saturday'],
                  opens: '12:00',
                  closes: '01:00',
                },
              ],
              servesCuisine: ['Turkish', 'Kebap', 'Mediterranean'],
              priceRange: '₺₺₺',
              menu: 'https://kolcuogluflorya.com/menu',
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
      </body>
    </html>
  )
}
