import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  cookTime: number;
  servings: number;
  userId: number;
  createdAt: Date;
}

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

interface ErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string>;
}

interface PaginatedResponse<T> extends ApiResponse {
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterPayload) => Promise<void>;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

interface ValidationSchema {
  [key: string]: (value: any) => string | true;
}

export type {
  User,
  Recipe,
  Category,
  ApiResponse,
  ErrorResponse,
  PaginatedResponse,
  AuthContextType,
  RegisterPayload,
  LoginPayload,
  TokenPayload,
  ValidationSchema,
};
