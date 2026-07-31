import axiosInstance from './apiClient';

export const photoService = {
  getAllPhotoDiscover: (page: number, limit: number = 10, searchQuery?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (searchQuery) params.append('q', searchQuery);

    return axiosInstance.get(`/photos/discover?${params.toString()}`);
  },

  getAllPhotoFeed: (page: number, limit: number = 10, searchQuery?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (searchQuery) params.append('q', searchQuery);

    return axiosInstance.get(`/photos/feed?${params.toString()}`);
  },
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
