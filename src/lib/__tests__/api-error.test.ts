import { describe, it, expect } from 'vitest';
import { ApiError, parseApiError, isApiError, getErrorMessage } from '../api-error';

describe('ApiError', () => {
    describe('constructor', () => {
        it('should create an ApiError with status and message', () => {
            const error = new ApiError(404, 'Not Found');
            expect(error.status).toBe(404);
            expect(error.message).toBe('Not Found');
            expect(error.name).toBe('ApiError');
        });

        it('should create an ApiError with validation errors', () => {
            const validationErrors = { email: ['Invalid email'], password: ['Too short'] };
            const error = new ApiError(400, 'Validation failed', validationErrors);
            expect(error.status).toBe(400);
            expect(error.validationErrors).toEqual(validationErrors);
        });

        it('should create a network error', () => {
            const error = new ApiError(0, 'Network Error', undefined, true);
            expect(error.isNetworkError).toBe(true);
            expect(error.status).toBe(0);
        });

        it('should create a timeout error', () => {
            const error = new ApiError(0, 'Request Timeout', undefined, false, true);
            expect(error.isTimeoutError).toBe(true);
        });
    });

    describe('static methods', () => {
        it('should create a network error using static method', () => {
            const error = ApiError.networkError();
            expect(error.isNetworkError).toBe(true);
            expect(error.message).toBe('Network error. Please check your connection.');
        });

        it('should create a network error with custom message', () => {
            const error = ApiError.networkError('Custom network error');
            expect(error.message).toBe('Custom network error');
        });

        it('should create a timeout error using static method', () => {
            const error = ApiError.timeoutError();
            expect(error.isTimeoutError).toBe(true);
            expect(error.message).toBe('Request timed out. Please try again.');
        });

        it('should create an unauthorized error', () => {
            const error = ApiError.unauthorized();
            expect(error.status).toBe(401);
            expect(error.message).toBe('Session expired. Please log in again.');
        });

        it('should create a forbidden error', () => {
            const error = ApiError.forbidden();
            expect(error.status).toBe(403);
        });

        it('should create a not found error', () => {
            const error = ApiError.notFound();
            expect(error.status).toBe(404);
        });

        it('should create a server error', () => {
            const error = ApiError.serverError();
            expect(error.status).toBe(500);
        });

        it('should create a rate limit error', () => {
            const error = ApiError.rateLimitError();
            expect(error.status).toBe(429);
        });
    });

    describe('isRetryable', () => {
        it('should return true for network errors', () => {
            const error = ApiError.networkError();
            expect(error.isRetryable()).toBe(true);
        });

        it('should return true for timeout errors', () => {
            const error = ApiError.timeoutError();
            expect(error.isRetryable()).toBe(true);
        });

        it('should return true for 429 rate limit errors', () => {
            const error = ApiError.rateLimitError();
            expect(error.isRetryable()).toBe(true);
        });

        it('should return true for 5xx server errors', () => {
            const error = new ApiError(502, 'Bad Gateway');
            expect(error.isRetryable()).toBe(true);
        });

        it('should return false for 4xx client errors (except 429)', () => {
            const error = new ApiError(400, 'Bad Request');
            expect(error.isRetryable()).toBe(false);
        });
    });
});

describe('parseApiError', () => {
    it('should return self if already ApiError', () => {
        const original = new ApiError(400, 'Test');
        const parsed = parseApiError(original);
        expect(parsed).toBe(original);
    });

    it('should parse Axios error with response', () => {
        const axiosError = {
            isAxiosError: true,
            response: {
                status: 422,
                data: { message: 'Validation failed' }
            }
        };
        const parsed = parseApiError(axiosError);
        expect(parsed.status).toBe(422);
        expect(parsed.message).toBe('Validation failed');
    });

    it('should parse Axios network error (ERR_NETWORK)', () => {
        const axiosError = {
            isAxiosError: true,
            code: 'ERR_NETWORK',
            message: 'Network Error'
        };
        const parsed = parseApiError(axiosError);
        expect(parsed.isNetworkError).toBe(true);
    });

    it('should parse Axios timeout error (ECONNABORTED)', () => {
        const axiosError = {
            isAxiosError: true,
            code: 'ECONNABORTED',
            message: 'timeout of 30000ms exceeded'
        };
        const parsed = parseApiError(axiosError);
        expect(parsed.isTimeoutError).toBe(true);
    });

    it('should handle standard Error objects', () => {
        const error = new Error('Something went wrong');
        const parsed = parseApiError(error);
        expect(parsed.status).toBe(0);
        expect(parsed.message).toBe('Something went wrong');
    });

    it('should handle string errors', () => {
        const parsed = parseApiError('Simple error');
        expect(parsed.message).toBe('Simple error');
    });

    it('should handle unknown error types', () => {
        const parsed = parseApiError({ foo: 'bar' });
        expect(parsed.message).toBe('An unexpected error occurred');
    });
});

describe('isApiError', () => {
    it('should return true for ApiError instances', () => {
        const error = new ApiError(400, 'Test');
        expect(isApiError(error)).toBe(true);
    });

    it('should return false for regular Error', () => {
        const error = new Error('Test');
        expect(isApiError(error)).toBe(false);
    });

    it('should return false for non-errors', () => {
        expect(isApiError('string')).toBe(false);
        expect(isApiError(null)).toBe(false);
        expect(isApiError(undefined)).toBe(false);
    });
});

describe('getErrorMessage', () => {
    it('should return message from ApiError', () => {
        const error = new ApiError(400, 'Custom API message');
        expect(getErrorMessage(error)).toBe('Custom API message');
    });

    it('should return message from regular Error', () => {
        const error = new Error('Regular error message');
        expect(getErrorMessage(error)).toBe('Regular error message');
    });

    it('should return string as-is', () => {
        expect(getErrorMessage('String error')).toBe('String error');
    });

    it('should return default message for unknown types', () => {
        expect(getErrorMessage(null)).toBe('An unexpected error occurred');
        expect(getErrorMessage(undefined)).toBe('An unexpected error occurred');
        expect(getErrorMessage(123)).toBe('An unexpected error occurred');
    });

    it('should use custom default message', () => {
        expect(getErrorMessage(null, 'Custom default')).toBe('Custom default');
    });
});
