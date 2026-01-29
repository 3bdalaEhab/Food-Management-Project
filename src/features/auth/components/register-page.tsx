import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
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
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>();
    const password = watch("password", "");

    const handleImageSelect = async (file: File) => {
        const processedFile = file.size > 500 * 1024
            ? await compressImage(file)
            : file;
        setSelectedImage(processedFile);
    };

    const onSubmit = async (data: RegisterFormData) => {
        setLoadingBtn(true);

        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('country', data.country);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);

        if (selectedImage) {
            formData.append('profileImage', selectedImage);
        }

        try {
            await axios.post(
                'https://upskilling-egypt.com:3006/api/v1/Users/Register',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            toast.success("Registration successful!", {
                description: "Please verify your account"
            });
            navigate('/verify-account', { state: { email: data.email, fromRegister: true } });
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error("Registration failed", {
                description: axiosError.response?.data?.message || "Please try again"
            });
        } finally {
            setLoadingBtn(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">
            <SEO title="Create Account" description="Register for your culinary journey" />
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
                                Join the <span className="text-primary-500">Kitchen</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-[10px] sm:text-xs mt-1.5 flex items-center justify-center gap-1.5">
                                <Sparkles size={12} className="text-primary-500" />
                                Create your culinary identity
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Grid - 2 columns on tablet+, 1 column on mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* Username */}
                                <FormField
                                    label="Username"
                                    icon={User}
                                    placeholder="chefmaster"
                                    register={register}
                                    name="userName"
                                    validation={VALIDATION.userName}
                                    error={errors.userName}
                                    disabled={loadingBtn}
                                />

                                {/* Email */}
                                <FormField
                                    label="Email"
                                    icon={Mail}
                                    type="email"
                                    placeholder="you@example.com"
                                    register={register}
                                    name="email"
                                    validation={VALIDATION.email}
                                    error={errors.email}
                                    disabled={loadingBtn}
                                />

                                {/* Country */}
                                <FormField
                                    label="Country"
                                    icon={Globe}
                                    placeholder="Egypt"
                                    register={register}
                                    name="country"
                                    validation={VALIDATION.country}
                                    error={errors.country}
                                    disabled={loadingBtn}
                                />

                                {/* Phone */}
                                <FormField
                                    label="Phone"
                                    icon={Phone}
                                    placeholder="01xxxxxxxxx"
                                    register={register}
                                    name="phoneNumber"
                                    validation={VALIDATION.phoneNumber}
                                    error={errors.phoneNumber}
                                    disabled={loadingBtn}
                                />

                                {/* Password */}
                                <PasswordField
                                    label="Password"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    register={register}
                                    name="password"
                                    validation={VALIDATION.password}
                                    error={errors.password}
                                    disabled={loadingBtn}
                                    showPassword={showPassword}
                                    onToggle={() => setShowPassword(!showPassword)}
                                />

                                {/* Confirm Password */}
                                <PasswordField
                                    label="Confirm Password"
                                    icon={Lock}
                                    placeholder="••••••••"
                                    register={register}
                                    name="confirmPassword"
                                    validation={{
                                        required: "Confirm password",
                                        validate: (value: string) => value === password || "Passwords don't match"
                                    }}
                                    error={errors.confirmPassword}
                                    disabled={loadingBtn}
                                    showPassword={showConfirmPassword}
                                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>

                            {/* Profile Image */}
                            <ProfileImageUpload
                                register={register}
                                setValue={setValue}
                                disabled={loadingBtn}
                                onImageSelect={handleImageSelect}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loadingBtn}
                                className="w-full h-12 sm:h-14 mt-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                {loadingBtn ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        <span className="uppercase tracking-widest">Create Account</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-5 sm:mt-6 pt-5 border-t border-[var(--border)] text-center">
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary-500 font-bold hover:text-primary-600 transition-colors">
                                    Sign In
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
    return (
        <div className="space-y-1">
            <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                <input
                    {...register(name, validation)}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                />
            </div>
            {error && <p className="text-[9px] text-red-500 font-semibold ml-1">{error.message}</p>}
        </div>
    );
}

interface PasswordFieldProps extends FormFieldProps {
    showPassword: boolean;
    onToggle: () => void;
}

function PasswordField({ label, icon: Icon, placeholder, register, name, validation, error, disabled, showPassword, onToggle }: PasswordFieldProps) {
    return (
        <div className="space-y-1">
            <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                <input
                    {...register(name, validation)}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-10 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 hover:text-primary-500 transition-colors"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && <p className="text-[9px] text-red-500 font-semibold ml-1">{error.message}</p>}
        </div>
    );
}
