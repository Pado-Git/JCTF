import i18n from 'i18next';
import Cookies from 'js-cookie';

import { I18NLocale } from '@/+shared/config';

const DEFAULT_LOCALE = (import.meta.env.VITE_INIT_LOCALE || 'ko') as 'ko' | 'en';
const SUPPORTED_LOCALES: I18NLocale[] = ['ko', 'en'];

type Prefix = string | string[];
export function withPrefix(prefix: Prefix, key?: string): string {
  const parts = Array.isArray(prefix) ? prefix : [prefix];
  return key ? [...parts, key].join('.') : parts.join('.');
}

export function changeLocale(locale: I18NLocale) {
  try {
    i18n.changeLanguage(locale);
    return true;
  } catch (error) {
    if (import.meta.env.MODE === 'development') {
      console.warn(`[WARN] changeLocale:`, (error as Error).message);
    }
    return false;
  }
}

export function setLocale(locale: I18NLocale, options: Cookies.CookieAttributes = {expires: 365}) {
  changeLocale(locale);
  return Cookies.set('locale', locale, options);
}

export function getLocale(): I18NLocale {
  const stored = Cookies.get('locale');
  if (stored === 'ko' || stored === 'en') {
    return stored;
  }
  setLocale(DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
}

export const detectLocaleFromPathname = (pathname: string): I18NLocale | null => {
  const firstSegment = pathname.split('/')[1]?.toLowerCase();
  return SUPPORTED_LOCALES.includes(firstSegment as I18NLocale)
    ? (firstSegment as I18NLocale)
    : null;
};

export function initializeLocaleFromPaths() {
  const currentLocale = detectLocaleFromPathname(window.location.pathname);
  if (currentLocale) {
    setLocale(currentLocale);
  }
}
