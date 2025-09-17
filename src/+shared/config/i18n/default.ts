import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {enTranslations, koTranslations} from './messages';
import { getLocale } from '@/+shared/functions';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: enTranslations},
    ko: {translation: koTranslations},
  },
  lng: getLocale() || 'ko',     // 기본 언어
  fallbackLng: 'en',            // 대체 언어
  interpolation: {
    escapeValue: false,         // React에서는 이미 XSS를 방지하므로 false
  },
});

export default i18n;