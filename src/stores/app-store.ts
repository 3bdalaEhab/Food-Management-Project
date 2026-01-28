import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import i18n from "i18next";

type Theme = "light" | "dark" | "system";
type Language = "en" | "ar";

interface AppState {
    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;

    // Language
    language: Language;
    setLanguage: (language: Language) => void;

    // Sidebar
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;

    // Mobile menu
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;

    // Favorites
    favorites: number[];
    toggleFavorite: (recipeId: number) => void;
    isFavorite: (recipeId: number) => boolean;
}

// Apply theme to document
function applyTheme(theme: Theme) {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
}

// Apply language direction
function applyLanguage(language: Language) {
    const root = window.document.documentElement;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.lang = language;
    i18n.changeLanguage(language);
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Theme
            theme: "system",
            setTheme: (theme: Theme) => {
                applyTheme(theme);
                set({ theme });
            },

            // Language
            language: "en",
            setLanguage: (language: Language) => {
                applyLanguage(language);
                set({ language });
            },

            // Sidebar
            sidebarCollapsed: false,
            toggleSidebar: () => {
                set({ sidebarCollapsed: !get().sidebarCollapsed });
            },
            setSidebarCollapsed: (collapsed: boolean) => {
                set({ sidebarCollapsed: collapsed });
            },

            // Mobile menu
            mobileMenuOpen: false,
            setMobileMenuOpen: (open: boolean) => {
                set({ mobileMenuOpen: open });
            },

            // Favorites
            favorites: [],
            toggleFavorite: (recipeId: number) => {
                const { favorites } = get();
                const isFav = favorites.includes(recipeId);
                if (isFav) {
                    set({ favorites: favorites.filter(id => id !== recipeId) });
                } else {
                    set({ favorites: [...favorites, recipeId] });
                }
            },
            isFavorite: (recipeId: number) => {
                return get().favorites.includes(recipeId);
            },
        }),
        {
            name: "app-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                theme: state.theme,
                language: state.language,
                sidebarCollapsed: state.sidebarCollapsed,
                favorites: state.favorites,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.theme);
                    applyLanguage(state.language);
                }
            },
        }
    )
);

// Listen for system theme changes
if (typeof window !== "undefined") {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const { theme } = useAppStore.getState();
        if (theme === "system") {
            applyTheme("system");
        }
    });
}
