import { cn } from "@/lib/utils";

interface CardSkeletonProps {
    showImage?: boolean;
    showActions?: boolean;
    className?: string;
}

/**
 * Skeleton loading component for cards
 */
export function CardSkeleton({
    showImage = true,
    showActions = true,
    className,
}: CardSkeletonProps) {
    return (
        <div className={cn(
            "bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden",
            className
        )}>
            {/* Image Skeleton */}
            {showImage && (
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            )}

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                    <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" style={{ animationDelay: '100ms' }} />
                    <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-3">
                    <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>

                {/* Actions */}
                {showActions && (
                    <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="h-9 w-9 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse" style={{ animationDelay: '500ms' }} />
                        <div className="h-9 w-9 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse" style={{ animationDelay: '600ms' }} />
                        <div className="h-9 flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse" style={{ animationDelay: '700ms' }} />
                    </div>
                )}
            </div>
        </div>
    );
}

interface CardGridSkeletonProps {
    cards?: number;
    columns?: 2 | 3 | 4;
    showImage?: boolean;
    className?: string;
}

/**
 * Grid of card skeletons for loading states
 */
export function CardGridSkeleton({
    cards = 6,
    columns = 3,
    showImage = true,
    className,
}: CardGridSkeletonProps) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <div className={cn("grid gap-6", gridCols[columns], className)}>
            {Array.from({ length: cards }).map((_, i) => (
                <CardSkeleton key={i} showImage={showImage} />
            ))}
        </div>
    );
}
