import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rezervasyon – Online Masa Ayırtın',
  description:
    "Kolcuoğlu Florya'da online rezervasyon yapın. Deniz manzaralı salon, ocakbaşı ve VIP salon için masanızı ayırtın. İstanbul Florya. Tel: 0533 131 54 01",
  alternates: { canonical: '/rezervasyon' },
}

export default function RezervasyonLayout({ children }: { children: React.ReactNode }) {
  return children
}
