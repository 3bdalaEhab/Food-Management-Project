import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ShieldCheck, Hash, Loader2, Sparkles, CheckCircle, Zap } from "lucide-react";

import { useResetPassword } from "../hooks";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";
import { AuthBackground } from "./auth-background";

export function ResetPasswordPage() {
    const { mutate: resetPassword, isPending } = useResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            seed: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPassword(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 font-sans selection:bg-primary-500/30">
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-xl"
            >
                {/* Title Accent */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl">
                        <Zap size={14} className="text-primary-500 fill-primary-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Credential Reset Terminal</span>
                    </div>
                </div>

                <div className="glass-card rounded-[4rem] p-10 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-[60px] bg-white/[0.03]">
                    <div className="flex flex-col items-center">
                        {/* Status Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-white/10 mb-10"
                        >
                            <ShieldCheck className="w-12 h-12 text-white drop-shadow-lg" />
                        </motion.div>

                        <div className="text-center space-y-4 mb-12">
                            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                                Reset <span className="text-primary-500 text-5xl">Vault</span>
                            </h1>
                            <p className="text-white/40 font-bold tracking-tight flex items-center gap-2 justify-center">
                                <Sparkles size={16} className="text-primary-500" />
                                Almost there! Secure your access now
                            </p>
                        </div>

                        {/* Reset Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Universal Identity</label>
                                    <div className="group relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("email")} placeholder="you@example.com" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14" />
                                    </div>
                                    {errors.email && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Verification Code</label>
                                    <div className="group relative">
                                        <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("seed")} placeholder="Enter Code" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14 font-black tracking-widest" />
                                    </div>
                                    {errors.seed && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.seed.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">New Secret</label>
                                    <div className="group relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("password")} type="password" placeholder="••••••••" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14" />
                                    </div>
                                    {errors.password && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.password.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Confirm Secret</label>
                                    <div className="group relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14" />
                                    </div>
                                    {errors.confirmPassword && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.confirmPassword.message}</p>}
                                </div>
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
                                        <span className="font-black italic uppercase tracking-tighter">Update Credentials</span>
                                        <CheckCircle size={22} className="group-hover:rotate-12 transition-transform text-white/80" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-14 pt-10 border-t border-white/5 w-full text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-white/30 hover:text-white transition-all group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                                Back to <span className="text-primary-500 font-black uppercase ml-1">Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
