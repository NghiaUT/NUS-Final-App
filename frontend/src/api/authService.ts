import type { LoginForm, RegisterForm } from '../types/forms.types';
import type { User } from '../types/user.types';
import axiosInstance from './apiClient';

export const authService = {
  login: (data: LoginForm) => axiosInstance.post('/auth/login', data),
  register: (data: RegisterForm) => axiosInstance.post('/auth/register', data),
  refreshToken: () => axiosInstance.post('/auth/refresh-token'),
  forgotPassword: (email: string) => axiosInstance.post('/auth/forgot-password', { email }),
  me: () => axiosInstance.get<{ data: User }>('/auth/me'),
};
