import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GITHUB_USER, langColors, type Project } from '../data/projects'
import { Thumb } from '../thumbs'
import type { Lang } from '../store/settings'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage === 'en' ? 'en' : 'fr') as Lang

  /** Suit le curseur pour le halo d'accent sur la carte. */
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const repo = `https://github.com/${GITHUB_USER}/${project.slug}`

  return (
    <motion.article
      className="card"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <span className="card-spot" aria-hidden="true" />

      <div className="card-media">
        <Thumb slug={project.slug} />
        {project.demo && (
          <span className="card-live">
            <i />
            {t('card.live')}
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
          {project.stars > 0 && (
            <span className="card-stars" title={t('card.stars', { count: project.stars })}>
              <Star size={12} strokeWidth={2.6} />
              {project.stars}
            </span>
          )}
        </div>

        <p className="card-desc">{project.desc[lang]}</p>

        <div className="tags">
          <span className="tag tag-lang" style={{ ['--dot' as string]: langColors[project.lang] }}>
            {project.lang}
          </span>
          <span className="tag">{t(`kinds.${project.kind}`)}</span>
          {project.topics.slice(0, 2).map((tp) => (
            <span className="tag" key={tp}>
              {tp}
            </span>
          ))}
        </div>

        <div className="card-links">
          {project.demo && (
            <a
              className="card-link card-link-primary"
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('card.demo')}
              <ArrowUpRight size={14} strokeWidth={2.6} />
            </a>
          )}
          <a className="card-link" href={repo} target="_blank" rel="noreferrer noopener">
            <Github size={14} strokeWidth={2.2} />
            {t('card.code')}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
