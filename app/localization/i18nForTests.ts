import i18nForTests from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/English/translations.json';

const resources = {
  en: {
    translation: translationEN,
  },
};

i18nForTests.use(initReactI18next).init({
  compatibilityJSON: 'v1',
  lng: 'en',
  fallbackLng: 'en',

  debug: false,

  interpolation: {
    escapeValue: false,
  },

  resources,
});

export default i18nForTests;
