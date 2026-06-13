import Link from 'next/link'
import { Instagram, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

const footerLinks = [
  { href: '/menu', label: 'Menü' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/sirket-yemekleri', label: 'Şirket Yemekleri' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ background: 'var(--color-antracite)', borderTop: '1px solid rgba(163, 33, 36, 0.15)' }}
    >
      <div className="py-16 px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
              <h2
                className="leading-none tracking-normal font-brand"
                style={{
                  fontSize: 'clamp(3.6rem, 3vw, 2.1rem)',
                  backgroundColor: 'rgba(163, 33, 36, 1.0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kolcuoglu
              </h2>
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-muted)', letterSpacing: '0.2em' }}
            >
              FLORYA
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              116 yıllık ustalık geleneğini, modern gastronomi anlayışıyla buluşturan sofra teki İstanbul'un eşsiz kebap deneyimi.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/kolcuoglu.florya"
                target="_blank"
                rel="noreferrer"
                className="p-2 transition-colors duration-300 hover:opacity-100"
                style={{
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  display: 'flex',
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/905331315401"
                target="_blank"
                rel="noreferrer"
                className="p-2 transition-colors duration-300 hover:opacity-100"
                style={{
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  display: 'flex',
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs tracking-widest uppercase mb-6 font-semibold"
              style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}
            >
              Hızlı Erişim
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-xs tracking-widest uppercase mb-6 font-semibold"
              style={{ color: 'var(--color-gold)' }}
            >
              İletişim
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <span>Çekmece İstanbul Cd. 39, 34153 İstanbul, Bakırköy Türkiye</span>
              </li>
              <li className="flex gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                <Phone size={16} className="flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                <a href="https://wa.me/905331315401" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                  +90 533 131 54 01
                </a>
              </li>
              <li className="flex gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                <Clock size={16} className="flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <p>Her Gün: 11:00 – 00:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--color-muted)' }}>
          <p>© Kolcuoğlu Kebap & Gastronomi. Tüm hakları saklıdır.</p>
          <p>Kolcuoğlu, Herkes için.</p>
        </div>
      </div>
    </footer>
  )
}
