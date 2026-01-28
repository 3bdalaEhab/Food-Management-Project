import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold
   transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]
   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
    {
        variants: {
            variant: {
                default:
                    "bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg focus-visible:ring-primary-500",
                secondary:
                    "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] focus-visible:ring-primary-500",
                outline:
                    "border-2 border-[var(--border)] bg-transparent hover:bg-[var(--muted)] focus-visible:ring-primary-500",
                ghost:
                    "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                destructive:
                    "bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg focus-visible:ring-red-500",
                success:
                    "bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg focus-visible:ring-green-500",
                link: "text-primary-500 underline-offset-4 hover:underline",
                gradient:
                    "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md hover:shadow-lg hover:opacity-90",
            },
            size: {
                xs: "h-7 px-2.5 text-xs rounded-lg",
                sm: "h-9 px-3.5 text-sm",
                default: "h-11 px-5",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg rounded-2xl",
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
                "icon-lg": "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            loading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : leftIcon ? (
                    leftIcon
                ) : null}
                {children}
                {!loading && rightIcon}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
