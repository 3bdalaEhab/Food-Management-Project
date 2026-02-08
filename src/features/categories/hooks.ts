import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { categoriesApi } from "./api";
import type { CreateCategoryData, UpdateCategoryData } from "./types";

export const useCategories = (params?: Record<string, string | number | boolean | undefined>) => {
    return useQuery({
        queryKey: ["categories", params],
        queryFn: () => categoriesApi.getCategories(params),
        staleTime: 10 * 60 * 1000, // 10 minutes
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
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoriesApi.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success(t('toasts.category_created'));
        },
        onError: (error: Error) => {
            toast.error(error.message || t('toasts.operation_failed'));
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: UpdateCategoryData) => categoriesApi.updateCategory(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories", data.id] });
            toast.success(t('toasts.category_updated'));
        },
        onError: (error: Error) => {
            toast.error(error.message || t('toasts.operation_failed'));
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (id: number) => categoriesApi.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success(t('toasts.category_deleted'));
        },
        onError: (error: Error) => {
            toast.error(error.message || t('toasts.operation_failed'));
        },
    });
};
