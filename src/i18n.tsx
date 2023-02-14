import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './locales/english/translation.json';
import translationGerman from './locales/german/translation.json';
import translationRussian from './locales/russian/translation.json';

const resources = {
    en: {
        translation: translationEnglish,
    },
    de: {
        translation: translationGerman,
    },
    ru: {
        translation: translationRussian,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
});

export default i18next;
