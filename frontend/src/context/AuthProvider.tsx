import React, { useEffect, useState, type ReactNode } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { AuthContext } from './AuthContext';
import { setAuthHeader } from '../api/apiClient';
import { authService } from '../api/authService';
import type { User } from '../types/user.types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(() => {
    return !localStorage.getItem('accessToken');
  });

  // useEffect run only once when the app is mounted.
  // Access token được lưu trong axiosInstance.defaults.headers.common["Authorization"];
  const initAuth = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setIsInitialized(true);
      return;
    }

    try {
      setAuthHeader(token);
      // Gọi api để check thông tin bản thân.
      const result = await authService.me();
      setUser(result.data.data);
    } catch (error) {
      console.error("Lỗi xác thực đầu vào: " + error);
      setAuthHeader(null);
      setUser(null);
    } finally {
      // Dù xác thực lỗi hay ổn đều phải set về lại.
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('accessToken', token);
    setAuthHeader(token);
    setUser(userData);
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setAuthHeader(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated: !!user, isAdmin: user?.role === "ADMIN", user, logout, login }}>
      {isInitialized ? children : <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
