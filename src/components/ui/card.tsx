import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
    "rounded-2xl transition-all duration-300",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--sidebar-background)] border border-[var(--border)]",
                elevated:
                    "bg-[var(--sidebar-background)] border border-[var(--border)] shadow-lg hover:shadow-xl",
                glass:
                    "bg-[var(--sidebar-background)]/70 backdrop-blur-xl border border-[var(--border)]",
                gradient:
                    "bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20",
                outline:
                    "border-2 border-[var(--border)] bg-transparent",
                ghost: "bg-transparent",
            },
            padding: {
                none: "p-0",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
            hover: {
                none: "",
                lift: "hover:-translate-y-1 hover:shadow-xl",
                glow: "hover:shadow-primary",
                scale: "hover:scale-[1.02]",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
            hover: "none",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, hover, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, padding, hover, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight text-[var(--foreground)]",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-[var(--muted-foreground)]", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
