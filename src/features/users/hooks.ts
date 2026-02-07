import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersApi } from "./api";
import type { UpdateUserData } from "./types";
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

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserData) => usersApi.updateUser(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users", data.id] });
            toast.success("User updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => usersApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully from management hub");
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error));
        },
    });
};
