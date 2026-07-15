import axiosInstance from './apiClient';

export const userService = {
  getFollowers: (id: string, page: number, limit: number = 10) =>
    axiosInstance.get(`/users/${id}/followers?page=${page}&limit=${limit}`),
  getFollowings: (id: string, page: number, limit: number = 10) =>
    axiosInstance.get(`/users/${id}/followings?page=${page}&limit=${limit}`),
  getUserPhotos: (id: string, page: number, limit: number = 10) =>
    axiosInstance.get(`/users/${id}/photos?page=${page}&limit=${limit}`),
  getUserAlbums: (id: string, page: number, limit: number = 10) =>
    axiosInstance.get(`/users/${id}/albums?page=${page}&limit=${limit}`),
  getStats: (id: string) => axiosInstance.get(`/users/${id}/stats`),
  editProfile: (id: string, body: FormData) => axiosInstance.put(`/users/${id}/profile`, body),
};
