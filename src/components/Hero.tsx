import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GITHUB_USER, projects } from '../data/projects'

const up = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/** Petit compteur qui s'incrémente au chargement. */
function Counter({ to }: { to: number }) {
  const still = useReducedMotion()
  const [n, setN] = useState(still ? to : 0)

  useEffect(() => {
    if (still) return
    const controls = animate(0, to, {
      duration: 1.1,
      delay: 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [to, still])

  return <>{n}</>
}

export function Hero() {
  const { t } = useTranslation()

  const stats = [
    { n: projects.length, label: t('hero.stat_projects') },
    { n: projects.filter((p) => p.demo).length, label: t('hero.stat_live') },
    { n: new Set(projects.map((p) => p.lang)).size, label: t('hero.stat_langs') },
    { n: projects.reduce((s, p) => s + p.stars, 0), label: t('hero.stat_stars') },
  ]

  return (
    <section className="hero shell" id="top">
      <motion.div custom={0} variants={up} initial="hidden" animate="show">
        <span className="eyebrow">
          {t('hero.status')}
          <i className="pulse" />
        </span>
      </motion.div>

      <motion.h1 custom={1} variants={up} initial="hidden" animate="show">
        {t('hero.title_a')} <span className="grad">{t('hero.title_b')}</span> {t('hero.title_c')}
      </motion.h1>

      <motion.p className="hero-sub" custom={2} variants={up} initial="hidden" animate="show">
        {t('hero.sub')}
      </motion.p>

      <motion.div className="hero-cta" custom={3} variants={up} initial="hidden" animate="show">
        <a className="btn btn-primary" href="#apps">
          {t('hero.cta_explore')}
          <ArrowDown size={16} strokeWidth={2.4} />
        </a>
        <a
          className="btn btn-ghost"
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github size={16} strokeWidth={2.2} />
          {t('hero.cta_github')}
        </a>
      </motion.div>

      <motion.div className="stats" custom={4} variants={up} initial="hidden" animate="show">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="stat-num">
              <Counter to={s.n} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
