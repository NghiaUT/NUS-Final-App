import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import type { ApiResponse } from '../types/api.types';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 2. Định nghĩa cấu trúc cho các item trong hàng đợi
interface FailedQueueItem {
  resolve: (value: string | null) => void;
  reject: (reason?: Error | null) => void;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 10000, //10s
});

// ============= GẮn tokne bearer vào trong header của instance.
export const setAuthHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// ============== Cơ chế chống việc nhiều API được gửi đi cùng xin một tài nguyên.
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (err: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (err) reject(err);
    else resolve(token);
  });
  failedQueue = [];
};

// =============== Interceptor cho response:
axiosInstance.interceptors.response.use(
  (response) => response,

  async (err: AxiosError<ApiResponse<string>>) => {
    // Lưu giữ các giá trị của request để phục vụ sau này
    const originalRequest = err.config as CustomAxiosRequestConfig;
    const status = err.response?.status;
    const isRefresHUrl = originalRequest.url?.includes('/auth/refresh-token');

    // Xử lý khi chính API Refresh Token bị lỗi: -> Refresh Token hết hạn theo chuẩn là 400 Bad Request.

    if (isRefresHUrl) {
      setAuthHeader(null);
      localStorage.removeItem('accessToken');

      if ((status === 400 || status === 403) && window.location.pathname !== '/login') {
        const message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại để tiếp tục';

        toast.error(message, {
          onClose: () => {
            window.location.href = '/login';
          },
          toastId: 'session-expired', // tránh spam nhiều toast giống nhau
          autoClose: false, // để user tự quyết định thời điểm, không tự biến mất
        });
      }
      return Promise.reject(err);
    }

    // Access Token hết hạn -> thử chạy code refresh.
    if (status === 401 && err.response?.data.errCode === 'JWT_EXPIRED' && !originalRequest._retry) {
      // Nếu API xin access token đang được chạy, đẩy các API sau vào trong hàng đợi xử lý.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      //   Gắn Access token mới vào instance:
      try {
        const { data } = await axiosInstance.post<{ data: { accessToken: string } }>(
          '/auth/refresh-token',
        );
        const newAccessToken = data.data.accessToken;

        setAuthHeader(newAccessToken);
        processQueue(null, newAccessToken);

        // GẮn cho request gốc:
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error: unknown) {
        if (error instanceof Error) {
          processQueue(error, null);
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
