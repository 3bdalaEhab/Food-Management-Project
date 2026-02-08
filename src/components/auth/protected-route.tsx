import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { Skeleton } from "@/components/ui";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    blockAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin, blockAdmin }: ProtectedRouteProps) {
    const location = useLocation();
    const { isAuthenticated, isLoading, user } = useAuthStore();

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
                <div className="space-y-4 w-full max-w-md p-8">
                    <Skeleton className="h-12 w-full" variant="rounded" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check admin requirement
    if (requireAdmin && user?.role !== "SuperAdmin") {
        return <Navigate to="/dashboard" replace />;
    }

    // Block admin from accessing this route
    if (blockAdmin && user?.role === "SuperAdmin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
