import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersApi } from "./api";
import type { UpdateUserData } from "./types";

export const useUsers = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => usersApi.getUsers(params),
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
        onError: (error: any) => {
            toast.error(error.message || "Failed to update user");
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
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete user");
        },
    });
};
