import { apiClient } from "@/lib/api-client";
import type {
    UsersResponse,
    User,
    UpdateUserData
} from "./types";
import type { UserQueryParams } from "./hooks";

export const usersApi = {
    // Get all users with pagination/filtering
    getUsers: async (params?: UserQueryParams) => {
        const { data } = await apiClient.get<UsersResponse>("/Users", { params });
        return data;
    },

    // Get a single user
    getUser: async (id: number) => {
        const { data } = await apiClient.get<User>(`/Users/${id}`);
        return data;
    },

    // Update user details (Admin)
    updateUser: async ({ id, ...userData }: UpdateUserData) => {
        const { data } = await apiClient.put<User>(`/Users/${id}`, userData);
        return data;
    },

    // Delete a user
    deleteUser: async (id: number) => {
        await apiClient.delete(`/Users/${id}`);
    },
};
