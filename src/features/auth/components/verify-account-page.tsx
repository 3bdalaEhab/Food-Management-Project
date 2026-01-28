import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, Loader2, KeyRound, Sparkles, Zap, ArrowLeft, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { useVerifyAccount } from "../hooks";
import { verifyAccountSchema, type VerifyAccountFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { useAppStore } from "@/stores";
import { SEO } from "@/components/shared/seo";

export function VerifyAccountPage() {
    const { t } = useTranslation();
    const { theme, setTheme, language, setLanguage } = useAppStore();
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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 font-sans selection:bg-primary-500/30">
            <SEO
                title={t('auth.verify.badge')}
                description={t('auth.verify.subtitle')}
            />
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-lg"
            >
                {/* Title Accent */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background)]/50 backdrop-blur-3xl rounded-full border border-[var(--border)] shadow-2xl">
                        <Zap size={14} className="text-primary-500 fill-primary-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">{t('auth.verify.badge')}</span>
                    </div>
                </div>

                <div className="glass-card rounded-[4rem] p-10 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] border border-[var(--border)] backdrop-blur-[60px] bg-[var(--sidebar-background)]/80">
                    <div className="flex flex-col items-center">
                        {/* Status Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-[var(--border)] mb-10"
                        >
                            <ShieldCheck className="w-12 h-12 text-white drop-shadow-lg" />
                        </motion.div>

                        <div className="text-center space-y-4 mb-12">
                            <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase italic">
                                {t('auth.verify.title')} <span className="text-primary-500 text-5xl">{t('auth.verify.suffix')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold tracking-tight flex items-center gap-2 justify-center italic">
                                <Sparkles size={16} className="text-primary-500" />
                                {t('auth.verify.subtitle')}
                            </p>
                        </div>

                        {/* Verification Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
                            <div className="space-y-6 text-left">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">{t('auth.verify.target_email')}</label>
                                    <div className="group relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40" size={20} />
                                        <input
                                            {...register("email")}
                                            placeholder="agent@culinary.io"
                                            className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-16 pl-14 opacity-50 cursor-not-allowed"
                                            readOnly={!!email}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">{t('auth.verify.universal_key')}</label>
                                    <div className="group relative">
                                        <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input
                                            {...register("code")}
                                            placeholder="••••"
                                            className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-16 pl-14 text-center tracking-[1em] font-black text-2xl"
                                            maxLength={4}
                                        />
                                    </div>
                                    {errors.code && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.code.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary w-full h-16 text-xl tracking-widest group shadow-[0_32px_64px_-12px_rgba(255,107,38,0.6)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isPending ? <Loader2 className="animate-spin w-8 h-8" /> : (
                                    <div className="flex items-center gap-3">
                                        <span className="font-black italic uppercase tracking-tighter">{t('auth.verify.initialize_identity')}</span>
                                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform text-white/80" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-14 pt-10 border-t border-[var(--border)] w-full text-center space-y-6">
                            <p className="text-sm font-bold text-[var(--muted-foreground)]">
                                {t('auth.verify.protocol_failed')} <button className="text-primary-500 font-black uppercase hover:text-primary-400 transition-colors ml-1">{t('auth.verify.resend')}</button>
                            </p>
                            <Link to="/login" className="inline-flex items-center gap-2 mt-6 text-xs font-black text-[var(--muted-foreground)] hover:text-[var(--foreground)] uppercase tracking-widest transition-colors group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                {t('auth.verify.abort')}
                            </Link>

                            {/* Tactical Auth Controls */}
                            <div className="flex items-center justify-center gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-primary-500 hover:border-primary-500/50 transition-all shadow-lg"
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                                <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-xl p-1 shadow-lg">
                                    <button
                                        type="button"
                                        onClick={() => setLanguage('en')}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                            language === 'en' ? "bg-primary-500 text-white shadow-md" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                        )}
                                    >
                                        EN
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLanguage('ar')}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                            language === 'ar' ? "bg-primary-500 text-white shadow-md" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                        )}
                                    >
                                        AR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
