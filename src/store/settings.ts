import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type Lang = 'fr' | 'en'

export const ACCENTS = [
  { name: 'blue', value: '#2f6feb' },
  { name: 'indigo', value: '#4f5bd5' },
  { name: 'violet', value: '#7856d6' },
  { name: 'teal', value: '#0d8a8a' },
  { name: 'green', value: '#1a7f45' },
  { name: 'olive', value: '#5f7a1f' },
  { name: 'amber', value: '#a86a12' },
  { name: 'red', value: '#c0392b' },
  { name: 'rose', value: '#b03060' },
  { name: 'slate', value: '#5a6675' },
] as const

/** Langue du navigateur, repli sur le français. */
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'fr'
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of tags) {
    const base = tag?.toLowerCase().split('-')[0]
    if (base === 'fr') return 'fr'
    if (base === 'en') return 'en'
  }
  return 'fr'
}

/** Le thème effectif, en tenant compte de la préférence système. */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface SettingsState {
  /** `'system'` tant que l'utilisateur n'a rien choisi. */
  theme: Theme
  /** `null` tant que l'utilisateur n'a rien choisi : la langue suit le navigateur. */
  lang: Lang | null
  accent: string
  setTheme: (t: Theme) => void
  setLang: (l: Lang) => void
  setAccent: (a: string) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      lang: null,
      accent: ACCENTS[0].value,
      setTheme: (theme) => set({ theme }),
      setLang: (lang) => set({ lang }),
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'fb-settings' },
  ),
)

/** La langue à afficher : le choix de l'utilisateur, sinon celle du navigateur. */
export const useLang = (): Lang => useSettings((s) => s.lang) ?? detectLang()

/** Langue déjà choisie et persistée, s'il y en a une (lecture hors React). */
export function readStoredLang(): Lang | null {
  try {
    const s = JSON.parse(localStorage.getItem('fb-settings') || '{}').state
    return s?.lang === 'en' || s?.lang === 'fr' ? s.lang : null
  } catch {
    return null
  }
}
