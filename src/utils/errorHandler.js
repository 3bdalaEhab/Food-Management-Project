import toast from 'react-hot-toast';
import { logger } from './logger';

const ERROR_MESSAGES = {
  // 4xx Client Errors
  400: 'Invalid request. Please check your input.',
  401: 'Unauthorized. Please log in again.',
  403: 'Forbidden. You do not have permission.',
  404: 'Resource not found.',
  409: 'Conflict. This resource already exists.',
  422: 'Validation error. Please check your data.',

  // 5xx Server Errors
  500: 'Server error. Please try again later.',
  502: 'Bad gateway. Please try again later.',
  503: 'Service unavailable. Please try again later.',
  504: 'Gateway timeout. Please try again later.',

  // Network Errors
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',

  // Generic
  UNKNOWN: 'An unexpected error occurred.',
};

export const handleError = (error, showToast = true) => {
  let errorMessage = ERROR_MESSAGES.UNKNOWN;
  let statusCode = null;

  logger.error('Error caught:', {
    name: error.name,
    message: error.message,
    status: error.statusCode || error.response?.status,
    data: error.data || error.response?.data,
  });

  if (error.response) {
    // HTTP Error (status code outside 2xx range)
    statusCode = error.response.status;
    errorMessage =
      error.response.data?.message || ERROR_MESSAGES[statusCode] || errorMessage;

    // Handle specific status codes
    if (statusCode === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (statusCode === 403) {
      window.location.href = '/unauthorized';
    }
  } else if (error.request) {
    // Request made but no response received
    errorMessage = ERROR_MESSAGES.NETWORK;
  } else if (error.code === 'ECONNABORTED') {
    // Timeout
    errorMessage = ERROR_MESSAGES.TIMEOUT;
  } else if (error.message) {
    errorMessage = error.message;
  }

  if (showToast) {
    toast.error(errorMessage, {
      position: 'top-right',
      duration: 4000,
    });
  }

  return {
    message: errorMessage,
    statusCode,
    error,
  };
};

export const handleSuccess = (message, duration = 3000) => {
  toast.success(message, {
    position: 'top-right',
    duration,
  });
};

export const handleInfo = (message, duration = 3000) => {
  toast((t) => (
    <div>
      <span>{message}</span>
    </div>
  ), {
    position: 'top-right',
    duration,
  });
};

export const formatErrorResponse = (error) => {
  return {
    success: false,
    message: error.message || ERROR_MESSAGES.UNKNOWN,
    statusCode: error.statusCode || null,
    timestamp: new Date().toISOString(),
  };
};
