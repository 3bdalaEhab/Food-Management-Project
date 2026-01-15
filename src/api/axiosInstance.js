import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS, HTTP_STATUS } from '@/config/constants';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          window.location.href = '/Login';
          toast.error('Session expired. Please login again.');
          break;

        case HTTP_STATUS.FORBIDDEN:
          toast.error('You do not have permission to access this resource.');
          break;

        case HTTP_STATUS.NOT_FOUND:
          toast.error('Resource not found.');
          break;

        case HTTP_STATUS.CONFLICT:
          toast.error(data?.message || 'A conflict occurred. Please try again.');
          break;

        case HTTP_STATUS.BAD_REQUEST:
          toast.error(data?.message || 'Invalid request.');
          break;

        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          toast.error('Server error. Please try again later.');
          break;

        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          toast.error('Service temporarily unavailable. Please try again later.');
          break;

        default:
          toast.error(data?.message || 'An error occurred.');
      }
    } else if (error.request) {
      toast.error('No response from server. Please check your connection.');
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
