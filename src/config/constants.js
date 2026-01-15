export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://upskilling-egypt.com:3006/api/v1',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/Users/Login',
    REGISTER: '/Users/Register',
    VERIFY: '/Users/VerifyAccount',
    FORGOT_PASS: '/Users/ResetPassword',
    RESET_PASS: '/Users/ResetPassword',
    CHANGE_PASS: '/Users/ChangePassword',
  },

  RECIPES: {
    GET_ALL: '/Recipe',
    GET_ONE: (id) => `/Recipe/${id}`,
    CREATE: '/Recipe',
    UPDATE: (id) => `/Recipe/${id}`,
    DELETE: (id) => `/Recipe/${id}`,
  },

  CATEGORIES: {
    GET_ALL: '/Category',
    GET_ONE: (id) => `/Category/${id}`,
  },

  TAGS: {
    GET_ALL: '/tag',
    GET_ONE: (id) => `/tag/${id}`,
  },

  USERS: {
    GET_ALL: '/User',
    GET_ONE: (id) => `/User/${id}`,
    UPDATE: (id) => `/User/${id}`,
  },

  FAVORITES: {
    GET_ALL: '/UserRecipe',
    ADD: '/UserRecipe',
    DELETE: (id) => `/UserRecipe/${id}`,
  },
};

export const STORAGE_KEYS = {
  TOKEN: import.meta.env.VITE_TOKEN_STORAGE_KEY || 'token',
  USER: `${import.meta.env.VITE_STORAGE_KEY_PREFIX || 'foodmgmt_'}user`,
  REFRESH_TOKEN: `${import.meta.env.VITE_STORAGE_KEY_PREFIX || 'foodmgmt_'}refresh_token`,
  LANGUAGE: `${import.meta.env.VITE_STORAGE_KEY_PREFIX || 'foodmgmt_'}language`,
};

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Food Management',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
};

export const FEATURE_FLAGS = {
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
};

export const TOAST_CONFIG = {
  DURATION: 2000,
  POSITION: 'top-right',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ROUTES = {
  PUBLIC: {
    LOGIN: '/',
    REGISTER: '/Register',
    FORGOT_PASS: '/ForgotPass',
    VERIFY_ACCOUNT: '/VerifyAccountUser',
    RESET_PASS: '/ResetPass',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    HOME: '/dashboard',
    RECIPES: '/dashboard/RecipesList',
    ADD_RECIPE: '/dashboard/AddAndUpdateRecipe/:id',
    CATEGORIES: '/dashboard/CategoriesList',
    FAVORITES: '/dashboard/FavoriteList',
    USERS: '/dashboard/UserList',
  },
};
