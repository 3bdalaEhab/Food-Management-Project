import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth-store";
import { parseApiError } from "./api-error";

// API Base URL - using proxy in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Extended config type for retry tracking
interface AxiosConfigWithRetry extends InternalAxiosRequestConfig {
    __retryCount?: number;
}

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 seconds
});

// Utility function to delay execution
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(parseApiError(error));
    }
);

// Response interceptor - Handle errors globally with retry logic
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as AxiosConfigWithRetry | undefined;

        // Handle 401 Unauthorized - Logout user (but not if already on login page)
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            useAuthStore.getState().logout();

            // Only redirect to login if not already on login or auth pages
            const currentPath = window.location.pathname;
            const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-account'].some(
                path => currentPath.startsWith(path)
            );

            if (!isAuthPage) {
                window.location.href = "/login";
            }

            return Promise.reject(parseApiError(error));
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error("Access forbidden");
            return Promise.reject(parseApiError(error));
        }

        // Handle 429 Rate Limit - Retry with exponential backoff
        if (error.response?.status === 429 && config) {
            const retryCount = config.__retryCount || 0;

            if (retryCount < MAX_RETRIES) {
                config.__retryCount = retryCount + 1;

                // Get retry-after header or use exponential backoff
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter
                    ? parseInt(retryAfter as string) * 1000
                    : RETRY_DELAY * Math.pow(2, retryCount);

                console.warn(`Rate limited. Retrying in ${waitTime}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);

                await delay(waitTime);
                return apiClient(config);
            }
        }

        // Handle 5xx Server Errors - Retry with backoff
        if (error.response && error.response.status >= 500 && config) {
            const retryCount = config.__retryCount || 0;

            if (retryCount < MAX_RETRIES) {
                config.__retryCount = retryCount + 1;
                const waitTime = RETRY_DELAY * Math.pow(2, retryCount);

                console.warn(`Server error. Retrying in ${waitTime}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);

                await delay(waitTime);
                return apiClient(config);
            }

            console.error("Server error occurred after max retries");
        }

        // Handle network errors - Retry
        if (!error.response && error.code === 'ERR_NETWORK' && config) {
            const retryCount = config.__retryCount || 0;

            if (retryCount < MAX_RETRIES) {
                config.__retryCount = retryCount + 1;
                const waitTime = RETRY_DELAY * Math.pow(2, retryCount);

                console.warn(`Network error. Retrying in ${waitTime}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);

                await delay(waitTime);
                return apiClient(config);
            }
        }

        return Promise.reject(parseApiError(error));
    }
);

// Re-export error utilities for convenience
export { ApiError, parseApiError, getErrorMessage, isApiError } from "./api-error";

export default apiClient;
