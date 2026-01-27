export interface Category {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
}

export interface Tag {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    price: number;
    imagePath: string;
    tag: Tag;
    category: Category[];
    creationDate: string;
    modificationDate: string;
}

export interface RecipeDetails extends Recipe {
    // Add more details if needed for a single recipe view
}

export interface RecipesResponse {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    data: Recipe[];
}

export interface CreateRecipeData {
    name: string;
    description: string;
    price: string;
    tagId: number;
    categoriesIds: number[];
    recipeImage: File | null;
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
    id: number;
}
