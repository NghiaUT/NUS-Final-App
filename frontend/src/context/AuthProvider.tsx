import React, { useEffect, useState, type ReactNode } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { setAuthHeader } from '../api/apiClient';
import { authService } from '../api/authService';
import type { User } from '../types/user.types';

const mock_login_data = {
  user: {
    id: 1,
    name: 'Nghia Tran',
    email: 'nghia@123.com',
    role: 'admin',
    avatar_url:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  accessToken: 'Bearer token sample',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(() => {
    return !localStorage.getItem('accessToken');
  });
  const navigate = useNavigate();

  // useEffect run only once when the app is mounted.
  // Access token được lưu trong axiosInstance.defaults.headers.common["Authorization"];
  const initAuth = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) return;

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
      setIsInitialized(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('accessToken', token);
    setAuthHeader(token);
    setUser(userData);
  };

  const logout = () => {
    alert('Log the user out!');
    localStorage.removeItem('accessToken');
    setUser(null);
    setAuthHeader(null);
    navigate("/");
  };

  if (!isInitialized) return <LoadingSpinner />;
  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated: !!user, user, logout, login }}>
      {isInitialized ? <div>Đang tải hệ thống...</div> : children}
    </AuthContext.Provider>
  );
};
