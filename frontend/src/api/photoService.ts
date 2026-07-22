import axiosInstance from './apiClient';

export const photoService = {
  getAllPhotoDiscover: (page: number, limit: number = 10) =>
    axiosInstance.get(`/photos/discover?page=${page}&limit=${limit}`),
  getAllPhotoFeed: (page: number, limit: number = 10) =>
    axiosInstance.get(`/photos/feed?page=${page}&limit=${limit}`),
  getPhoto: (id: string, isAdmin: boolean = false) =>
    axiosInstance.get(`${isAdmin ? '/admin' : ''}/photos/${id}`),
  addPhoto: (data: FormData) => axiosInstance.post('/photos', data),
  editPhoto: (id: string, data: FormData, isAdmin: boolean = false) =>
    axiosInstance.put(`${isAdmin ? '/admin' : ''}/photos/${id}`, data),
  deletePhoto: (id: string, isAdmin: boolean = false) =>
    axiosInstance.delete(`${isAdmin ? '/admin' : ''}/photos/${id}`),
  likePhoto: (id: string) => axiosInstance.post(`/photos/${id}/like`),
  unlikePhoto: (id: string) => axiosInstance.delete(`/photos/${id}/like`),
};
