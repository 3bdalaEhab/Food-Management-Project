import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default:
                    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
                primary:
                    "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300",
                secondary:
                    "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300",
                success:
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                warning:
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                error:
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
                info:
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                outline:
                    "border border-neutral-300 bg-transparent text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
            },
            size: {
                sm: "px-2 py-0.5 text-[10px]",
                default: "px-2.5 py-0.5 text-xs",
                lg: "px-3 py-1 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, size, dot, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(badgeVariants({ variant, size, className }))}
                {...props}
            >
                {dot && (
                    <span
                        className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            variant === "success" && "bg-green-500",
                            variant === "warning" && "bg-amber-500",
                            variant === "error" && "bg-red-500",
                            variant === "info" && "bg-blue-500",
                            variant === "primary" && "bg-primary-500",
                            (!variant || variant === "default") && "bg-neutral-500"
                        )}
                    />
                )}
                {children}
            </span>
        );
    }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
