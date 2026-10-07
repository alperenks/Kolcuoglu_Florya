// Google etiketi (Google Ads dönüşüm izleme + Google Analytics 4) — tüm sayfalarda bir kez yüklenir.
// Konum: components/analytics/GoogleTag.tsx
//
// Google Ads hesabı: 983-052-1286
// Etiket kimliği:    AW-18226411285
// GA4 mülkü:         "kolcuogluflorya.com" — hesap 411207593, mülk 557981477, web akışı 16062376811
//                    (Google hesabı tarkankolcuoglu3)
//                    GA4 de aynı izin modunu kullanır: 'denied' iken çerez yazmaz.
//
// İzin modu (Consent Mode v2): Etiket, kullanıcı çerez bildirimine yanıt verene kadar
// CONSENT_DEFAULT ile başlar. 'denied' = çerez yazılmaz, dönüşüm sinyali çerezsiz
// ("cookieless ping") gider; kullanıcı "Kabul et" derse ConsentBanner izinleri 'granted'a çeker.
// KVKK Çerez Rehberi reklam/izleme çerezleri için açık rıza öngörür → varsayılan 'denied'.
// Bu bir iş/hukuk kararıdır; değiştirmek için sadece aşağıdaki sabiti düzenleyin.

import Script from 'next/script'

export const GOOGLE_ADS_ID = 'AW-18226411285'
/** GA4 ölçüm kimliği (G-…). Boşsa GA4 hiç yapılandırılmaz. */
export const GA4_ID = 'G-BM5XN0YGZF'
export const CONSENT_DEFAULT: 'denied' | 'granted' = 'denied'
/** ConsentBanner'ın seçimi sakladığı localStorage anahtarı ('granted' | 'denied'). */
export const CONSENT_STORAGE_KEY = 'kf-cookie-consent'

/**
 * İzin varsayılanı + window.gtag tanımı. Ziyaretçi daha önce seçim yaptıysa (localStorage) varsayılan
 * doğrudan o seçimdir; böylece ilk sayfa görüntülemesi de doğru izinle gider. Etiket yüklenmeden önce
 * çalışmalı; bu yüzden
 * app/layout.tsx içinde <Script strategy="beforeInteractive"> ile doğrudan verilir
 * (Next.js beforeInteractive betiklerinin root layout'ta durmasını ister).
 */
export const GTAG_CONSENT_DEFAULT_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
var kfConsent = '${CONSENT_DEFAULT}';
try {
  var kfSaved = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
  if (kfSaved === 'granted' || kfSaved === 'denied') kfConsent = kfSaved;
} catch (e) {}
gtag('consent', 'default', {
  ad_storage: kfConsent,
  ad_user_data: kfConsent,
  ad_personalization: kfConsent,
  analytics_storage: kfConsent,
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
gtag('config', '${GOOGLE_ADS_ID}');${GA4_ID ? `
gtag('config', '${GA4_ID}');` : ''}
`.trim(),
        }}
      />
    </>
  )
}
