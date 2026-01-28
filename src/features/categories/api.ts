import { apiClient } from "@/lib/api-client";
import type {
    CategoriesResponse,
    Category,
    CreateCategoryData,
    UpdateCategoryData
} from "./types";

export const categoriesApi = {
    // Get all categories with pagination/filtering
    getCategories: async (params?: Record<string, any>) => {
        const { data } = await apiClient.get<CategoriesResponse>("/Category", { params });
        return data;
    },

    // Get a single category
    getCategory: async (id: number) => {
        const { data } = await apiClient.get<Category>(`/Category/${id}`);
        return data;
    },

    // Create a new category
    createCategory: async (categoryData: CreateCategoryData) => {
        const { data } = await apiClient.post<Category>("/Category", categoryData);
        return data;
    },

    // Update an existing category
    updateCategory: async ({ id, ...categoryData }: UpdateCategoryData) => {
        const { data } = await apiClient.put<Category>(`/Category/${id}`, categoryData);
        return data;
    },

    // Delete a category
    deleteCategory: async (id: number) => {
        await apiClient.delete(`/Category/${id}`);
    },
};
