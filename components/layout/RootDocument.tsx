// The <html> document shared by every root layout (app/(tr)/layout.tsx, app/en/layout.tsx, …).
// Each language has its own root layout so <html lang> is right in the static HTML; switching
// language is a full page load, which is fine for a language switch.
import '@/app/globals.css'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { htmlFontClasses, kolcuogluBrand } from '@/app/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GoogleTag, { GTAG_CONSENT_DEFAULT_SNIPPET } from '@/components/analytics/GoogleTag'
import ConversionTracker from '@/components/analytics/ConversionTracker'
import ConsentBanner from '@/components/analytics/ConsentBanner'
import StickyCallBar from '@/components/ui/StickyCallBar'
import { getDictionary, path, type Locale } from '@/i18n'
import { SITE_URL } from '@/i18n/metadata'

export default function RootDocument({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDictionary(lang)
  return (
    <html lang={lang} className={htmlFontClasses}>
      {/* This component is the root layout's whole output, so <head> and beforeInteractive belong here */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              '@id': 'https://www.kolcuogluflorya.com/#restaurant',
              name: 'Kolcuoğlu Florya',
              description: t.meta.restaurantDescription,
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
              // Must match the Google Business Profile (every day 11:00–00:00) and the contact page
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
              menu: `${SITE_URL}${path(lang, 'menu')}`,
              acceptsReservations: 'True',
            }),
          }}
        />
      </head>
      <body className={`${kolcuogluBrand.variable} theme-light relative min-h-screen flex flex-col`}>
        <Navbar lang={lang} t={t.nav} />
        <main style={{ flex: 1 }} className="w-full overflow-x-hidden">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
        <Footer lang={lang} />
        <StickyCallBar
          t={t.stickyBar}
          whatsappText={t.whatsappText}
          reservationPath={path(lang, 'reservation')}
        />
        {/* İzin varsayılanı etiket yüklenmeden önce ayarlanmalı (Consent Mode v2) */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="gtag-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: GTAG_CONSENT_DEFAULT_SNIPPET }}
        />
        <GoogleTag />
        <ConversionTracker />
        <ConsentBanner t={t.consent} privacyHref={path(lang, 'privacy')} />
      </body>
    </html>
  )
}
