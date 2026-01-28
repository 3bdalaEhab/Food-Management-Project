import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriesApi } from "./api";
import type { CreateCategoryData, UpdateCategoryData } from "./types";

export const useCategories = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["categories", params],
        queryFn: () => categoriesApi.getCategories(params),
    });
};

export const useCategory = (id: number) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => categoriesApi.getCategory(id),
        enabled: !!id,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoriesApi.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create category");
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCategoryData) => categoriesApi.updateCategory(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories", data.id] });
            toast.success("Category updated successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update category");
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => categoriesApi.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete category");
        },
    });
};
