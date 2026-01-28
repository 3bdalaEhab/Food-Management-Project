import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Zap, ArrowRight } from "lucide-react";

import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores";
import { Toaster } from "@/components/ui";
import { ProtectedRoute } from "@/components/auth";
import { DashboardLayout } from "@/components/layout";
import { DashboardBackground } from "@/components/layout/dashboard-background";
import { AuthLayout } from "@/features/auth/components/auth-layout";

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
const ProfilePage = lazy(() =>
    import("@/features/users").then((m) => ({ default: m.ProfilePage }))
);
const RecipesPage = lazy(() =>
    import("@/features/recipes").then((m) => ({ default: m.RecipesPage }))
);
const CategoriesPage = lazy(() =>
    import("@/features/categories").then((m) => ({ default: m.CategoriesPage }))
);
const UsersPage = lazy(() =>
    import("@/features/users").then((m) => ({ default: m.UsersPage }))
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

const FavoritesPage = lazy(() =>
    import("@/features/recipes").then((m) => ({ default: m.FavoritesPage }))
);

function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#050505] p-8 overflow-hidden relative">
            <DashboardBackground />
            <div className="relative z-10 text-center space-y-12 max-w-2xl">
                <div className="relative">
                    <h1 className="text-[15rem] font-black text-neutral-900 dark:text-white leading-none tracking-tighter opacity-10 italic">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-[3rem] bg-primary-500 flex items-center justify-center shadow-[0_0_100px_rgba(249,115,22,0.4)] rotate-12">
                            <Zap size={80} className="text-white -rotate-12" />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter px-8">
                        Protocol <span className="text-primary-500">Deviation</span> Detected
                    </h2>
                    <p className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-xs">
                        The requested node does not exist in the current culinary neural network.
                    </p>
                </div>
                <Link
                    to="/dashboard"
                    className="premium-button premium-button-primary px-12 h-16 inline-flex items-center justify-center group"
                >
                    <span className="font-black uppercase tracking-widest text-sm">Return to Core</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
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
                        <Route element={<AuthLayout />}>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                        </Route>

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
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="settings" element={<Navigate to="profile" replace />} />
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
