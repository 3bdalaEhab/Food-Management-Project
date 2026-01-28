export interface Category {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
}

export interface CategoriesResponse {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    data: Category[];
}

export interface CreateCategoryData {
    name: string;
}

export interface UpdateCategoryData {
    id: number;
    name: string;
}
