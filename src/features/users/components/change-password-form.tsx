import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Lock,
    ShieldCheck,
    Loader2,
    KeyRound
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useChangePassword } from "../hooks";

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
    const { mutate: changePassword, isPending: isSubmitting } = useChangePassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = (data: ChangePasswordData) => {
        changePassword(data, {
            onSuccess: () => onSuccess()
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-xl mx-auto overflow-hidden rounded-[3rem] border border-[var(--border)] bg-[var(--sidebar-background)] shadow-xl"
        >
            <div className="relative p-10 md:p-14">
                <div className="flex flex-col items-center mb-10 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/30">
                        <Lock className="w-8 h-8 text-primary-500" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">
                            {t('profile.change_password') || 'Change Password'}
                        </h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            {t('profile.change_password_desc') || 'Update your account security'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--foreground)]">
                                {t('profile.current_password') || 'Current Password'}
                            </label>
                            <div className="group relative">
                                <KeyRound className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("oldPassword")}
                                    type="password"
                                    placeholder="Enter current password"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-14 pl-14 text-base"
                                />
                            </div>
                            {errors.oldPassword && <p className="text-xs text-red-500 font-medium">{errors.oldPassword.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--foreground)]">
                                {t('profile.new_password') || 'New Password'}
                            </label>
                            <div className="group relative">
                                <Lock className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("newPassword")}
                                    type="password"
                                    placeholder="Enter new password (min 6 characters)"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-14 pl-14 text-base"
                                />
                            </div>
                            {errors.newPassword && <p className="text-xs text-red-500 font-medium">{errors.newPassword.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--foreground)]">
                                {t('profile.confirm_password') || 'Confirm New Password'}
                            </label>
                            <div className="group relative">
                                <ShieldCheck className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("confirmNewPassword")}
                                    type="password"
                                    placeholder="Confirm your new password"
                                    className="premium-input bg-[var(--background)]/50 border-[var(--border)] text-[var(--foreground)] h-14 pl-14 text-base"
                                />
                            </div>
                            {errors.confirmNewPassword && <p className="text-xs text-red-500 font-medium">{errors.confirmNewPassword.message}</p>}
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="h-14 flex-1 rounded-2xl border-2 border-[var(--border)] font-bold text-sm text-[var(--foreground)] hover:bg-[var(--background)] transition-all"
                        >
                            {t('common.cancel') || 'Cancel'}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="premium-button premium-button-primary h-14 flex-[2] relative overflow-hidden group shadow-lg text-base"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Lock size={18} />
                                    <span className="font-bold">{t('profile.change_password') || 'Change Password'}</span>
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
