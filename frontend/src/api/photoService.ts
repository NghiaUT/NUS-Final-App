import axiosInstance from './apiClient';

export const photoService = {
  getAllPhoto: (page: number, limit: number = 10) =>
    axiosInstance.get(`/photos?page=${page}&limit=${limit}`),
  getPhoto: (id: string) => axiosInstance.get(`/photos/${id}`),
  addPhoto: (data: FormData) => axiosInstance.post('/photos', data),
  editPhoto: (id: string, data: FormData) => axiosInstance.put(`/photos/${id}`, data),
  deletePhoto: (id: string) => axiosInstance.delete(`/photos/${id}`),
};
