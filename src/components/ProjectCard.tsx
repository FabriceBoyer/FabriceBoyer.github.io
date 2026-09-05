import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GITHUB_USER, langColors, type Project } from '../data/projects'
import { Thumb } from '../thumbs'
import { useLang } from '../store/settings'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()
  const lang = useLang()
  const repo = `https://github.com/${GITHUB_USER}/${project.slug}`

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
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
              <Star size={11} strokeWidth={2.2} />
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
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </a>
          )}
          <a className="card-link" href={repo} target="_blank" rel="noreferrer noopener">
            <Github size={13} strokeWidth={2} />
            {t('card.code')}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
