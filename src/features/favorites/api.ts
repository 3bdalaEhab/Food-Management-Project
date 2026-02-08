import { apiClient } from "@/lib/api-client";
import type {
    FavoritesResponse,
    AddFavoriteRequest,
    AddFavoriteResponse,
    FavoriteRecipe
} from "./types";

export const favoritesApi = {
    /**
     * Get all favorite recipes for the current user
     * GET /api/v1/userRecipe/
     */
    getFavorites: async (): Promise<FavoriteRecipe[]> => {
        const { data } = await apiClient.get<FavoritesResponse>("/userRecipe");
        return data.data || [];
    },

    /**
     * Add a recipe to favorites
     * POST /api/v1/userRecipe/
     */
    addFavorite: async (recipeId: number): Promise<AddFavoriteResponse> => {
        const { data } = await apiClient.post<AddFavoriteResponse>("/userRecipe", {
            recipeId
        } as AddFavoriteRequest);
        return data;
    },

    /**
     * Remove a recipe from favorites
     * DELETE /api/v1/userRecipe/{id}
     */
    removeFavorite: async (favoriteId: number): Promise<void> => {
        await apiClient.delete(`/userRecipe/${favoriteId}`);
    },
};
