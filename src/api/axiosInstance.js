import axios from 'axios';
import { API_CONFIG } from '@/config/constants';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptors';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
