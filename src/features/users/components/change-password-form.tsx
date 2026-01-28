import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Lock,
    ShieldCheck,
    Loader2,
    ShieldAlert,
    Zap,
    KeyRound,
    ChevronRight,
    X
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Original key required"),
    newPassword: z.string().min(6, "New security key must be at least 6 characters"),
    confirmNewPassword: z.string().min(1, "Key confirmation required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Security keys do not match",
    path: ["confirmNewPassword"],
});

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordData) => {
        try {
            await apiClient.put("/Users/ChangePassword", data);
            toast.success("Security protocol updated successfully");
            onSuccess();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Security protocol failed");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-xl mx-auto overflow-hidden rounded-[3rem] border border-[var(--border)] bg-[var(--sidebar-background)] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
        >
            <div className="relative p-10 md:p-14">
                {/* Close Protocol */}
                <button
                    onClick={onCancel}
                    className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-primary-500 hover:border-primary-500/50 transition-all shadow-lg z-10"
                >
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center mb-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center border border-primary-500/30 shadow-[0_15px_40px_-5px_oklch(0.6_0.28_45/0.2)]">
                        <ShieldAlert className="w-10 h-10 text-primary-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none">
                            {t('profile.security_protocol')}
                        </h2>
                        <div className="flex items-center gap-2 justify-center">
                            <Zap size={14} className="text-primary-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)]">Protocol_Change_Initialize</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">Current_Key</label>
                            <div className="group relative">
                                <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("oldPassword")}
                                    type="password"
                                    placeholder="••••••••"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-16 pl-14"
                                />
                            </div>
                            {errors.oldPassword && <p className="text-[10px] text-red-500 font-black uppercase tracking-tighter ml-1">{errors.oldPassword.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">New_Identity_Key</label>
                            <div className="group relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("newPassword")}
                                    type="password"
                                    placeholder="••••••••"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-16 pl-14"
                                />
                            </div>
                            {errors.newPassword && <p className="text-[10px] text-red-500 font-black uppercase tracking-tighter ml-1">{errors.newPassword.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-1">Verify_New_Key</label>
                            <div className="group relative">
                                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("confirmNewPassword")}
                                    type="password"
                                    placeholder="••••••••"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-16 pl-14"
                                />
                            </div>
                            {errors.confirmNewPassword && <p className="text-[10px] text-red-500 font-black uppercase tracking-tighter ml-1">{errors.confirmNewPassword.message}</p>}
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="h-16 flex-1 rounded-3xl border border-[var(--border)] font-black uppercase tracking-widest text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-all"
                        >
                            Abort
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="premium-button premium-button-primary h-16 flex-[2] relative overflow-hidden group shadow-[0_30px_60px_-15px_oklch(0.6_0.28_45/0.4)]"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="font-black italic uppercase tracking-tighter">Authorize_Change</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
