import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { byCategory, type Category } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function Section({ category, id }: { category: Category; id: string }) {
  const { t } = useTranslation()
  const all = useMemo(() => byCategory(category), [category])
  const [filter, setFilter] = useState<string | null>(null)

  const langs = useMemo(() => {
    const counts = new Map<string, number>()
    all.forEach((p) => counts.set(p.lang, (counts.get(p.lang) ?? 0) + 1))
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [all])

  const shown = filter ? all.filter((p) => p.lang === filter) : all

  return (
    <section className="section shell" id={id}>
      <div className="section-head">
        <h2>
          {t(`${category}.title`)}
          <span className="section-count">{all.length}</span>
        </h2>
        <p>{t(`${category}.sub`)}</p>
      </div>

      {langs.length > 1 && (
        <div className="filters" role="group" aria-label={t('filters.lang')}>
          <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
            {t('filters.all')}
            <em className="chip-count">{all.length}</em>
          </button>
          {langs.map(([l, n]) => (
            <button
              key={l}
              type="button"
              className="chip"
              aria-pressed={filter === l}
              onClick={() => setFilter(filter === l ? null : l)}
            >
              {l}
              <em className="chip-count">{n}</em>
            </button>
          ))}
        </div>
      )}

      <motion.div className="grid" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div key={p.slug} layout exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.18 }}>
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && <p className="empty">{t('empty')}</p>}
    </section>
  )
}
