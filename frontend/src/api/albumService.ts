import axiosInstance from './apiClient';

export const albumService = {
  getAllAlbum: (page: number, limit: number = 10) =>
    axiosInstance.get(`/albums?page=${page}&limit=${limit}`),
  getAlbum: (id: string) => axiosInstance.get(`/albums/${id}`),
  addAlbum: (data: FormData) => axiosInstance.post('/albums', data),
  editAlbum: (id: string, data: FormData) => axiosInstance.put(`/albums/${id}`, data),
  deleteAlbum: (id: string) => axiosInstance.delete(`/albums/${id}`),
};
