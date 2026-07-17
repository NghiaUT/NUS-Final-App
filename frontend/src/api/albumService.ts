import axiosInstance from './apiClient';

export const albumService = {
  getAllAlbumDiscover: (page: number, limit: number = 10) =>
    axiosInstance.get(`/albums/discover?page=${page}&limit=${limit}`),
  getAllAlbumFeed: (page: number, limit: number = 10) =>
    axiosInstance.get(`/albums/feed?page=${page}&limit=${limit}`),
  getAlbum: (id: string, isAdmin: boolean = false) =>
    axiosInstance.get(`${isAdmin ? '/admin' : ''}/albums/${id}`),
  addAlbum: (data: FormData) => axiosInstance.post('/albums', data),
  editAlbum: (id: string, data: FormData, isAdmin: boolean = false) =>
    axiosInstance.put(`${isAdmin ? '/admin' : ''}/albums/${id}`, data),
  deleteAlbum: (id: string, isAdmin: boolean = false) =>
    axiosInstance.delete(`${isAdmin ? '/admin' : ''}/albums/${id}`),
  likeAlbum: (id: string) => axiosInstance.post(`/albums/${id}/like`),
  unlikeAlbum: (id: string) => axiosInstance.delete(`/albums/${id}/like`),
};
