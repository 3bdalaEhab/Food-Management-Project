import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ChefHat, Sparkles, LogIn, Loader2 } from "lucide-react";

import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas";

export function LoginPage() {
    const { mutate: login, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] py-12 px-4">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-secondary-500/5 rounded-full blur-[120px] animate-pulse animation-delay-4000" />

            {/* Login Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-[480px]"
            >
                <div className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden border border-white/40">
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            whileHover={{ rotate: -5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-500/30 mb-8 cursor-pointer"
                        >
                            <ChefHat className="w-10 h-10 text-white" />
                        </motion.div>

                        <div className="text-center space-y-2 mb-10">
                            <h1 className="text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                                Welcome Back
                            </h1>
                            <p className="text-neutral-500 font-semibold flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-secondary-500" />
                                Please enter your details to sign in
                            </p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input
                                            {...register("email")}
                                            placeholder="you@example.com"
                                            className="premium-input pl-12"
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-[11px] text-error font-black mt-1 ml-1"
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em]">
                                            Password
                                        </label>
                                        <Link
                                            to="/forgot-password"
                                            className="text-[11px] font-black text-primary-600 hover:text-primary-700 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input
                                            {...register("password")}
                                            type="password"
                                            placeholder="••••••••"
                                            className="premium-input pl-12"
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {errors.password && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-[11px] text-error font-black mt-1 ml-1"
                                            >
                                                {errors.password.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button w-full py-4 text-base mt-2"
                            >
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In to Account</span>
                                        <LogIn className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Integration Link */}
                        <div className="mt-10 pt-8 border-t border-neutral-100 w-full text-center">
                            <p className="text-sm font-semibold text-neutral-500">
                                Don't have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="text-primary-600 font-black hover:text-primary-700 transition-colors"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Brand */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400">
                        © 2026 Professional Kitchen Management
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
