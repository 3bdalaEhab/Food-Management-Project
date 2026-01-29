import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, KeyRound, Sparkles, ArrowLeft } from "lucide-react";

import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";
import { AuthBackground } from "./auth-background";
import { FloatingAuthControls } from "./floating-auth-controls";
import { SEO } from "@/components/shared/seo";

export function ForgotPasswordPage() {
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-6 sm:py-10 px-4 sm:px-6">
            <SEO title="Forgot Password" description="Reset your password" />
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
                                <KeyRound className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                Reset <span className="text-primary-500">Password</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-xs sm:text-sm mt-2 flex items-center justify-center gap-1.5">
                                <Sparkles size={14} className="text-primary-500" />
                                We'll send you a reset code
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full h-12 sm:h-14 bg-[var(--background)]/60 border border-[var(--border)] rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 text-sm sm:text-base font-medium placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-[10px] sm:text-xs text-red-500 font-semibold ml-1">{errors.email.message}</p>
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
                                        <span className="uppercase tracking-widest">Send Reset Code</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-6 sm:mt-8 pt-6 border-t border-[var(--border)] text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
