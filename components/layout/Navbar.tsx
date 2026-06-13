'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/menu', label: 'Menü' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/sirket-yemekleri', label: 'Şirket Yemekleri' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, setIsLight] = useState(false)

  // Initialize theme from document body or local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const isLightTheme = storedTheme === null || storedTheme === 'light'
    if (isLightTheme) {
      document.body.classList.add('theme-light')
      setIsLight(true)
    } else {
      document.body.classList.remove('theme-light')
      setIsLight(false)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isLight
    setIsLight(nextTheme)
    if (nextTheme) {
      document.body.classList.add('theme-light')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove('theme-light')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'var(--color-navbar-bg)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(163, 33, 36, 0.15)' : 'none',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
           <Link href="/" className="flex flex-col items-start group">
              <span
                className="leading-none tracking-normal font-brand"
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                  backgroundColor: 'rgba(163, 33, 36, 1.0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kolcuoglu
              </span>
              <span
                className="text-xs tracking-widest uppercase mt-0.5"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}
              >
                FLORYA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wider uppercase transition-colors duration-300 relative group"
                  style={{
                    color: 'var(--color-cream)',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.15em',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: 'var(--color-gold)' }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-sm transition-all duration-300 flex items-center justify-center border"
                style={{
                  background: 'var(--color-card-inner-bg)',
                  borderColor: 'var(--color-border-strong)',
                  color: isLight ? 'rgba(163, 33, 36, 1.0)' : 'var(--color-gold)',
                  cursor: 'pointer',
                }}
                aria-label="Temayı Değiştir"
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
              <motion.a
                href="tel:+905331315401"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-center"
                style={{
                  background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                  color: 'white',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.15em',
                  borderRadius: '2px',
                  boxShadow: '0 4px 20px rgba(196, 75, 59, 0.3)',
                }}
              >
                <Phone size={12} /> Rezervasyon Yap
              </motion.a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-sm transition-all duration-300 flex items-center justify-center border"
                style={{
                  background: 'var(--color-card-inner-bg)',
                  borderColor: 'var(--color-border-strong)',
                  color: isLight ? 'rgba(163, 33, 36, 1.0)' : 'var(--color-gold)',
                  cursor: 'pointer',
                }}
                aria-label="Temayı Değiştir"
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
              <button
                className="p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ color: 'var(--color-cream)' }}
                aria-label="Menüyü aç"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'var(--color-mobile-menu-bg)', backdropFilter: 'blur(20px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-0 right-0 p-8 flex flex-col gap-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl"
                    style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-serif)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <a
                  href="tel:+905331315401"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2 text-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-copper))',
                    color: 'white',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.15em',
                    borderRadius: '2px',
                  }}
                >
                  <Phone size={14} /> Rezervasyon Yap
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
