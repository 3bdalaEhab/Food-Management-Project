import { apiClient } from "@/lib/api-client";
import type {
    UsersResponse,
    User,
    UpdateUserData,
    ChangePasswordData,
    UpdateProfileData,
    CreateUserData
} from "./types";
import type { UserQueryParams } from "./hooks";

export const usersApi = {
    // Get all users with pagination/filtering
    getUsers: async (params?: UserQueryParams) => {
        const { data } = await apiClient.get<UsersResponse>("/Users", { params });
        return data;
    },

    // Get current logged-in user
    getCurrentUser: async () => {
        const { data } = await apiClient.get<User>("/Users/currentUser");
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

    // Update current user's profile
    updateProfile: async (profileData: UpdateProfileData) => {
        const formData = new FormData();
        formData.append("userName", profileData.userName);
        formData.append("email", profileData.email);
        formData.append("country", profileData.country);
        formData.append("phoneNumber", profileData.phoneNumber);

        if (profileData.profileImage) {
            formData.append("profileImage", profileData.profileImage);
        }

        const { data } = await apiClient.put<User>("/Users", formData);
        return data;
    },

    // Change password
    changePassword: async (passwordData: ChangePasswordData) => {
        const { data } = await apiClient.put<{ message: string }>("/Users/ChangePassword", passwordData);
        return data;
    },

    // Create a new user (Admin only)
    createUser: async (userData: CreateUserData) => {
        const { data } = await apiClient.post<User>("/Users/Create", userData);
        return data;
    },

    // Delete a user
    deleteUser: async (id: number) => {
        await apiClient.delete(`/Users/${id}`);
    },
};
