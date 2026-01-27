import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores";
import { Toaster } from "@/components/ui";
import { ProtectedRoute } from "@/components/auth";
import { DashboardLayout } from "@/components/layout";

// Lazy load pages for code splitting
const LoginPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.ResetPasswordPage }))
);
const DashboardPage = lazy(() =>
    import("@/features/dashboard").then((m) => ({ default: m.DashboardPage }))
);
const RecipesPage = lazy(() =>
    import("@/features/recipes").then((m) => ({ default: m.RecipesPage }))
);

// Loading fallback
function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="space-y-4 w-full max-w-md p-8">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 animate-pulse" />
                </div>
                <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
                <div className="h-8 w-3/4 mx-auto bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                <div className="h-8 w-1/2 mx-auto bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}

function CategoriesPage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <p className="text-neutral-500">Coming soon...</p>
        </div>
    );
}

function UsersPage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <p className="text-neutral-500">Coming soon...</p>
        </div>
    );
}

function FavoritesPage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Favorites</h1>
            <p className="text-neutral-500">Coming soon...</p>
        </div>
    );
}

function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary-500">404</h1>
                <p className="text-2xl font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                    Page Not Found
                </p>
                <p className="text-neutral-500 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
}

function App() {
    const initialize = useAuthStore((state) => state.initialize);

    // Initialize auth state on mount
    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Public Auth Routes */}
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />

                        {/* Protected Dashboard Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<DashboardPage />} />
                            <Route path="recipes" element={<RecipesPage />} />
                            <Route path="categories" element={<CategoriesPage />} />
                            <Route path="users" element={<UsersPage />} />
                            <Route path="favorites" element={<FavoritesPage />} />
                        </Route>

                        {/* 404 */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>

            {/* Toast Notifications */}
            <Toaster />

            {/* React Query Devtools (only in development) */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
