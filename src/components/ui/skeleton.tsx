import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "circular" | "rounded";
    animation?: "pulse" | "shimmer" | "none";
}

export function Skeleton({
    className,
    variant = "default",
    animation = "shimmer",
    ...props
}: SkeletonProps) {
    return (
        <div
            className={cn(
                "bg-neutral-200 dark:bg-neutral-800",
                {
                    "rounded-md": variant === "default",
                    "rounded-full": variant === "circular",
                    "rounded-xl": variant === "rounded",
                },
                {
                    "animate-pulse": animation === "pulse",
                    skeleton: animation === "shimmer",
                },
                className
            )}
            {...props}
        />
    );
}

// Pre-built skeleton patterns
export function SkeletonCard() {
    return (
        <div className="space-y-4 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
            <Skeleton className="h-40 w-full" variant="rounded" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" variant="rounded" />
                <Skeleton className="h-8 w-20" variant="rounded" />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-12 w-full" variant="rounded" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" variant="rounded" />
            ))}
        </div>
    );
}

export function SkeletonProfile() {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12" variant="circular" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    );
}
