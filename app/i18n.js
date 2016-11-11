/*
|--------------------------------------------------------------------------
| i18n.js
|--------------------------------------------------------------------------
|
| This will setup the i18n language files and locale data for your app.
|
*/

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';
import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';
import { DEFAULT_LOCALE } from '../app/containers/App/constants';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = [
    'en',
    'de'
];

export const formatTranslationMessages = (locale, messages) => {
    const formattedMessages = {};
    const messageKeys = Object.keys(messages);
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE ?
        formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
        : {};

    for (const messageKey of messageKeys) { // eslint-disable-line
        if (locale === DEFAULT_LOCALE) {
            formattedMessages[messageKey] = messages[messageKey];
        } else {
            formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey];
        }
    }

    return formattedMessages;
};

export const translationMessages = {
    en: formatTranslationMessages('en', enTranslationMessages),
    de: formatTranslationMessages('de', deTranslationMessages)
};
