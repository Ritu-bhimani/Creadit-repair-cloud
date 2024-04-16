import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translations.json';
import translationFR from './locales/fr/translations.json';
// configuration of i18n for translations
i18n.use(initReactI18next).init({
  // default fallback to english in case to load translation
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: translationEN
    },
    fr: {
      translations: translationFR
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

// currently supported languages English & French
i18n.languages = ['en', 'fr'];

export default i18n;
