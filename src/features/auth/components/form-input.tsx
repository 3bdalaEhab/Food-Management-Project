import { LucideIcon, Eye, EyeOff } from 'lucide-react';
import { UseFormRegister, RegisterOptions, FieldError } from 'react-hook-form';

interface FormInputProps {
    label: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    validation?: RegisterOptions;
    error?: FieldError;
    icon?: LucideIcon;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number';
    placeholder?: string;
    disabled?: boolean;
    rightElement?: React.ReactNode;
}

/**
 * Reusable form input component with consistent styling
 */
export function FormInput({
    label,
    name,
    register,
    validation,
    error,
    icon: Icon,
    type = 'text',
    placeholder,
    disabled = false,
    rightElement,
}: FormInputProps) {
    return (
        <div className="space-y-1">
            <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                )}
                <input
                    {...register(name, validation)}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl 
                        ${Icon ? 'pl-9' : 'pl-3'} ${rightElement ? 'pr-10' : 'pr-3'}
                        text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 
                        focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 
                        transition-all outline-none disabled:opacity-50
                    `}
                />
                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-[9px] text-red-500 font-semibold ml-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}

interface PasswordInputProps extends Omit<FormInputProps, 'type' | 'rightElement'> {
    showPassword: boolean;
    onTogglePassword: () => void;
}

/**
 * Password input with show/hide toggle
 */
export function PasswordInput({
    showPassword,
    onTogglePassword,
    icon,
    ...props
}: PasswordInputProps) {

    return (
        <FormInput
            {...props}
            icon={icon}
            type={showPassword ? 'text' : 'password'}
            rightElement={
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="text-[var(--muted-foreground)]/50 hover:text-primary-500 transition-colors"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            }
        />
    );
}
