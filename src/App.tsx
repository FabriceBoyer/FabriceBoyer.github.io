import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { Footer } from './components/Footer'
import { resolveTheme, useLang, useSettings } from './store/settings'

export default function App() {
  const { t, i18n } = useTranslation()
  const theme = useSettings((s) => s.theme)
  const accent = useSettings((s) => s.accent)
  const lang = useLang()

  // Applique le thème choisi ; en mode « système », suit la préférence de l'OS.
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
