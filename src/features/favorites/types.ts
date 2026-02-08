import type { Recipe } from "../recipes/types";

// Favorite Recipe from API
export interface FavoriteRecipe {
    id: number;
    recipe: Recipe;
}

// Response for getting favorites
export interface FavoritesResponse {
    data: FavoriteRecipe[];
}

// Request to add favorite
export interface AddFavoriteRequest {
    recipeId: number;
}

// Response from add favorite
export interface AddFavoriteResponse {
    id: number;
    recipeId: number;
}
