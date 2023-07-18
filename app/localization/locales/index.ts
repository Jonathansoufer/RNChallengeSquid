import { Locale } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';

import translationEN from './English/translations.json';

import translationPT from './Portuguese/translations.json';

export const localResources = {
  en: {
    translation: translationEN,
  },

  pt: {
    translation: translationPT,
  },
} as const;

export type SupportedLocales = keyof typeof localResources;

export const dateLocales: { [Key in SupportedLocales]: Locale } = {
  en: enUS,
  pt: pt,
};
