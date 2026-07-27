import axiosInstance from './apiClient';

export const adminService = {
  getAllUsers: (page: number, limit: number) =>
    axiosInstance.get(`/admin/users?page=${page}&limit=${limit}`),
  getUser: (userId: string) => axiosInstance.get(`/admin/users/${userId}`),
  updateUser: (userId: string, data: FormData) =>
    axiosInstance.put(`/admin/users/${userId}/profile`, data),
  deleteUser: (userId: string) => axiosInstance.delete(`/admin/users/${userId}`),

  getAllPhotos: (page: number, limit: number) =>
    axiosInstance.get(`/admin/photos?page=${page}&limit=${limit}`),
  getAllAlbums: (page: number, limit: number) =>
    axiosInstance.get(`/admin/albums?page=${page}&limit=${limit}`),
};
