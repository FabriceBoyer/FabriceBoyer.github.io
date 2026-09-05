import { useTranslation } from 'react-i18next'
import { GITHUB_USER } from '../data/projects'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} Fabrice Boyer — {t('footer.built')}</span>
        <nav className="footer-links">
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a
            href={`https://github.com/${GITHUB_USER}/${GITHUB_USER}.github.io`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('footer.source')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
