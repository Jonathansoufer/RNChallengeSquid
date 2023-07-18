import { useTranslation } from 'react-i18next';

import { appPersistStorage as mmkv } from '@/globalState/app-persist-storage';

const KEY = 'KADO_LANGUAGE';

export const getLanguage = () => mmkv.getString(KEY);

export function useChangeLanguage() {
  const { i18n } = useTranslation();

  return (value: string) => {
    mmkv.set(KEY, value);

    i18n.changeLanguage(value);
  };
}
