import axiosInstance from './apiClient';

export const photoService = {
  getAllPhotoDiscover: (page: number, limit: number = 10) =>
    axiosInstance.get(`/photos/discover?page=${page}&limit=${limit}`),
  getAllPhotoFeed: (page: number, limit: number = 10) =>
    axiosInstance.get(`/photos/feed?page=${page}&limit=${limit}`),
  getPhoto: (id: string) => axiosInstance.get(`/photos/${id}`),
  addPhoto: (data: FormData) => axiosInstance.post('/photos', data),
  editPhoto: (id: string, data: FormData) => axiosInstance.put(`/photos/${id}`, data),
  deletePhoto: (id: string) => axiosInstance.delete(`/photos/${id}`),
  likePhoto: (id: string) => axiosInstance.post(`/photos/${id}/like`),
  unlikePhoto: (id: string) => axiosInstance.delete(`/photos/${id}/like`),
};
