import { useState, useCallback } from 'react';
import { authAPI } from '@/api/endpoints';
import { STORAGE_KEYS } from '@/config/constants';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
      setToken(newToken);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setToken(null);
  }, []);

  return {
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };
};
