import ruTranslations from '@/locales/ru.json';
import enTranslations from '@/locales/en.json';

export type Locale = 'ru' | 'en';

const translations: Record<Locale, typeof ruTranslations> = {
  ru: ruTranslations,
  en: enTranslations,
};

let currentLocale: Locale = 'ru';

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const getLocale = (): Locale => {
  return currentLocale;
};

export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[currentLocale];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

export const useTranslation = () => {
  return { t, locale: currentLocale, setLocale };
};
