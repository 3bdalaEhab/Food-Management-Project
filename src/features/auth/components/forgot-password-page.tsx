import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound, Send, Loader2, Sparkles, Zap } from "lucide-react";

import { useTranslation } from "react-i18next";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { SEO } from "@/components/shared/seo";

export function ForgotPasswordPage() {
    const { t } = useTranslation();
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 font-sans selection:bg-primary-500/30">
            <SEO
                title={t('auth.forgot.title') + ' ' + t('auth.forgot.suffix')}
                description={t('auth.forgot.subtitle')}
            />
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-lg"
            >
                {/* Title Accent */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background)]/50 backdrop-blur-3xl rounded-full border border-[var(--border)] shadow-2xl">
                        <Zap size={14} className="text-secondary-500 fill-secondary-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">{t('auth.forgot.badge')}</span>
                    </div>
                </div>

                <div className="glass-card rounded-[4rem] p-10 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] border border-[var(--border)] backdrop-blur-[60px] bg-white/[0.03]">
                    <div className="flex flex-col items-center">
                        {/* Status Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            className="w-24 h-24 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-[var(--border)] mb-10 group"
                        >
                            <KeyRound className="w-12 h-12 text-white group-hover:text-primary-500 transition-colors" />
                        </motion.div>

                        <div className="text-center space-y-4 mb-12">
                            <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                                {t('auth.forgot.title')} <span className="text-primary-500 text-5xl">{t('auth.forgot.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold tracking-tight flex items-center gap-2 justify-center">
                                <Sparkles size={16} className="text-primary-500" />
                                {t('auth.forgot.subtitle')}
                            </p>
                        </div>

                        {/* Recovery Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">{t('auth.forgot.terminal')}</label>
                                <div className="group relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="agent@culinary.io"
                                        className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/30 h-16 pl-14 group-focus-within:border-primary-500/50"
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase tracking-tighter">{errors.email.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary w-full h-16 text-xl tracking-widest group shadow-[0_32px_64px_-12px_rgba(255,107,38,0.6)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isPending ? (
                                    <Loader2 className="animate-spin w-8 h-8" />
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span className="font-black italic uppercase tracking-tighter">{t('auth.forgot.transmit')}</span>
                                        <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform text-white/80" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-14 pt-10 border-t border-[var(--border)] w-full text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                                {t('auth.forgot.recall')} <span className="text-primary-500 font-black uppercase ml-1">{t('auth.forgot.sign_in')}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Secure Badge Footer */}
                <div className="mt-10 flex items-center justify-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                    <div className="h-px w-20 bg-[var(--border)]" />
                    <p className="text-[10px] font-black text-[var(--foreground)] uppercase tracking-[0.5em]">{t('auth.login.system_core')}</p>
                    <div className="h-px w-20 bg-[var(--border)]" />
                </div>
            </motion.div>
        </div>
    );
}
