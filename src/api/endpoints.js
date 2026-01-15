import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '@/config/constants';

export const authAPI = {
  login: (credentials) => axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  verifyAccount: (data) => axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY, data),
  forgotPassword: (email) => axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASS, { email }),
  resetPassword: (data) => axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASS, data),
  changePassword: (data) => axiosInstance.post(API_ENDPOINTS.AUTH.CHANGE_PASS, data),
};

export const recipeAPI = {
  getAll: (params) => axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ALL, { params }),
  getOne: (id) => axiosInstance.get(API_ENDPOINTS.RECIPES.GET_ONE(id)),
  create: (data) => axiosInstance.post(API_ENDPOINTS.RECIPES.CREATE, data),
  update: (id, data) => axiosInstance.put(API_ENDPOINTS.RECIPES.UPDATE(id), data),
  delete: (id) => axiosInstance.delete(API_ENDPOINTS.RECIPES.DELETE(id)),
};

export const categoryAPI = {
  getAll: (params) => axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET_ALL, { params }),
  getOne: (id) => axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET_ONE(id)),
};

export const tagAPI = {
  getAll: (params) => axiosInstance.get(API_ENDPOINTS.TAGS.GET_ALL, { params }),
  getOne: (id) => axiosInstance.get(API_ENDPOINTS.TAGS.GET_ONE(id)),
};

export const userAPI = {
  getAll: (params) => axiosInstance.get(API_ENDPOINTS.USERS.GET_ALL, { params }),
  getOne: (id) => axiosInstance.get(API_ENDPOINTS.USERS.GET_ONE(id)),
  update: (id, data) => axiosInstance.put(API_ENDPOINTS.USERS.UPDATE(id), data),
};

export const favoriteAPI = {
  getAll: (params) => axiosInstance.get(API_ENDPOINTS.FAVORITES.GET_ALL, { params }),
  add: (data) => axiosInstance.post(API_ENDPOINTS.FAVORITES.ADD, data),
  delete: (id) => axiosInstance.delete(API_ENDPOINTS.FAVORITES.DELETE(id)),
};
