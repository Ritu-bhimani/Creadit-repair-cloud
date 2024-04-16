import i18n from '../i18n/i18n.config';

export const setDefaultLanguage = () => {
  const url = window.location.href;
  const lang = window.location.href.substring(url.lastIndexOf('/') + 1);
  i18n.changeLanguage(lang && lang !== '' ? lang : 'en');
};

export const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== 'string') {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};
