// Google etiketi (Google Ads dönüşüm izleme) — tüm sayfalarda bir kez yüklenir.
// Konum: components/analytics/GoogleTag.tsx
//
// Google Ads hesabı: 983-052-1286
// Etiket kimliği:    AW-18226411285
//
// İzin modu (Consent Mode v2): Etiket, kullanıcı çerez bildirimine yanıt verene kadar
// CONSENT_DEFAULT ile başlar. 'denied' = çerez yazılmaz, dönüşüm sinyali çerezsiz
// ("cookieless ping") gider; kullanıcı "Kabul et" derse ConsentBanner izinleri 'granted'a çeker.
// KVKK Çerez Rehberi reklam/izleme çerezleri için açık rıza öngörür → varsayılan 'denied'.
// Bu bir iş/hukuk kararıdır; değiştirmek için sadece aşağıdaki sabiti düzenleyin.

import Script from 'next/script'

export const GOOGLE_ADS_ID = 'AW-18226411285'
export const CONSENT_DEFAULT: 'denied' | 'granted' = 'denied'

/**
 * İzin varsayılanı + window.gtag tanımı. Etiket yüklenmeden önce çalışmalı; bu yüzden
 * app/layout.tsx içinde <Script strategy="beforeInteractive"> ile doğrudan verilir
 * (Next.js beforeInteractive betiklerinin root layout'ta durmasını ister).
 */
export const GTAG_CONSENT_DEFAULT_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  ad_storage: '${CONSENT_DEFAULT}',
  ad_user_data: '${CONSENT_DEFAULT}',
  ad_personalization: '${CONSENT_DEFAULT}',
  analytics_storage: '${CONSENT_DEFAULT}',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
`.trim()

export default function GoogleTag() {
  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
`.trim(),
        }}
      />
    </>
  )
}
