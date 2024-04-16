import i18n from '../../i18n/i18n.config';
import { setDefaultLanguage } from '../language.utils';

describe('Test set window location functionality', () => {
  let originalWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href)
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation
    });
  });

  it('should set correct language', () => {
    const expectedUrl = 'https://www.example.com/fr';
    window.location.href = expectedUrl;
    setDefaultLanguage();
    expect(i18n.language).toEqual('fr');
  });

  it('should default to english when no language route is found', () => {
    const expectedUrl = 'https://www.example.com';
    window.location.href = expectedUrl;
    setDefaultLanguage();
    expect(i18n.language).toEqual('en');
  });
});
