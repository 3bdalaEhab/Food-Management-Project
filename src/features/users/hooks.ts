import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { usersApi } from "./api";
import { useAuthStore } from "@/stores";
import type { UpdateUserData, ChangePasswordData, UpdateProfileData, CreateUserData } from "./types";
import { getErrorMessage } from "@/lib/api-error";

// Type for user query params
export interface UserQueryParams {
    pageSize?: number;
    pageNumber?: number;
    userName?: string;
    email?: string;
    country?: string;
    groups?: number[];
}

export const useUsers = (params?: UserQueryParams) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => usersApi.getUsers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUser = (id: number) => {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => usersApi.getUser(id),
        enabled: !!id,
    });
};

// Get current logged-in user
// Get current logged-in user
export const useCurrentUser = () => {
    const token = localStorage.getItem("token");


    const query = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => usersApi.getCurrentUser(),
        staleTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!token,
    });

    return query;
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: UpdateUserData) => usersApi.updateUser(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users", data.id] });
            toast.success(t('toasts.user_updated'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

// Update current user's profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (data: UpdateProfileData) => usersApi.updateProfile(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["users"] });

            // Sync with auth store to update UI immediately
            setUser({
                id: String(data.id),
                userName: data.userName,
                email: data.email,
                role: data.group.name as "SuperAdmin" | "SystemUser",
                country: data.country,
                phoneNumber: data.phoneNumber,
                imagePath: data.imagePath
            });

            toast.success(t('toasts.profile_updated'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

// Change password
export const useChangePassword = () => {
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (data: ChangePasswordData) => usersApi.changePassword(data),
        onSuccess: () => {
            toast.success(t('toasts.password_changed'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (id: number) => usersApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success(t('toasts.user_deleted'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (data: CreateUserData) => usersApi.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success(t('toasts.user_created'));
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};
