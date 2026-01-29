import { AxiosError } from 'axios';

/**
 * Custom API Error class for structured error handling
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errors?: Record<string, string[]>;
    public readonly isNetworkError: boolean;
    public readonly isTimeoutError: boolean;

    constructor(
        statusCode: number,
        message: string,
        errors?: Record<string, string[]>,
        isNetworkError = false,
        isTimeoutError = false
    ) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.errors = errors;
        this.isNetworkError = isNetworkError;
        this.isTimeoutError = isTimeoutError;

        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }

    /**
     * Check if error is a client error (4xx)
     */
    isClientError(): boolean {
        return this.statusCode >= 400 && this.statusCode < 500;
    }

    /**
     * Check if error is a server error (5xx)
     */
    isServerError(): boolean {
        return this.statusCode >= 500 && this.statusCode < 600;
    }

    /**
     * Check if error is an authentication error
     */
    isAuthError(): boolean {
        return this.statusCode === 401;
    }

    /**
     * Check if error is a forbidden error
     */
    isForbiddenError(): boolean {
        return this.statusCode === 403;
    }

    /**
     * Check if error is a not found error
     */
    isNotFoundError(): boolean {
        return this.statusCode === 404;
    }

    /**
     * Check if error is a rate limit error
     */
    isRateLimitError(): boolean {
        return this.statusCode === 429;
    }

    /**
     * Get first error message from validation errors
     */
    getFirstValidationError(): string | null {
        if (!this.errors) return null;
        const firstKey = Object.keys(this.errors)[0];
        if (firstKey && this.errors[firstKey]?.[0]) {
            return this.errors[firstKey][0];
        }
        return null;
    }
}

/**
 * Parse an unknown error into an ApiError
 */
export function parseApiError(error: unknown): ApiError {
    // Already an ApiError
    if (error instanceof ApiError) {
        return error;
    }

    // Axios error
    if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 0;
        const message = error.response?.data?.message || error.message || 'An error occurred';
        const errors = error.response?.data?.errors;
        const isNetworkError = error.code === 'ERR_NETWORK';
        const isTimeoutError = error.code === 'ECONNABORTED';

        return new ApiError(statusCode, message, errors, isNetworkError, isTimeoutError);
    }

    // Regular Error
    if (error instanceof Error) {
        return new ApiError(0, error.message);
    }

    // Unknown error type
    return new ApiError(0, 'An unknown error occurred');
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
    const apiError = parseApiError(error);

    if (apiError.isNetworkError) {
        return 'Unable to connect to the server. Please check your internet connection.';
    }

    if (apiError.isTimeoutError) {
        return 'The request took too long. Please try again.';
    }

    if (apiError.isRateLimitError()) {
        return 'Too many requests. Please wait a moment and try again.';
    }

    if (apiError.isServerError()) {
        return 'Server error. Please try again later.';
    }

    return apiError.message;
}
