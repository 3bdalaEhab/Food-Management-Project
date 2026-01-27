import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
    `flex w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 
   placeholder:text-neutral-400 transition-all duration-200
   focus:outline-none focus:ring-2 focus:ring-offset-0
   disabled:cursor-not-allowed disabled:opacity-50
   dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500`,
    {
        variants: {
            variant: {
                default:
                    "border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-neutral-700 dark:focus:border-primary-400",
                error:
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500",
                success:
                    "border-green-500 focus:border-green-500 focus:ring-green-500/20 dark:border-green-500",
            },
            inputSize: {
                sm: "h-9 px-3 text-sm",
                default: "h-11 px-4",
                lg: "h-12 px-5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    success?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
            variant,
            inputSize,
            label,
            error,
            success,
            hint,
            leftIcon,
            rightIcon,
            showPasswordToggle,
            id,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const inputId = id || React.useId();

        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;

        const currentVariant = error ? "error" : success ? "success" : variant;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        id={inputId}
                        type={inputType}
                        className={cn(
                            inputVariants({ variant: currentVariant, inputSize }),
                            leftIcon && "pl-10",
                            (rightIcon || (isPassword && showPasswordToggle)) && "pr-10",
                            className
                        )}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
                        }
                        {...props}
                    />

                    {isPassword && showPasswordToggle ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    ) : rightIcon ? (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                            {rightIcon}
                        </div>
                    ) : null}
                </div>

                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="flex items-center gap-1 text-sm text-red-500"
                        role="alert"
                    >
                        <AlertCircle className="h-3.5 w-3.5" />
                        {error}
                    </p>
                )}

                {success && !error && (
                    <p className="flex items-center gap-1 text-sm text-green-500">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {success}
                    </p>
                )}

                {hint && !error && !success && (
                    <p
                        id={`${inputId}-hint`}
                        className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input, inputVariants };
