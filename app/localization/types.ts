import { TFunction } from 'i18next';
import { localResources } from './locales';

declare module 'react-i18next' {
  export interface CustomTypeOptions {
    resources: (typeof localResources)['en'];
  }
  export type LocalePaths = Parameters<TFunction>[0];
}
