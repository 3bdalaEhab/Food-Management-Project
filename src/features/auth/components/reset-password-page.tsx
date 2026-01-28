import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Hash, Lock, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useResetPassword } from "../hooks";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";
import { AuthWrapper } from "./auth-wrapper";

export function ResetPasswordPage() {
    const { t } = useTranslation();
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
        <AuthWrapper
            title={t('auth.reset.title')}
            suffix={t('auth.reset.suffix')}
            subtitle={t('auth.reset.subtitle')}
            seoTitle={t('auth.reset.title') + ' ' + t('auth.reset.suffix')}
            seoDescription={t('auth.reset.subtitle')}
            headerIcon={<ShieldCheck className="w-8 h-8 text-white drop-shadow-md" />}
            maxWidth="max-w-[480px]"
            footerLink={{
                text: t('auth.reset.back'),
                linkText: t('auth.forgot.sign_in'),
                to: "/login",
                icon: ArrowLeft
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-12 pl-12 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                            <input
                                {...register("seed")}
                                placeholder="Enter Code"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-12 pl-12 pr-4 text-sm font-black tracking-widest focus:border-primary-500 transition-all outline-none"
                            />
                        </div>
                        {errors.seed && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.seed.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="New Password"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-12 pl-12 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none"
                            />
                        </div>
                        {errors.password && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-12 pl-12 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending || !isValid}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {isPending ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                        <>
                            <span className="font-black italic uppercase tracking-widest text-sm">{t('auth.reset.update')}</span>
                            <CheckCircle size={18} className="group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </AuthWrapper>
    );
}
