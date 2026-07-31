import axiosInstance from './apiClient';

export const albumService = {
  getAllAlbumDiscover: (page: number, limit: number = 10, searchQuery?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (searchQuery) params.append('q', searchQuery);

    return axiosInstance.get(`/albums/discover?${params.toString()}`);
  },

  getAllAlbumFeed: (page: number, limit: number = 10, searchQuery?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (searchQuery) params.append('q', searchQuery);

    return axiosInstance.get(`/albums/feed?${params.toString()}`);
  },
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
