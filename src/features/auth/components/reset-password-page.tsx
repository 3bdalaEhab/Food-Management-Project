import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, KeyRound, Sparkles, ArrowLeft, Eye, EyeOff, Hash } from "lucide-react";
import { useState } from "react";

import { useResetPassword } from "../hooks";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { FloatingAuthControls } from "./floating-auth-controls";
import { SEO } from "@/components/shared/seo";

import { useTranslation } from "react-i18next";

export function ResetPasswordPage() {
    const { t } = useTranslation();
    const { mutate: resetPassword, isPending } = useResetPassword();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPassword(data);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">
            <SEO title={t('auth.reset.title')} description={t('auth.reset.subtitle')} />
            <AuthBackground />
            <FloatingAuthControls />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 w-full max-w-[400px] sm:max-w-[460px]"
            >
                {/* Main Card */}
                <div className="relative bg-[var(--sidebar-background)]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden">

                    {/* Top Gradient Bar */}
                    <div className="h-1 sm:h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-400" />

                    <div className="p-6 sm:p-8 md:p-10">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/30 rotate-3"
                            >
                                <KeyRound className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                            </motion.div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                {t('auth.reset.title')} <span className="text-primary-500">{t('auth.reset.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-[10px] sm:text-xs mt-1.5 flex items-center justify-center gap-1.5">
                                <Sparkles size={12} className="text-primary-500" />
                                {t('auth.reset.subtitle')}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.reset.identity')}
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-10 pr-4 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.email && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.email.message}</p>}
                            </div>

                            {/* OTP/Seed Field */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.reset.code')}
                                </label>
                                <div className="relative group">
                                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("seed")}
                                        placeholder="Enter code from email"
                                        className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-10 pr-4 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.seed && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.seed.message}</p>}
                            </div>

                            {/* New Password */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.reset.secret')}
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("password")}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-10 pr-10 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
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
                            <div className="space-y-1.5">
                                <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.reset.confirm')}
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("confirmPassword")}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full h-11 sm:h-12 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl pl-10 pr-4 text-sm font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-[9px] text-red-500 font-semibold ml-1">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="w-full h-12 sm:h-14 mt-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-widest">{t('auth.reset.update')}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-5 pt-5 border-t border-[var(--border)] text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                {t('auth.reset.back')} {t('auth.login.title')}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
