import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Globe,
    Phone,
    Loader2,
    Save,
    X,
    Lock,
    ShieldCheck,
    Sparkles,
    Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useCreateUser } from "../hooks";
import { TacticalInput } from "@/components/shared/tactical-input";

interface UserFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

/**
 * UserForm - "Fleet Coordination" Aesthetic
 * Focused on security and elite agent recruitment.
 * Fully compatible with Light and Dark modes.
 */
export function UserForm({ onSuccess, onCancel }: UserFormProps) {
    const { t } = useTranslation();
    const { mutate: createUser, isPending: isCreating } = useCreateUser();

    // Memoized validation schema with i18n
    const userCreateSchema = useMemo(() => z.object({
        userName: z.string()
            .min(3, t('validation.username_min'))
            .max(20, t('validation.username_max')),
        email: z.string()
            .email(t('validation.email_invalid'))
            .max(50, t('validation.email_max')),
        country: z.string()
            .min(1, t('validation.country_required'))
            .max(30, t('validation.country_max')),
        phoneNumber: z.string()
            .min(10, t('validation.phone_min'))
            .max(15, t('validation.phone_max')),
        password: z.string()
            .min(6, t('validation.password_min'))
            .max(20, t('validation.password_max')),
        confirmPassword: z.string()
            .min(6, t('validation.confirm_password_required')),
    }).refine((data) => data.password === data.confirmPassword, {
        message: t('validation.password_mismatch'),
        path: ["confirmPassword"],
    }), [t]);

    type UserCreateFormData = z.infer<typeof userCreateSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserCreateFormData>({
        resolver: zodResolver(userCreateSchema),
        mode: "onChange",
    });

    const onSubmit = (data: UserCreateFormData) => {
        createUser(data, {
            onSuccess: () => onSuccess()
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[var(--sidebar-background)]/95 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden tactical-border shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
        >
            <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide relative">
                {/* Fleet Accents */}
                <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-primary-500/5 blur-[120px] pointer-events-none rounded-full" />
                <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none rotate-12">
                    <Users size={320} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[var(--border)]">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-primary-500 mb-1">
                                <Sparkles size={12} className="animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-80">{t('users.admin_protocol')}</span>
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none">
                                {t('users.add_new_agent')}
                            </h2>
                            <p className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.2em] opacity-40">
                                {t('users.recruit_desc')}
                            </p>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-red-500/10 hover:border-red-500/20 transition-[background-color,border-color,color] duration-150 group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    <form id="user-create-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <TacticalInput
                                label={t('auth.register.username')}
                                placeholder={t('users.username_placeholder')}
                                icon={User}
                                error={errors.userName?.message}
                                {...register("userName")}
                                maxLength={20}
                            />
                            <TacticalInput
                                label={t('auth.register.email')}
                                placeholder={t('users.email_placeholder')}
                                icon={Mail}
                                error={errors.email?.message}
                                {...register("email")}
                                maxLength={50}
                            />
                            <TacticalInput
                                label={t('auth.register.country')}
                                placeholder={t('users.country_placeholder')}
                                icon={Globe}
                                error={errors.country?.message}
                                {...register("country")}
                                maxLength={30}
                            />
                            <TacticalInput
                                label={t('auth.register.phone')}
                                placeholder="+XX XXX XXX XXXX"
                                icon={Phone}
                                error={errors.phoneNumber?.message}
                                {...register("phoneNumber")}
                                maxLength={15}
                            />
                            <TacticalInput
                                label={t('auth.login.password')}
                                placeholder="••••••••"
                                icon={Lock}
                                type="password"
                                error={errors.password?.message}
                                {...register("password")}
                                maxLength={20}
                            />
                            <TacticalInput
                                label={t('auth.register.confirm_password')}
                                placeholder="••••••••"
                                icon={ShieldCheck}
                                type="password"
                                error={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                                maxLength={20}
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Tactical Actions Hub */}
            <div className="p-6 border-t border-[var(--border)] bg-[var(--background)]/40 relative z-20">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-14 flex-1 rounded-2xl border border-[var(--border)] font-black text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-[background-color,color] duration-150 flex items-center justify-center gap-3"
                    >
                        <X size={16} />
                        <span>{t('common.cancel')}</span>
                    </button>
                    <button
                        form="user-create-form"
                        type="submit"
                        disabled={isCreating}
                        className="h-14 flex-[2] rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-black text-[10px] uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-[background-color,color] duration-150 shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {isCreating ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            <>
                                <Save size={18} />
                                <span>{t('common.add')}</span>
                                <ShieldCheck size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
