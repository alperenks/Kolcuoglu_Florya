// Homepage for any language. Server component: the animated sections are client components that get
// their copy as props; "why us" and the FAQ have no JavaScript and render on the server only.
import WhyUsSection from '@/components/sections/WhyUsSection'
import FaqSection from '@/components/sections/FaqSection'
import { AboutSection, AtmosphereSection, FeaturedMenuSection, HeroSection } from './HomeSections'
import { getDictionary, path, type Locale } from '@/i18n'

export default function HomePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const alts = t.imageAlts
  return (
    <>
      <HeroSection t={t.home.hero} stories={t.stories} menuHref={path(lang, 'menu')} />
      <WhyUsSection lang={lang} />
      <AboutSection t={t.home.about} portraitAlt={alts['/images/hasan-kolcuoglu-metrelik-kebap-mucidi.jpeg']} />
      <FeaturedMenuSection t={t.home.featured} menuHref={path(lang, 'menu')} />
      <AtmosphereSection
        t={t.home.atmosphere}
        alts={{
          '/images/kolcuoglu-florya-gun-batimi-deniz-manzarasi.jpg': alts['/images/kolcuoglu-florya-gun-batimi-deniz-manzarasi.jpg'],
          '/images/kolcuoglu-florya-1-kat-salon-deniz-manzarasi.jpg': alts['/images/kolcuoglu-florya-1-kat-salon-deniz-manzarasi.jpg'],
          '/images/kolcuoglu-florya-2-kat-teras-deniz-manzarasi.jpg': alts['/images/kolcuoglu-florya-2-kat-teras-deniz-manzarasi.jpg'],
          '/images/kolcuoglu-florya-1-kat-dag-duvari-lambalar.jpg': alts['/images/kolcuoglu-florya-1-kat-dag-duvari-lambalar.jpg'],
        }}
        galleryHref={path(lang, 'gallery')}
      />
      <FaqSection lang={lang} />
    </>
  )
}
