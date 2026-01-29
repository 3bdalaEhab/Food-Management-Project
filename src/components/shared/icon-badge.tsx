import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
    icon: LucideIcon;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "success" | "danger" | "warning" | "neutral";
    className?: string;
}

const sizeClasses = {
    sm: "w-12 h-12 rounded-xl",
    md: "w-16 h-16 rounded-2xl",
    lg: "w-20 h-20 rounded-2xl",
    xl: "w-24 h-24 rounded-3xl",
};

const iconSizes = {
    sm: 20,
    md: 32,
    lg: 40,
    xl: 48,
};

const variantClasses = {
    primary: "bg-primary-500/10 border-primary-500/30 text-primary-500",
    success: "bg-green-500/10 border-green-500/30 text-green-500",
    danger: "bg-red-500/10 border-red-500/30 text-red-500",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
    neutral: "bg-[var(--background)]/10 border-[var(--border)] text-[var(--foreground)]",
};

/**
 * IconBadge - Reusable icon container with consistent styling
 * Used for decorative icons in cards, dialogs, and sections
 */
export function IconBadge({
    icon: Icon,
    size = "md",
    variant = "primary",
    className,
}: IconBadgeProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center border shadow-xl",
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            <Icon size={iconSizes[size]} />
        </div>
    );
}
