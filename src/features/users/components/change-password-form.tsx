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
    EyeOff
} from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { toast } from "sonner";
import apiClient from "@/lib/api-client";

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
        code: "onChange",
    } as any);

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg mx-auto"
        >
            <div className="glass-card rounded-[3rem] p-10 md:p-14 border border-white/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-primary-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[10px]">
                                <ShieldCheck size={14} />
                                Security Studio
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight">Secure Account</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-12 h-12 rounded-[1.25rem] bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-all shadow-sm"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Current Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("oldPassword")}
                                    type={showPasswords.old ? "text" : "password"}
                                    className="premium-input pl-12 pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisible("old")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPasswords.old ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">New Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("newPassword")}
                                    type={showPasswords.new ? "text" : "password"}
                                    className="premium-input pl-12 pr-12"
                                    placeholder="Minimum 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisible("new")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-[10px] text-error font-black ml-1">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Verify New Password</label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("confirmNewPassword")}
                                    type={showPasswords.confirm ? "text" : "password"}
                                    className="premium-input pl-12 pr-12"
                                    placeholder="Re-type your new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisible("confirm")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmNewPassword && <p className="text-[10px] text-error font-black ml-1">{errors.confirmNewPassword.message}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="premium-button flex-1 py-4 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary flex-[2] py-4"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        <span>Update Security</span>
                                        <CheckCircle2 size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
