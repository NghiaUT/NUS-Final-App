import React, { useEffect, useState } from 'react';
import MediaTabbar from '../../components/auth/MediaTabbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { loginSchema } from '../../utils/validators';
import { twMerge } from 'tailwind-merge';
import z from 'zod';
import axios from 'axios';
import type { ApiResponse } from '../../types/api.types';

type ErrorsValue = {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location?.state?.error) {
      toast.error(location.state.error);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== 'email' && name !== 'password') return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the field's error as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Validate against the zod schema
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);
      const nextErrors: ErrorsValue = {};
      Object.entries(fieldErrors.properties ?? {}).forEach(([key, value]) => {
        const error = value.errors.flatMap((err) => err).join(',');
        if (key === 'email') { nextErrors.email = error }
        else {
          nextErrors.password = error;
        }
      });
      setErrors(nextErrors);
      toast.error('Vui lòng kiểm tra lại thông tin đã nhập!');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const { data } = await authService.login(result.data);
      toast.success('Đăng nhập thành công!');
      login(data.data.accessToken, data.data.user);
    } catch (error: unknown) {
      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại!";

      if (axios.isAxiosError<ApiResponse<string>>(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }

      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClasses = (fieldName: 'password' | 'email', position: string) => {
    return twMerge(
      'appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm',
      position === 'top' ? 'rounded-t-md' : 'rounded-b-md',
      errors[fieldName]
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    );
  };

  return (
    <div className="relative sm:top-10 md:top-12 mx-auto w-full sm:w-[400px] flex items-center flex-col flex-start">
      <h1 className="text-blue text-5xl text-center font-semibold m-10">Fotobook Login</h1>
      <MediaTabbar></MediaTabbar>
      <div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full px-4 sm:px-0 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="mb-8">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3 0 .82-.33 1.56-.86 2.1l-6.24-6.24A2.98 2.98 0 0112 5zm-4.7 2.3A2.99 2.99 0 007 10c0 1.66 1.34 3 3 3 .82 0 1.56-.33 2.1-.86l6.24 6.24c-.6.44-1.34.72-2.14.72-2.14 0-4-1.79-4-4 0-.32.05-.63.14-.92L7.3 9.3z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                  <path d="M4.27 3L3 4.27l16.73 16.73L21 19.73 4.27 3z" />
                </svg>
              </div>
            </div>

            <form className="w-full space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="">
                <div>
                  <label className="sr-only">Email</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoFocus
                    className={fieldClasses('email', 'top')}
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={fieldClasses('password', 'bottom')}
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang đăng nhập...' : 'Login'}
                </button>
              </div>

              <div className="text-center mt-4 cursor-pointer">
                <a onClick={() => navigate('/forgot-password')} className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373]">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>

          <div className="text-center">
            <a
              onClick={() => navigate('/signup')}
              className="text-sm font-medium text-[#3b5998] hover:text-[#2d4373] cursor-pointer"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;