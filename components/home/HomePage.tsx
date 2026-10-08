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
          '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg': alts['/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg'],
          '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg': alts['/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg'],
          '/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg': alts['/images/kolcuoglu-florya-ic-mekan-tasarimi.jpeg'],
          '/images/kolcuoglu-florya-tatli-ikrami.jpg': alts['/images/kolcuoglu-florya-tatli-ikrami.jpg'],
        }}
        galleryHref={path(lang, 'gallery')}
      />
      <FaqSection lang={lang} />
    </>
  )
}
