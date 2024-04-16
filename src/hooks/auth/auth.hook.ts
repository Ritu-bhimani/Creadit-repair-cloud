import Cookies from 'js-cookie';

import { AuthHook, UserDetails } from './types';

const AUTH_COOKIE = '__CRC.auth.token';
const BEARER = 'Bearer';

export const useAuth = (): AuthHook => {
  const getToken = () => {
    const token: string | undefined = Cookies.get(AUTH_COOKIE);
    if (token) {
      return `${BEARER} ${token}`;
    }
    return token;
  };

  const setToken = (value: any) => {
    const options = {
      path: '/',
      secure: true
    };
    Cookies.set(AUTH_COOKIE, value, options);
  };

  const removeToken = () => {
    Cookies.remove(AUTH_COOKIE, { path: '/' });
  };

  const getUserDetails = (): UserDetails => {
    const token = getToken();
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedData = JSON.parse(window.atob(base64));
      return decodedData as UserDetails;
    }
    return {} as UserDetails;
  };

  const isAuthenticated = (): boolean => {
    if (getToken()) {
      return true;
    }
    return false;
  };

  return {
    getToken,
    setToken,
    removeToken,
    isAuthenticated,
    getUserDetails
  };
};
