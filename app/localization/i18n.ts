import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import merge from 'lodash.merge';
import { initReactI18next } from 'react-i18next';
import { Config } from 'react-native-config';
import { getVersion } from 'react-native-device-info';
//@ts-ignore
import Phrase from 'react-native-phrase-sdk';

import { localResources } from './locales';
import { getLanguage } from './use-change-language';

// LOG: This enables the app to consume translations from PhraseApp
let phrase = new Phrase(
  Config.PHRASE_DISTRIBUTION_ID,
  Config.PHRASE_SECRET_KEY,
  getVersion(),
  'i18next',
);

const backendPhrase = resourcesToBackend(
  (language: string, namespace: any, callback: any) => {
    phrase
      .requestTranslation(language)
      .then((remoteResources: any) => {
        if (!remoteResources) {
          callback('no remote resources', null);
          return;
        }

        const merged = merge(
          remoteResources,
          // @ts-expect-error
          localResources[language][namespace],
        );
        callback(null, merged);
      })
      .catch((error: any) => {
        callback(error, null);
      });
  },
);

const backendFallback = resourcesToBackend(localResources);

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .use(RNLanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    backend: {
      backends: [backendPhrase, backendFallback],
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },

    lng: getLanguage(),

    react: {
      useSuspense: false,
    },
  });

export default i18n;
