import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

const kolcuogluBrand = localFont({
  src: '../public/fonts/kolcuoglu-brand.ttf',
  variable: '--font-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Kolcuoğlu | İstanbul'un İmza Kebap & Gastronomi Deneyimi",
    template: '%s | Kolcuoğlu',
  },
  description:
    "Est. 1910 'dan bu yana, kor ateşinde ustalıkla pişirilen kebaplar ve geleneksel Türk meze kültürü. İstanbul Florya'da lüks bir gastronomi deneyimi.",
  keywords: ['kebap', 'türk mutfağı', 'istanbul restoran', 'gastronomi', 'meze', 'ocakbaşı', 'adana kebap', 'kolcuoğlu'],
  openGraph: {
    title: 'Kolcuoğlu | Premium Kebap & Gastronomi',
    description: "1910'dan bu yana İstanbul'un en köklü kebap geleneği.",
    locale: 'tr_TR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
              name: 'Kolcuoğlu Florya',
              description: "İstanbul Florya'da premium kebap ve gastronomi restoranı.",
              foundingDate: '1910',
              url: 'https://kolcuogluflorya.com',
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
                latitude: 40.9723,
                longitude: 28.7981,
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
              menu: 'https://kolcuoglu.com.tr/menu',
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
        <Footer />
      </body>
    </html>
  )
}
