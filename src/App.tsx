import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Backdrop } from './components/Backdrop'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { Footer } from './components/Footer'
import { resolveTheme, useSettings } from './store/settings'

export default function App() {
  const { t, i18n } = useTranslation()
  const { theme, lang, accent } = useSettings()

  // Thème : applique le choix, et suit la préférence système en mode « system ».
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme)
    }
    apply()
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  useEffect(() => {
    if (i18n.resolvedLanguage !== lang) void i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang, i18n])

  useEffect(() => {
    document.title = `Fabrice Boyer — ${t('nav.apps')} & ${t('nav.libs')}`
  }, [t, lang])

  return (
    <>
      <a className="skip-link" href="#apps">
        {t('a11y.skip')}
      </a>
      <Backdrop />
      <Header />
      <main>
        <Hero />
        <Section category="apps" id="apps" />
        <Section category="libs" id="libs" />
      </main>
      <Footer />
    </>
  )
}
