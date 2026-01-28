import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
    Mail,
    Lock,
    ChevronRight,
    Loader2,
    ChefHat
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas";
import { AuthWrapper } from "./auth-wrapper";
import { DemoCredentials } from "./demo-credentials";

export function LoginPage() {
    const { t } = useTranslation();
    const { mutate: login, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    const handleDemoFill = (email: string, pass: string) => {
        setValue("email", email, { shouldValidate: true });
        setValue("password", pass, { shouldValidate: true });
    };

    return (
        <AuthWrapper
            title={t('auth.login.title')}
            suffix={t('auth.login.suffix')}
            subtitle={t('auth.login.subtitle')}
            seoTitle={t('auth.login.title') + ' ' + t('auth.login.suffix')}
            seoDescription={t('auth.login.subtitle')}
            headerIcon={<ChefHat className="w-8 h-8 text-white drop-shadow-md" />}
            footerLink={{
                text: t('auth.login.new_to_fleet'),
                linkText: t('auth.login.initiate_identity'),
                to: "/register"
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
                <div className="space-y-3">
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="space-y-1">
                        <div className="group relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl h-12 pl-12 pr-4 text-sm font-semibold placeholder:text-[var(--muted-foreground)]/40 focus:bg-[var(--background)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all outline-none"
                            />
                        </div>
                        <div className="flex justify-end px-1">
                            {errors.password ? (
                                <p className="text-[9px] text-red-500 font-bold mr-auto ml-2">{errors.password.message}</p>
                            ) : null}
                            <Link to="/forgot-password" className="text-[10px] font-bold text-primary-500 hover:text-primary-600 transition-colors">
                                {t('auth.login.forgot')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
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
                            <span className="font-black uppercase tracking-widest text-sm">{t('auth.login.authorize')}</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8">
                <DemoCredentials onFill={handleDemoFill} />
            </div>
        </AuthWrapper >
    );
}
