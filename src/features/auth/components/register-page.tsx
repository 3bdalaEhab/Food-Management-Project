import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Mail,
    Lock,
    User,
    Phone,
    Globe,
    ChefHat,
    CheckCircle2,
    Sparkles,
    Image as ImageIcon,
    Upload,
    RefreshCw,
    Trash2,
    Loader2,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import { AuthBackground } from './auth-background';
import { FloatingAuthControls } from './floating-auth-controls';
import { SEO } from '@/components/shared/seo';

interface RegisterFormData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage?: FileList;
}

export function RegisterPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>();

    const password = watch("password", "");

    // Compress image to reduce file size
    const compressImage = (file: File, maxWidth = 400, quality = 0.8): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Scale down if larger than maxWidth
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    }, 'image/jpeg', quality);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Compress if file is larger than 500KB
            const processedFile = file.size > 500 * 1024
                ? await compressImage(file)
                : file;

            setSelectedImage(processedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(processedFile);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setValue('profileImage', undefined);
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
                            {/* Smart Grid - 2 columns on tablet+, 1 column on mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* Username */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Username
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('userName', {
                                                required: "Username is required",
                                                pattern: { value: /^[a-zA-Z]+[a-zA-Z0-9]{2,}/, message: "Min 3 chars, start with letter" }
                                            })}
                                            placeholder="chefmaster"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.userName && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.userName.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('email', {
                                                required: "Email is required",
                                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                                            })}
                                            type="email"
                                            placeholder="you@example.com"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.email && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.email.message}</p>}
                                </div>

                                {/* Country */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Country
                                    </label>
                                    <div className="relative group">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('country', { required: "Country is required" })}
                                            placeholder="Egypt"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.country && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.country.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Phone
                                    </label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('phoneNumber', {
                                                required: "Phone is required",
                                                pattern: { value: /^01[0125][0-9]{8}$/, message: "Invalid Egyptian number" }
                                            })}
                                            placeholder="01xxxxxxxxx"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.phoneNumber.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('password', {
                                                required: "Password is required",
                                                validate: (value) => {
                                                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                                                    return pattern.test(value) || "Min 6: uppercase, lowercase, number, special";
                                                }
                                            })}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-10 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 hover:text-primary-500 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1">
                                    <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                        <input
                                            {...register('confirmPassword', {
                                                required: "Confirm password",
                                                validate: (value) => value === password || "Passwords don't match"
                                            })}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            disabled={loadingBtn}
                                            className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-9 pr-3 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            {/* Profile Image Upload - Full Width */}
                            <div className="space-y-2 pt-1">
                                <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                    <ImageIcon size={12} />
                                    Profile Photo <span className="text-[var(--muted-foreground)]/50 font-normal">(optional)</span>
                                </label>

                                <div className="relative">
                                    {!imagePreview ? (
                                        <label className="flex flex-col items-center justify-center w-full h-24 sm:h-28 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--background)]/30 hover:bg-[var(--background)]/50 hover:border-primary-500/50 transition-all cursor-pointer group">
                                            <div className="flex flex-col items-center justify-center py-3">
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-500/10 flex items-center justify-center mb-2 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                                                    <Upload size={16} className="sm:w-[18px] sm:h-[18px] text-primary-500" />
                                                </div>
                                                <p className="text-[10px] sm:text-xs font-semibold text-[var(--foreground)]">
                                                    <span className="text-primary-500">Click to upload</span> or drag & drop
                                                </p>
                                                <p className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5">PNG, JPG up to 5MB</p>
                                            </div>
                                            <input
                                                type='file'
                                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                                className="hidden"
                                                disabled={loadingBtn}
                                                {...register('profileImage')}
                                                onChange={(e) => {
                                                    register('profileImage').onChange(e);
                                                    handleImageChange(e);
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-[var(--background)]/40 border border-[var(--border)] rounded-xl">
                                            <div className="relative shrink-0">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-primary-500/30 ring-offset-2 ring-offset-[var(--background)] shadow-lg">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover object-center" />
                                                </div>
                                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
                                                    <CheckCircle2 size={10} className="text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-[var(--foreground)] truncate">{selectedImage?.name}</p>
                                                <p className="text-[9px] text-green-500 font-semibold flex items-center gap-0.5 mt-0.5">
                                                    <CheckCircle2 size={10} /> Ready
                                                </p>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <label className="w-7 h-7 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-muted-foreground hover:text-primary-500 cursor-pointer transition-all">
                                                    <RefreshCw size={12} />
                                                    <input type='file' accept="image/*" className="hidden" disabled={loadingBtn} {...register('profileImage')} onChange={(e) => { register('profileImage').onChange(e); handleImageChange(e); }} />
                                                </label>
                                                <button type="button" onClick={removeImage} disabled={loadingBtn} className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

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
