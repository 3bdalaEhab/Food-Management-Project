import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    ChevronRight,
    Loader2,
    ChefHat,
    Sparkles,
    Eye,
    EyeOff
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { FloatingAuthControls } from "./floating-auth-controls";
import { SEO } from "@/components/shared/seo";

export function LoginPage() {
    const { t } = useTranslation();
    const { mutate: login, isPending } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "abdalaehab3@gmail.com",
            password: "Ae123***"
        }
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">
            <SEO title={`${t('auth.login.title')} ${t('auth.login.suffix')}`} description={t('auth.login.subtitle')} />
            <AuthBackground />
            <FloatingAuthControls />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 w-full max-w-[400px] sm:max-w-[440px]"
            >
                {/* Main Card */}
                <div className="relative bg-[var(--sidebar-background)]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden">

                    {/* Top Gradient Bar */}
                    <div className="h-1 sm:h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-400" />

                    <div className="p-6 sm:p-8 md:p-10">
                        {/* Header */}
                        <div className="text-center mb-8 sm:mb-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/30 rotate-3"
                            >
                                <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                {t('auth.login.title')} <span className="text-primary-500">{t('auth.login.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-xs sm:text-sm mt-2 flex items-center justify-center gap-1.5">
                                <Sparkles size={14} className="text-primary-500" />
                                {t('auth.login.subtitle')}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="login-email"
                                    className="text-[10px] sm:text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider ms-1"
                                >
                                    {t('auth.login.identity')}
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute start-3.5 sm:start-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors z-10 pointer-events-none" aria-hidden="true" />
                                    <input
                                        {...register("email")}
                                        id="login-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "login-email-error" : undefined}
                                        autoComplete="email"
                                        className="w-full h-12 sm:h-14 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl sm:rounded-2xl ps-11 sm:ps-12 pe-4 text-sm sm:text-base font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.email && (
                                    <p id="login-email-error" role="alert" className="text-[10px] sm:text-xs text-red-500 font-semibold ms-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="login-password"
                                        className="text-[10px] sm:text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider ms-1"
                                    >
                                        {t('auth.login.security_key')}
                                    </label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-[10px] sm:text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
                                    >
                                        {t('auth.login.forgot')}
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute start-3.5 sm:start-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors z-10 pointer-events-none" aria-hidden="true" />
                                    <input
                                        {...register("password")}
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? "login-password-error" : undefined}
                                        autoComplete="current-password"
                                        className="w-full h-12 sm:h-14 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl sm:rounded-2xl ps-11 sm:ps-12 pe-12 text-sm sm:text-base font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute end-3.5 sm:end-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 hover:text-primary-500 transition-colors p-1 z-10"
                                    >
                                        {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="login-password-error" role="alert" className="text-[10px] sm:text-xs text-red-500 font-semibold ms-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="w-full h-12 sm:h-14 mt-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-widest">{t('auth.login.authorize')}</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-6 sm:mt-8 pt-6 border-t border-[var(--border)] text-center">
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                                {t('auth.login.new_to_fleet')}{' '}
                                <Link to="/register" className="text-primary-500 font-bold hover:text-primary-600 transition-colors">
                                    {t('auth.login.initiate_identity')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
