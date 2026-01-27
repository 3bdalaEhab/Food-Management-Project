import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ShieldCheck, Hash, Loader2, Sparkles, CheckCircle } from "lucide-react";

import { useResetPassword } from "../hooks";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";

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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] py-12 px-4">
            {/* Background Polish */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-[520px]"
            >
                <div className="glass-card rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-white/40">
                    <div className="flex flex-col items-center">
                        {/* Status Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-500/20 mb-8"
                        >
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </motion.div>

                        <div className="text-center space-y-2 mb-12">
                            <h1 className="text-4xl font-black text-neutral-900 tracking-tight">Set New Password</h1>
                            <p className="text-neutral-500 font-bold flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-secondary-500" />
                                Almost there! Secure your account now
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("email")} placeholder="you@example.com" className="premium-input pl-12" />
                                    </div>
                                    {errors.email && <p className="text-[11px] text-error font-black ml-1">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Reset Code</label>
                                    <div className="relative group">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("seed")} placeholder="Enter code" className="premium-input pl-12 font-black tracking-widest" />
                                    </div>
                                    {errors.seed && <p className="text-[11px] text-error font-black ml-1">{errors.seed.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("password")} type="password" placeholder="••••••••" className="premium-input pl-12" />
                                    </div>
                                    {errors.password && <p className="text-[11px] text-error font-black ml-1">{errors.password.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Confirm</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="premium-input pl-12" />
                                    </div>
                                    {errors.confirmPassword && <p className="text-[11px] text-error font-black ml-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary w-full py-5 text-lg mt-4 flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <span>Update Password</span>
                                        <CheckCircle size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-neutral-100 w-full text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-primary-600 transition-all group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to <span className="text-primary-600 font-black ml-1">Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
