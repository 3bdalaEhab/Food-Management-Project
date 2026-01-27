import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 1000 * 60 * 5,

            // Garbage collect after 10 minutes
            gcTime: 1000 * 60 * 10,

            // Retry failed requests once
            retry: 1,

            // Don't refetch on window focus (can be enabled per query)
            refetchOnWindowFocus: false,

            // Don't refetch on reconnect by default
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry mutations once on failure
            retry: 1,
        },
    },
});

// Query keys factory for type-safe keys
export const queryKeys = {
    // Auth
    auth: {
        all: ["auth"] as const,
        user: () => [...queryKeys.auth.all, "user"] as const,
    },

    // Recipes
    recipes: {
        all: ["recipes"] as const,
        lists: () => [...queryKeys.recipes.all, "list"] as const,
        list: (filters: Record<string, unknown>) => [...queryKeys.recipes.lists(), filters] as const,
        details: () => [...queryKeys.recipes.all, "detail"] as const,
        detail: (id: number | string) => [...queryKeys.recipes.details(), id] as const,
    },

    // Categories
    categories: {
        all: ["categories"] as const,
        lists: () => [...queryKeys.categories.all, "list"] as const,
        list: (filters: Record<string, unknown>) => [...queryKeys.categories.lists(), filters] as const,
        details: () => [...queryKeys.categories.all, "detail"] as const,
        detail: (id: number | string) => [...queryKeys.categories.details(), id] as const,
    },

    // Users
    users: {
        all: ["users"] as const,
        lists: () => [...queryKeys.users.all, "list"] as const,
        list: (filters: Record<string, unknown>) => [...queryKeys.users.lists(), filters] as const,
        details: () => [...queryKeys.users.all, "detail"] as const,
        detail: (id: number | string) => [...queryKeys.users.details(), id] as const,
    },

    // Favorites
    favorites: {
        all: ["favorites"] as const,
        lists: () => [...queryKeys.favorites.all, "list"] as const,
        list: () => [...queryKeys.favorites.lists()] as const,
    },

    // Tags
    tags: {
        all: ["tags"] as const,
        list: () => [...queryKeys.tags.all, "list"] as const,
    },
} as const;
