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

        // Maintains proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }

    /**
     * Alias for statusCode to match common patterns and tests
     */
    get status(): number {
        return this.statusCode;
    }

    /**
     * Alias for errors to match test expectations if needed
     */
    get validationErrors(): Record<string, string[]> | undefined {
        return this.errors;
    }

    // Static Factory Methods
    static networkError(message = 'Network error. Please check your connection.'): ApiError {
        return new ApiError(0, message, undefined, true, false);
    }

    static timeoutError(message = 'Request timed out. Please try again.'): ApiError {
        return new ApiError(0, message, undefined, false, true);
    }

    static unauthorized(message = 'Session expired. Please log in again.'): ApiError {
        return new ApiError(401, message);
    }

    static forbidden(message = 'Access forbidden'): ApiError {
        return new ApiError(403, message);
    }

    static notFound(message = 'Resource not found'): ApiError {
        return new ApiError(404, message);
    }

    static serverError(message = 'Internal Server Error'): ApiError {
        return new ApiError(500, message);
    }

    static rateLimitError(message = 'Too many requests'): ApiError {
        return new ApiError(429, message);
    }

    // Instance Methods
    isClientError(): boolean {
        return this.statusCode >= 400 && this.statusCode < 500;
    }

    isServerError(): boolean {
        return this.statusCode >= 500 && this.statusCode < 600;
    }

    isAuthError(): boolean {
        return this.statusCode === 401;
    }

    isForbiddenError(): boolean {
        return this.statusCode === 403;
    }

    isNotFoundError(): boolean {
        return this.statusCode === 404;
    }

    isRateLimitError(): boolean {
        return this.statusCode === 429;
    }

    /**
     * Check if the error is retryable (Network, Timeout, 429, 5xx)
     */
    isRetryable(): boolean {
        return (
            this.isNetworkError ||
            this.isTimeoutError ||
            this.isRateLimitError() ||
            this.isServerError()
        );
    }

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
    if (error instanceof ApiError) {
        return error;
    }

    // Handle Axios Error (using duck typing for flexibility with mocks)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && (error instanceof AxiosError || (error as any).isAxiosError)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axiosError = error as any;
        const statusCode = axiosError.response?.status || 0;
        const message = axiosError.response?.data?.message || axiosError.message || 'An error occurred';
        const errors = axiosError.response?.data?.errors;
        const isNetworkError = axiosError.code === 'ERR_NETWORK';
        const isTimeoutError = axiosError.code === 'ECONNABORTED';

        return new ApiError(statusCode, message, errors, isNetworkError, isTimeoutError);
    }

    if (error instanceof Error) {
        return new ApiError(0, error.message);
    }

    if (typeof error === 'string') {
        return new ApiError(0, error);
    }

    return new ApiError(0, 'An unexpected error occurred');
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
export function getErrorMessage(error: unknown, defaultMessage = 'An unexpected error occurred'): string {
    if (typeof error === 'string') return error;

    const apiError = parseApiError(error);

    // If it was a generic error that got parsed into "An unexpected error occurred", 
    // and we have a custom defaultMessage, use that instead.
    if (apiError.message === 'An unexpected error occurred' && defaultMessage !== 'An unexpected error occurred') {
        return defaultMessage;
    }

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
