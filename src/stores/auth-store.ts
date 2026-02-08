import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

// JWT Payload type
interface JwtPayload {
    userId: string;
    userName: string;
    userEmail: string;
    userGroup: "SuperAdmin" | "SystemUser";
    exp: number;
    iat: number;
}

// User type
export interface User {
    id: string;
    userName: string;
    email: string;
    role: "SuperAdmin" | "SystemUser";
    country?: string;
    phoneNumber?: string;
    imagePath?: string | null;
}

// Auth state type
interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    initialize: () => void;
}

// Decode token and extract user info
function decodeToken(token: string): User | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
            return null;
        }

        return {
            id: decoded.userId,
            userName: decoded.userName,
            email: decoded.userEmail,
            role: decoded.userGroup,
        };
    } catch {
        return null;
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: true,

            setToken: (token: string) => {
                const decodedUser = decodeToken(token);

                if (decodedUser) {
                    localStorage.setItem("token", token);
                    const existingUser = get().user;
                    // Merge if it's the same user to preserve imagePath etc.
                    const user = (existingUser && existingUser.id === decodedUser.id)
                        ? { ...existingUser, ...decodedUser }
                        : decodedUser;

                    set({
                        token,
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    get().logout();
                }
            },

            setUser: (user: User) => {
                set({ user });
            },

            logout: () => {
                localStorage.removeItem("token");
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            initialize: () => {
                const token = localStorage.getItem("token");

                if (token) {
                    const decodedUser = decodeToken(token);

                    if (decodedUser) {
                        const existingUser = get().user;
                        const user = (existingUser && existingUser.id === decodedUser.id)
                            ? { ...existingUser, ...decodedUser }
                            : decodedUser;

                        set({
                            token,
                            user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    } else {
                        get().logout();
                    }
                } else {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);

// Selectors
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsAdmin = (state: AuthState) => state.user?.role === "SuperAdmin";
