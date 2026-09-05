import { useEffect, useState } from 'react'
import { Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GITHUB_USER } from '../data/projects'
import { AccentPicker, LangToggle, ThemeToggle } from './Controls'

export function Header() {
  const { t } = useTranslation()
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="header" data-stuck={stuck}>
      <div className="shell header-inner">
        <a className="brand" href="#top">
          <span className="brand-mark">FB</span>
          Fabrice Boyer
        </a>

        <nav className="header-nav">
          <a href="#apps">{t('nav.apps')}</a>
          <a href="#libs">{t('nav.libs')}</a>
        </nav>

        <div className="header-actions">
          <LangToggle />
          <ThemeToggle />
          <AccentPicker />
          <a
            className="ctrl"
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t('nav.github')}
          >
            <Github size={15} strokeWidth={2} />
          </a>
        </div>
      </div>
    </header>
  )
}
