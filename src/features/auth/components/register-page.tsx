import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChefHat,
    Sparkles,
    User,
    Mail,
    Globe,
    Phone,
    Lock,
    Loader2,
    ArrowRight,
    Eye,
    EyeOff
} from "lucide-react";

import { AuthBackground } from './auth-background';
import { FloatingAuthControls } from './floating-auth-controls';
import { ProfileImageUpload } from './profile-image-upload';
import { SEO } from '@/components/shared/seo';
import { compressImage } from '@/lib/image-utils';
import { useRegister } from '../hooks';

interface RegisterFormData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage?: FileList;
}

// Validation patterns
const VALIDATION = {
    userName: {
        required: "Username is required",
        pattern: { value: /^[a-zA-Z]+[a-zA-Z0-9]{2,}/, message: "Min 3 chars, start with letter" }
    },
    email: {
        required: "Email is required",
        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
    },
    country: { required: "Country is required" },
    phoneNumber: {
        required: "Phone is required",
        pattern: { value: /^01[0125][0-9]{8}$/, message: "Invalid Egyptian number" }
    },
    password: {
        required: "Password is required",
        validate: (value: string) => {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^]).{6,}/.test(value)) {
                return "6+ chars, upper, lower, number, special";
            }
            return true;
        }
    }
};

export function RegisterPage() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { register: formRegister, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>();
    const password = watch("password", "");

    const handleImageSelect = async (file: File) => {
        const processedFile = file.size > 500 * 1024
            ? await compressImage(file)
            : file;
        setSelectedImage(processedFile);
    };

    // Use the centralized register hook
    const { mutate: submitRegister, isPending: isRegistering } = useRegister();

    const onSubmit = (data: RegisterFormData) => {
        submitRegister({
            userName: data.userName,
            email: data.email,
            country: data.country,
            phoneNumber: data.phoneNumber,
            password: data.password,
            confirmPassword: data.confirmPassword,
            profileImage: selectedImage
        });
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">
            <SEO title={t('auth.register.title')} description={t('auth.register.subtitle')} />
            <AuthBackground />
            <FloatingAuthControls />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 w-full max-w-[480px] sm:max-w-[520px] md:max-w-[580px]"
            >
                {/* Main Card */}
                <div className="relative bg-[var(--sidebar-background)]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden">
                    {/* Top Gradient Bar */}
                    <div className="h-1 sm:h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-400" />

                    <div className="p-5 sm:p-7 md:p-9">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/30 rotate-3"
                            >
                                <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </motion.div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                {t('auth.register.title')} <span className="text-primary-500">{t('auth.register.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-[10px] sm:text-xs mt-1.5 flex items-center justify-center gap-1.5">
                                <Sparkles size={12} className="text-primary-500" />
                                {t('auth.register.subtitle')}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Grid - 2 columns on tablet+, 1 column on mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* Username */}
                                <FormField
                                    label={t('auth.register.identity_name')}
                                    icon={User}
                                    placeholder="chefmaster"
                                    register={formRegister}
                                    name="userName"
                                    validation={VALIDATION.userName}
                                    error={errors.userName}
                                    disabled={isRegistering}
                                />

                                {/* Email */}
                                <FormField
                                    label={t('auth.register.universal_email')}
                                    icon={Mail}
                                    type="email"
                                    placeholder="you@example.com"
                                    register={formRegister}
                                    name="email"
                                    validation={VALIDATION.email}
                                    error={errors.email}
                                    disabled={isRegistering}
                                />

                                {/* Country */}
                                <FormField
                                    label={t('auth.register.geographical_domain')}
                                    icon={Globe}
                                    placeholder="Egypt"
                                    register={formRegister}
                                    name="country"
                                    validation={VALIDATION.country}
                                    error={errors.country}
                                    disabled={isRegistering}
                                />

                                {/* Phone */}
                                <FormField
                                    label={t('auth.register.phone')}
                                    icon={Phone}
                                    placeholder="01xxxxxxxxx"
                                    register={formRegister}
                                    name="phoneNumber"
                                    validation={VALIDATION.phoneNumber}
                                    error={errors.phoneNumber}
                                    disabled={isRegistering}
                                />

                                {/* Password */}
                                <PasswordField
                                    label={t('auth.register.password')}
                                    icon={Lock}
                                    placeholder="••••••••"
                                    register={formRegister}
                                    name="password"
                                    validation={VALIDATION.password}
                                    error={errors.password}
                                    disabled={isRegistering}
                                    showPassword={showPassword}
                                    onToggle={() => setShowPassword(!showPassword)}
                                />

                                {/* Confirm Password */}
                                <PasswordField
                                    label={t('auth.register.confirm_password')}
                                    icon={Lock}
                                    placeholder="••••••••"
                                    register={formRegister}
                                    name="confirmPassword"
                                    validation={{
                                        required: "Confirm password",
                                        validate: (value: string) => value === password || "Passwords don't match"
                                    }}
                                    error={errors.confirmPassword}
                                    disabled={isRegistering}
                                    showPassword={showConfirmPassword}
                                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>

                            {/* Profile Image */}
                            <ProfileImageUpload
                                register={formRegister}
                                setValue={setValue}
                                disabled={isRegistering}
                                onImageSelect={handleImageSelect}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isRegistering}
                                className="w-full h-12 sm:h-14 mt-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                {isRegistering ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>{t('auth.register.secure_identity')}...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        <span className="uppercase tracking-widest">{t('auth.register.initialize_agent')}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-5 sm:mt-6 pt-5 border-t border-[var(--border)] text-center">
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                                {t('auth.register.already_authenticated')}{' '}
                                <Link to="/login" className="text-primary-500 font-bold hover:text-primary-600 transition-colors">
                                    {t('auth.register.initiate_access')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Helper Components
interface FormFieldProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validation?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    disabled?: boolean;
    type?: string;
}

function FormField({ label, icon: Icon, placeholder, register, name, validation, error, disabled, type = "text" }: FormFieldProps) {
    const inputId = `register-${name}`;
    const errorId = `register-${name}-error`;

    return (
        <div className="space-y-1">
            <label
                htmlFor={inputId}
                className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ms-1"
            >
                {label}
            </label>
            <div className="relative group">
                <Icon className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors z-10 pointer-events-none" aria-hidden="true" />
                <input
                    {...register(name, validation)}
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl ps-9 pe-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                />
            </div>
            {error && <p id={errorId} role="alert" className="text-[9px] text-red-500 font-semibold ms-1">{error.message}</p>}
        </div>
    );
}

interface PasswordFieldProps extends FormFieldProps {
    showPassword: boolean;
    onToggle: () => void;
}

function PasswordField({ label, icon: Icon, placeholder, register, name, validation, error, disabled, showPassword, onToggle }: PasswordFieldProps) {
    const inputId = `register-${name}`;
    const errorId = `register-${name}-error`;

    return (
        <div className="space-y-1">
            <label
                htmlFor={inputId}
                className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ms-1"
            >
                {label}
            </label>
            <div className="relative group">
                <Icon className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors z-10 pointer-events-none" aria-hidden="true" />
                <input
                    {...register(name, validation)}
                    id={inputId}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl ps-9 pe-10 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                />
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 hover:text-primary-500 transition-colors z-10"
                >
                    {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
            </div>
            {error && <p id={errorId} role="alert" className="text-[9px] text-red-500 font-semibold ms-1">{error.message}</p>}
        </div>
    );
}
