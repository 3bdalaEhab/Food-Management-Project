import { apiClient } from "@/lib/api-client";
import type {
    RecipesResponse,
    Recipe,
    Tag,
    CreateRecipeData,
    UpdateRecipeData
} from "./types";
import type { RecipeQueryParams } from "./hooks";

export const recipesApi = {
    // Get all recipes with pagination and filtering
    getRecipes: async (params?: RecipeQueryParams) => {
        const { data } = await apiClient.get<RecipesResponse>("/Recipe", { params });
        return data;
    },

    // Get a single recipe
    getRecipe: async (id: number) => {
        const { data } = await apiClient.get<Recipe>(`/Recipe/${id}`);
        return data;
    },

    // Create a new recipe
    createRecipe: async (recipeData: CreateRecipeData) => {
        const formData = new FormData();
        formData.append("name", recipeData.name);
        formData.append("description", recipeData.description);
        formData.append("price", recipeData.price);
        formData.append("tagId", String(recipeData.tagId));


        if (recipeData.recipeImage) {
            formData.append("recipeImage", recipeData.recipeImage);
        }

        const { data } = await apiClient.post<Recipe>("/Recipe", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    },

    // Update an existing recipe
    updateRecipe: async ({ id, ...recipeData }: UpdateRecipeData) => {
        const formData = new FormData();
        if (recipeData.name) formData.append("name", recipeData.name);
        if (recipeData.description) formData.append("description", recipeData.description);
        if (recipeData.price) formData.append("price", recipeData.price);
        if (recipeData.tagId) formData.append("tagId", String(recipeData.tagId));


        if (recipeData.recipeImage) {
            formData.append("recipeImage", recipeData.recipeImage);
        }

        const { data } = await apiClient.put<Recipe>(`/Recipe/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    },

    // Delete a recipe
    deleteRecipe: async (id: number) => {
        await apiClient.delete(`/Recipe/${id}`);
    },

    // Get all tags
    getTags: async () => {
        const { data } = await apiClient.get<Tag[]>("/tag");
        return data;
    },

};
