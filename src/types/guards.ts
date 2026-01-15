import { User, Recipe, Category, ApiResponse, PaginatedResponse } from '../types';

export const isUser = (obj: any): obj is User => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'email' in obj &&
    'name' in obj
  );
};

export const isRecipe = (obj: any): obj is Recipe => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'ingredients' in obj &&
    Array.isArray(obj.ingredients)
  );
};

export const isCategory = (obj: any): obj is Category => {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'image' in obj
  );
};

export const isApiResponse = <T = any>(obj: any): obj is ApiResponse<T> => {
  return (
    obj &&
    typeof obj === 'object' &&
    'success' in obj &&
    'data' in obj &&
    'message' in obj
  );
};

export const isPaginatedResponse = <T = any>(
  obj: any
): obj is PaginatedResponse<T> => {
  return (
    isApiResponse(obj) &&
    'data' in obj &&
    'items' in obj.data &&
    'total' in obj.data &&
    'page' in obj.data
  );
};
