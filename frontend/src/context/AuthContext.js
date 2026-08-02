import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';
const TOKEN_KEY = 'dogaai_token';
const USER_KEY  = 'dogaai_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  });
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  // Attach token to every request
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const persist = useCallback((tok, usr) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem(TOKEN_KEY, tok);
    localStorage.setItem(USER_KEY, JSON.stringify(usr));
  }, []);

  const register = useCallback(async (username, email, password, full_name = '') => {
    setLoading(true); setError('');
    try {
      const { data } = await axios.post(`${API}/auth/register`, { username, email, password, full_name });
      persist(data.token, data.user);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || 'Kayıt başarısız');
      return false;
    } finally {
      setLoading(false);
    }
  }, [persist]);

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('');
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      persist(data.token, data.user);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || 'Giriş başarısız');
      return false;
    } finally {
      setLoading(false);
    }
  }, [persist]);

  const logout = useCallback(() => {
    setToken(null); setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, register, login, logout, clearError, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
