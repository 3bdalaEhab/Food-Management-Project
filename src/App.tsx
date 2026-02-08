import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
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
import { ErrorBoundary, SkipLink } from "@/components/shared";

// Lazy load pages for code splitting
const LoginPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.RegisterPage }))
);
const VerifyAccountPage = lazy(() =>
    import("@/features/auth").then((m) => ({ default: m.VerifyAccountPage }))
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
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#050505] p-8 overflow-hidden relative">
            <DashboardBackground />
            <div className="relative z-10 text-center space-y-12 max-w-2xl">
                <div className="relative">
                    <h1 className="text-6xl sm:text-8xl md:text-[12rem] lg:text-[15rem] font-black text-neutral-900 dark:text-white leading-none tracking-tighter opacity-10 italic">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] bg-primary-500 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.3)] sm:shadow-[0_0_100px_rgba(249,115,22,0.4)] rotate-12">
                            <Zap className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 text-white -rotate-12" />
                        </div>
                    </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter px-4 sm:px-8">
                        {t('not_found.protocol')} <span className="text-primary-500">{t('not_found.deviation')}</span> {t('not_found.detected')}
                    </h2>
                    <p className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-xs">
                        {t('not_found.message')}
                    </p>
                </div>
                <Link
                    to="/dashboard"
                    className="premium-button premium-button-primary px-12 h-16 inline-flex items-center justify-center group"
                >
                    <span className="font-black uppercase tracking-widest text-sm">{t('not_found.return')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

function App() {
    const { i18n } = useTranslation();
    const initialize = useAuthStore((state) => state.initialize);

    // Initialize auth state on mount
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Handle language direction and lang attribute
    useEffect(() => {
        const lang = i18n.language || 'ar';
        const dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
    }, [i18n.language]);

    return (
        <ErrorBoundary>
            <SkipLink />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Public Auth Routes */}
                            <Route element={<AuthLayout />}>
                                <Route path="/" element={<Navigate to="/login" replace />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/verify-account" element={<VerifyAccountPage />} />
                                <Route path="/verifyAccount" element={<Navigate to="/verify-account" replace />} />
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
                                <Route path="categories" element={
                                    <ProtectedRoute requireAdmin>
                                        <CategoriesPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="users" element={
                                    <ProtectedRoute requireAdmin>
                                        <UsersPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="favorites" element={
                                    <ProtectedRoute blockAdmin>
                                        <FavoritesPage />
                                    </ProtectedRoute>
                                } />
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
        </ErrorBoundary>
    );
}

export default App;
