import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound, Send, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";
import { AuthWrapper } from "./auth-wrapper";

export function ForgotPasswordPage() {
    const { t } = useTranslation();
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    return (
        <AuthWrapper
            title={t('auth.forgot.title')}
            suffix={t('auth.forgot.suffix')}
            subtitle={t('auth.forgot.subtitle')}
            seoTitle={t('auth.forgot.title') + ' ' + t('auth.forgot.suffix')}
            seoDescription={t('auth.forgot.subtitle')}
            headerIcon={<KeyRound className="w-8 h-8 text-white drop-shadow-md" />}
            footerLink={{
                text: t('auth.forgot.recall'),
                linkText: t('auth.forgot.sign_in'),
                to: "/login",
                icon: ArrowLeft
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="agent@culinary.io"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl h-12 pl-12 pr-4 text-sm font-semibold placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.email.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending || !isValid}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    {isPending ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                        <>
                            <span className="font-black italic uppercase tracking-widest text-sm">{t('auth.forgot.transmit')}</span>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </AuthWrapper>
    );
}
