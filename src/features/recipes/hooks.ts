import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { recipesApi } from "./api";
import type { CreateRecipeData, UpdateRecipeData } from "./types";
import { getErrorMessage } from "@/lib/api-error";

// Type for recipe query params
export interface RecipeQueryParams {
    pageSize?: number;
    pageNumber?: number;
    name?: string;
    tagId?: number;
    categoryId?: number;
}

export const useRecipes = (params?: RecipeQueryParams) => {
    return useQuery({
        queryKey: ["recipes", params],
        queryFn: () => recipesApi.getRecipes(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useRecipe = (id: number) => {
    return useQuery({
        queryKey: ["recipes", id],
        queryFn: () => recipesApi.getRecipe(id),
        enabled: !!id,
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: CreateRecipeData) => recipesApi.createRecipe(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            toast.success(t('toasts.recipe_created'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: UpdateRecipeData) => recipesApi.updateRecipe(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            queryClient.invalidateQueries({ queryKey: ["recipes", data.id] });
            toast.success(t('toasts.recipe_updated'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (id: number) => recipesApi.deleteRecipe(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            toast.success(t('toasts.recipe_deleted'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: recipesApi.getTags,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
    });
};


