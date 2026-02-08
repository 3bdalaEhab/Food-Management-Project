import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { favoritesApi } from "./api";
import type { FavoriteRecipe } from "./types";

// Query key for favorites
export const FAVORITES_KEY = ["favorites"] as const;

/**
 * Hook to fetch all favorite recipes
 */
export function useFavorites() {
    return useQuery({
        queryKey: FAVORITES_KEY,
        queryFn: favoritesApi.getFavorites,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Hook to add a recipe to favorites
 */
export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favoritesApi.addFavorite,
        onMutate: async (recipeId) => {
            // Cancel outgoing queries
            await queryClient.cancelQueries({ queryKey: FAVORITES_KEY });

            // Get current favorites
            const previousFavorites = queryClient.getQueryData<FavoriteRecipe[]>(FAVORITES_KEY);

            // Optimistically update
            queryClient.setQueryData<FavoriteRecipe[]>(FAVORITES_KEY, (old = []) => [
                ...old,
                { id: Date.now(), recipe: { id: recipeId } } as FavoriteRecipe
            ]);

            return { previousFavorites };
        },
        onError: (error, _recipeId, context) => {
            // Rollback on error
            if (context?.previousFavorites) {
                queryClient.setQueryData(FAVORITES_KEY, context.previousFavorites);
            }
            const message = error instanceof Error ? error.message : "Failed to add favorite";
            toast.error(message);
        },
        onSuccess: () => {
            toast.success("Added to favorites!");
        },
        onSettled: () => {
            // Refetch to sync with server
            queryClient.invalidateQueries({ queryKey: FAVORITES_KEY });
        },
    });
}

/**
 * Hook to remove a recipe from favorites
 */
export function useRemoveFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favoritesApi.removeFavorite,
        onMutate: async (favoriteId) => {
            await queryClient.cancelQueries({ queryKey: FAVORITES_KEY });

            const previousFavorites = queryClient.getQueryData<FavoriteRecipe[]>(FAVORITES_KEY);

            queryClient.setQueryData<FavoriteRecipe[]>(FAVORITES_KEY, (old = []) =>
                old.filter((fav) => fav.id !== favoriteId)
            );

            return { previousFavorites };
        },
        onError: (error, _favoriteId, context) => {
            if (context?.previousFavorites) {
                queryClient.setQueryData(FAVORITES_KEY, context.previousFavorites);
            }
            const message = error instanceof Error ? error.message : "Failed to remove favorite";
            toast.error(message);
        },
        onSuccess: () => {
            toast.success("Removed from favorites!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: FAVORITES_KEY });
        },
    });
}

/**
 * Helper hook to check if a recipe is in favorites and get its favorite ID
 */
export function useFavoriteStatus(recipeId: number) {
    const { data: favorites = [] } = useFavorites();

    const favorite = favorites.find((fav) => fav.recipe?.id === recipeId);

    return {
        isFavorite: !!favorite,
        favoriteId: favorite?.id,
    };
}
