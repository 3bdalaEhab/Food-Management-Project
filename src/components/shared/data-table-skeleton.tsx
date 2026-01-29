import { cn } from "@/lib/utils";

interface DataTableSkeletonProps {
    rows?: number;
    columns?: number;
    showHeader?: boolean;
    className?: string;
}

/**
 * Skeleton loading component for data tables
 */
export function DataTableSkeleton({
    rows = 5,
    columns = 4,
    showHeader = true,
    className,
}: DataTableSkeletonProps) {
    return (
        <div className={cn("w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800", className)}>
            {/* Table Header Skeleton */}
            {showHeader && (
                <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
                    <div className="flex items-center gap-4">
                        {Array.from({ length: columns }).map((_, i) => (
                            <div
                                key={i}
                                className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
                                style={{ width: `${Math.random() * 60 + 60}px` }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Table Rows Skeleton */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="px-6 py-4 flex items-center gap-4">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
                                style={{
                                    width: colIndex === 0 ? '40%' : `${Math.random() * 80 + 40}px`,
                                    animationDelay: `${rowIndex * 100 + colIndex * 50}ms`
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
