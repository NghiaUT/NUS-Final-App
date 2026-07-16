import axiosInstance from './apiClient';

export const albumService = {
  getAllAlbumDiscover: (page: number, limit: number = 10) =>
    axiosInstance.get(`/albums/discover?page=${page}&limit=${limit}`),
  getAllAlbumFeed: (page: number, limit: number = 10) =>
    axiosInstance.get(`/albums/feed?page=${page}&limit=${limit}`),
  getAlbum: (id: string) => axiosInstance.get(`/albums/${id}`),
  addAlbum: (data: FormData) => axiosInstance.post('/albums', data),
  editAlbum: (id: string, data: FormData) => axiosInstance.put(`/albums/${id}`, data),
  deleteAlbum: (id: string) => axiosInstance.delete(`/albums/${id}`),
};
