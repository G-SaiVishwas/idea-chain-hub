import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../services/apiClient.js';

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = 'ideachain_token';

const normalizeUser = (rawUser) => {
  if (!rawUser) return null;
  const { _id, id, password, ...rest } = rawUser;
  return { id: id || _id, ...rest };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
  const { data } = await apiClient.get('/users/profile');
  setUser(normalizeUser(data.user));
      } catch (error) {
        console.error('Failed to load profile', error);
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }, [token]);

  const login = useCallback(({ user: userData, token: authToken }) => {
    setUser(normalizeUser(userData));
    setToken(authToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      logout
    }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
