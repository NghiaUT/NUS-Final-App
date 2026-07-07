import axiosInstance from './apiClient';

export const photoService = {
  getPhoto: (id: string) => axiosInstance.get(`/photo/${id}`),
  addPhoto: (data: FormData) => axiosInstance.post('/photo', data),
  editPhoto: (id: string, data: FormData) => axiosInstance.put(`/photo/${id}`, data),
  deletePhoto: (id: string) => axiosInstance.delete(`/photo/${id}`),
};
