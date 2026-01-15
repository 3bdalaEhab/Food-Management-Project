import { STORAGE_KEYS, HTTP_STATUS } from '@/config/constants';
import { logger } from '@/utils/logger';
import toast from 'react-hot-toast';

export const requestInterceptor = (config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (token) {
    config.headers.Authorization = token;
  }

  logger.debug('API Request:', {
    method: config.method,
    url: config.url,
    headers: config.headers,
  });

  return config;
};

export const responseInterceptor = (response) => {
  logger.debug('API Response:', {
    status: response.status,
    data: response.data,
  });

  return response;
};

export const errorInterceptor = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    logger.error('API Error:', {
      status,
      message: data?.message,
      url: error.config?.url,
    });

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
    logger.error('Network Error:', 'No response from server');
    toast.error('No response from server. Please check your connection.');
  } else {
    logger.error('Error:', error.message);
    toast.error('An error occurred. Please try again.');
  }

  return Promise.reject(error);
};
