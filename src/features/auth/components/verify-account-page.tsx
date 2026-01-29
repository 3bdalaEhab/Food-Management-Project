import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, Loader2, KeyRound, Sparkles, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useVerifyAccount } from "../hooks";
import { verifyAccountSchema, type VerifyAccountFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { FloatingAuthControls } from "./floating-auth-controls";
import { SEO } from "@/components/shared/seo";

import { useTranslation } from "react-i18next";

export function VerifyAccountPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate: verify, isPending } = useVerifyAccount();

    const email = location.state?.email || "";

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<VerifyAccountFormData>({
        resolver: zodResolver(verifyAccountSchema),
        mode: "onChange",
        defaultValues: {
            email: email,
            code: "",
        },
    });

    useEffect(() => {
        if (!email && !location.state?.fromRegister) {
            // navigate("/login");
        }
    }, [email, navigate, location.state]);

    const onSubmit = (data: VerifyAccountFormData) => {
        verify(data);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">

            <SEO title={t('auth.verify.title')} description={t('auth.verify.subtitle')} />
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
                                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                {t('auth.verify.title')} <span className="text-primary-500">{t('auth.verify.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-xs sm:text-sm mt-2 flex items-center justify-center gap-1.5">
                                <Sparkles size={14} className="text-primary-500" />
                                {t('auth.verify.subtitle')}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.verify.target_email')}
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)]/50" />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                        readOnly={!!email}
                                        className="w-full h-12 sm:h-14 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 text-sm sm:text-base font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none disabled:opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-[10px] sm:text-xs text-red-500 font-semibold ml-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Verification Code Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    {t('auth.verify.universal_key')}
                                </label>
                                <div className="relative group">
                                    <KeyRound className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("code")}
                                        placeholder="••••"
                                        maxLength={4}
                                        className="w-full h-14 sm:h-16 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 text-center text-2xl sm:text-3xl font-black tracking-[0.5em] placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.code && (
                                    <p className="text-[10px] sm:text-xs text-red-500 font-semibold ml-1">{errors.code.message}</p>
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
                                        <span className="uppercase tracking-widest">{t('auth.verify.initialize_identity')}</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 sm:mt-8 pt-6 border-t border-[var(--border)] text-center space-y-4">
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                                {t('auth.verify.protocol_failed')}{' '}
                                <button className="text-primary-500 font-bold hover:text-primary-600 transition-colors">
                                    {t('auth.verify.resend')}
                                </button>
                            </p>
                            <Link to="/login" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                {t('auth.forgot.sign_in')}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
