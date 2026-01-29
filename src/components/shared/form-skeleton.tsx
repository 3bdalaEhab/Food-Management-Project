import { cn } from "@/lib/utils";

interface FormSkeletonProps {
    fields?: number;
    showTitle?: boolean;
    className?: string;
}

/**
 * Skeleton loading component for forms
 */
export function FormSkeleton({
    fields = 4,
    showTitle = true,
    className,
}: FormSkeletonProps) {
    return (
        <div className={cn("w-full max-w-md space-y-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/20", className)}>
            {/* Title Skeleton */}
            {showTitle && (
                <div className="space-y-2 mb-8 text-center">
                    <div className="h-8 w-48 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse" />
                    <div className="h-4 w-64 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse opacity-60" />
                </div>
            )}

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: fields }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        {/* Label */}
                        <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                        {/* Input */}
                        <div
                            className="h-12 w-full bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse"
                            style={{ animationDelay: `${i * 100}ms` }}
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button Skeleton */}
            <div className="pt-4">
                <div className="h-12 w-full bg-neutral-300 dark:bg-neutral-600 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}
