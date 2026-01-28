import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Lock,
    ShieldCheck,
    Loader2,
    CheckCircle2,
    X,
    Eye,
    EyeOff,
    Zap,
    Activity,
    ShieldAlert
} from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { cn } from "@/lib/utils";

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string()
        .min(6, "New password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
});

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
    const [isPending, setIsPending] = useState(false);
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ChangePasswordData>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ChangePasswordData) => {
        setIsPending(true);
        try {
            await apiClient.put("/Users/ChangePassword", data);
            toast.success("Security credentials updated successfully!");
            onSuccess();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setIsPending(false);
        }
    };

    const toggleVisible = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="glass-card rounded-[4rem] p-10 md:p-14 border border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl shadow-2xl overflow-hidden relative">
                {/* Security Polish */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 rounded-full bg-neutral-900 border border-white/10 flex items-center gap-2 text-white">
                                    <ShieldCheck size={10} className="text-primary-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Security Core</span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2 text-primary-500">
                                    <Activity size={10} className="animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Refining Protocol</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase italic leading-none">Security <span className="text-primary-500">Sync</span></h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center text-white/50 hover:text-white hover:bg-neutral-800 transition-all shadow-xl group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Current Password */}
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <Lock size={14} className="text-primary-500" />
                                Master Key (Current)
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                <input
                                    {...register("oldPassword")}
                                    type={showPasswords.old ? "text" : "password"}
                                    className="premium-input bg-white/50 dark:bg-white/5 border-white/10 h-20 pl-16 pr-16 font-black uppercase tracking-widest text-lg"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisible("old")}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors"
                                >
                                    {showPasswords.old ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password Pair */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <Zap size={14} className="text-primary-500" />
                                    New Protocol
                                </label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        {...register("newPassword")}
                                        type={showPasswords.new ? "text" : "password"}
                                        className="premium-input bg-white/50 dark:bg-white/5 border-white/10 h-20 pl-16 pr-16 font-black uppercase tracking-widest text-lg"
                                        placeholder="NEW_KEY"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisible("new")}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors"
                                    >
                                        {showPasswords.new ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-[9px] text-primary-500 font-black uppercase ml-2 animate-pulse">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <ShieldAlert size={14} className="text-primary-500" />
                                    Verification
                                </label>
                                <div className="relative group">
                                    <CheckCircle2 className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input
                                        {...register("confirmNewPassword")}
                                        type={showPasswords.confirm ? "text" : "password"}
                                        className="premium-input bg-white/50 dark:bg-white/5 border-white/10 h-20 pl-16 pr-16 font-black uppercase tracking-widest text-lg"
                                        placeholder="CONFIRM_KEY"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisible("confirm")}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors"
                                    >
                                        {showPasswords.confirm ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>
                                {errors.confirmNewPassword && (
                                    <p className="text-[9px] text-primary-500 font-black uppercase ml-2 animate-pulse">{errors.confirmNewPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-6 pt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="h-18 px-10 rounded-[2rem] bg-neutral-900 text-white/50 font-black uppercase tracking-widest text-xs hover:text-white hover:bg-neutral-800 transition-all shadow-xl"
                            >
                                ABORT
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary flex-1 h-18 text-lg group shadow-2xl shadow-primary-500/20"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : (
                                    <div className="flex items-center gap-4">
                                        <span className="font-black uppercase tracking-[0.2em]">Sync Security</span>
                                        <ShieldCheck size={28} className="group-hover:scale-110 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
