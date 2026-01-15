import { STORAGE_KEYS } from '@/config/constants';
import { jwtDecode } from 'jwt-decode';

export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  isTokenValid: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      return Date.now() < expirationTime;
    } catch (error) {
      return false;
    }
  },

  decodeToken: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },

  getUserId: () => {
    const decoded = tokenManager.decodeToken();
    return decoded?.userId || decoded?.sub || null;
  },
};
