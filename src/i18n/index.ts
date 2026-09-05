import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { fr } from './fr'
import { en } from './en'
import { readStoredLang, detectLang } from '../store/settings'

void i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: readStoredLang() ?? detectLang(),
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  interpolation: { escapeValue: false },
})

export default i18n
