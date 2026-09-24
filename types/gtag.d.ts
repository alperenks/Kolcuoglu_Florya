// Google etiketi (gtag.js) için global tip tanımları.
// Konum: types/gtag.d.ts  (tsconfig "include" zaten types/ klasörünü kapsıyorsa ek ayar gerekmez)
export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
