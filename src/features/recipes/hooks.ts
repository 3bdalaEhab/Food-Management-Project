import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recipesApi } from "./api";
import type { CreateRecipeData, UpdateRecipeData } from "./types";

export const useRecipes = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["recipes", params],
        queryFn: () => recipesApi.getRecipes(params),
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

    return useMutation({
        mutationFn: (data: CreateRecipeData) => recipesApi.createRecipe(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            toast.success("Recipe created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create recipe");
        },
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateRecipeData) => recipesApi.updateRecipe(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            queryClient.invalidateQueries({ queryKey: ["recipes", data.id] });
            toast.success("Recipe updated successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update recipe");
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => recipesApi.deleteRecipe(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
            toast.success("Recipe deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete recipe");
        },
    });
};

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: recipesApi.getTags,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: recipesApi.getCategories,
    });
};
