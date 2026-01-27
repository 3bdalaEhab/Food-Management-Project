import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth-store";

// API Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://upskilling-egypt.com:3006/api/v1";

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 seconds
});

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
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle 401 Unauthorized - Logout user
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error("Access forbidden");
        }

        // Handle 500 Server Error
        if (error.response?.status === 500) {
            console.error("Server error occurred");
        }

        return Promise.reject(error);
    }
);

// API Error type
export interface ApiError {
    message: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

// Parse API error
export function parseApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message || error.message || "An error occurred",
            statusCode: error.response?.status,
            errors: error.response?.data?.errors,
        };
    }

    if (error instanceof Error) {
        return { message: error.message };
    }

    return { message: "An unknown error occurred" };
}

export default apiClient;
