import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type Lang = 'fr' | 'en'

export const ACCENTS = [
  { name: 'violet', value: '#7c5cff' },
  { name: 'indigo', value: '#4f6bff' },
  { name: 'cyan', value: '#06b6d4' },
  { name: 'emerald', value: '#10b981' },
  { name: 'lime', value: '#84cc16' },
  { name: 'amber', value: '#f59e0b' },
  { name: 'orange', value: '#f97316' },
  { name: 'rose', value: '#f43f5e' },
  { name: 'pink', value: '#ec4899' },
  { name: 'slate', value: '#64748b' },
] as const


/** Langue déduite du navigateur, repli sur le français. */
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'fr'
  return navigator.languages?.some((l) => l.toLowerCase().startsWith('en')) ? 'en' : 'fr'
}

/** Langue déjà persistée, si l'utilisateur en a choisi une. */
export function readStoredLang(): Lang | null {
  try {
    const s = JSON.parse(localStorage.getItem('fb-settings') || '{}').state
    return s?.lang === 'en' || s?.lang === 'fr' ? s.lang : null
  } catch {
    return null
  }
}

interface SettingsState {
  theme: Theme
  lang: Lang
  accent: string
  setTheme: (t: Theme) => void
  setLang: (l: Lang) => void
  setAccent: (a: string) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      lang: detectLang(),
      accent: ACCENTS[0].value,
      setTheme: (theme) => set({ theme }),
      setLang: (lang) => set({ lang }),
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'fb-settings' },
  ),
)

/** Le thème effectif, en tenant compte de la préférence système. */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
