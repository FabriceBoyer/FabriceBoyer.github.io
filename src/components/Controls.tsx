import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Monitor, Moon, Palette, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ACCENTS, useLang, useSettings, type Lang, type Theme } from '../store/settings'

const THEMES: Array<{ id: Theme; Icon: typeof Sun; key: 'light' | 'dark' | 'system' }> = [
  { id: 'light', Icon: Sun, key: 'light' },
  { id: 'dark', Icon: Moon, key: 'dark' },
  { id: 'system', Icon: Monitor, key: 'system' },
]

export function ThemeToggle() {
  const { t } = useTranslation()
  const theme = useSettings((s) => s.theme)
  const setTheme = useSettings((s) => s.setTheme)

  return (
    <div className="ctrl segmented" role="group" aria-label={t('a11y.theme')}>
      {THEMES.map(({ id, Icon, key }) => (
        <button
          key={id}
          type="button"
          aria-pressed={theme === id}
          aria-label={t(`a11y.${key}`)}
          title={t(`a11y.${key}`)}
          onClick={() => setTheme(id)}
        >
          {theme === id && (
            <motion.span layoutId="theme-pill" className="seg-pill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
          )}
          <span>
            <Icon size={13} strokeWidth={2.1} />
          </span>
        </button>
      ))}
    </div>
  )
}

export function LangToggle() {
  const { t } = useTranslation()
  const lang = useLang()
  const setLang = useSettings((s) => s.setLang)

  return (
    <div className="ctrl segmented" role="group" aria-label={t('a11y.lang')}>
      {(['fr', 'en'] as Lang[]).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} lang={l} onClick={() => setLang(l)}>
          {lang === l && (
            <motion.span layoutId="lang-pill" className="seg-pill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
          )}
          <span>{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export function AccentPicker() {
  const { t } = useTranslation()
  const accent = useSettings((s) => s.accent)
  const setAccent = useSettings((s) => s.setAccent)
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="accent" ref={box}>
      <button
        type="button"
        className="ctrl"
        aria-label={t('a11y.accent')}
        aria-expanded={open}
        title={t('a11y.accent')}
        onClick={() => setOpen((o) => !o)}
      >
        <Palette size={14} strokeWidth={2} />
        <span className="accent-dot" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="accent-pop"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
          >
            <div className="accent-pop-title">{t('a11y.accent')}</div>
            <div className="swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  className="swatch"
                  aria-pressed={accent === a.value}
                  aria-label={a.name}
                  title={a.name}
                  style={{ background: a.value, color: a.value }}
                  onClick={() => setAccent(a.value)}
                >
                  {accent === a.value && <Check size={11} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
