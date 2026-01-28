import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    User,
    Phone,
    Globe,
    ChefHat,
    ArrowLeft,
    ArrowRight,
    Image as ImageIcon,
    Upload,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRegister } from "../hooks";
import { registerSchema, type RegisterFormData } from "../schemas";
import { AuthWrapper } from "./auth-wrapper";

type Step = 1 | 2 | 3;

export function RegisterPage() {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutate: registerUser, isPending } = useRegister();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            userName: "",
            email: "",
            country: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = async () => {
        const fields: (keyof RegisterFormData)[] =
            step === 1 ? ["userName", "email"] :
                step === 2 ? ["country", "phoneNumber"] : [];

        const isStepValid = await trigger(fields);
        if (isStepValid) setStep((prev) => (prev + 1) as Step);
    };

    const prevStep = () => setStep((prev) => (prev - 1) as Step);

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <AuthWrapper
            title={t('auth.register.title')}
            suffix=""
            subtitle={t('auth.register.subtitle')}
            seoTitle={t('auth.register.secure_identity')}
            seoDescription={t('auth.register.subtitle')}
            headerIcon={<ChefHat className="w-8 h-8 text-white drop-shadow-md" />}
            maxWidth="max-w-[480px]"
            footerLink={{
                text: t('auth.register.already_authenticated'),
                linkText: t('auth.login.authorize'), // Using generic "Authorize" or similar if specific key missing
                to: "/login"
            }}
        >
            {/* Step Indicator - Injected into Content */}
            <div className="flex justify-center gap-1.5 mb-6">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-primary-500 shadow-[0_0_10px_rgba(255,107,38,0.3)]' : 'w-2 bg-[var(--border)]'}`}
                    />
                ))}
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <form onSubmit={handleSubmit((data) => registerUser(data))} className="w-full space-y-2">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 pt-2"
                            >
                                {/* Compact Image Upload */}
                                <div className="flex justify-center">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-24 h-24 rounded-full bg-[var(--background)] border-2 border-dashed border-[var(--border)] flex items-center justify-center overflow-hidden transition-all group-hover:border-primary-500/50 shadow-inner">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-[var(--muted-foreground)]/30 w-8 h-8" />
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg ring-4 ring-[var(--sidebar-background)]">
                                            <Upload size={14} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.identity_name')}</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input {...register("userName")} placeholder="John_Doe" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500 focus:bg-[var(--background)] transition-all outline-none" />
                                        </div>
                                        {errors.userName && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.userName.message}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.universal_email')}</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input {...register("email")} placeholder="master@kitchen.io" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500 focus:bg-[var(--background)] transition-all outline-none" />
                                        </div>
                                        {errors.email && <p className="text-[9px] text-red-500 font-bold ml-2">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full h-12 rounded-xl bg-primary-500 text-white font-bold uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                                >
                                    <span>{t('auth.register.continue')}</span>
                                    <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 pt-2"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.geographical_domain')}</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input {...register("country")} placeholder="Global Presence" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500  transition-all outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.comm_channel')}</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input {...register("phoneNumber")} placeholder="Secure Line" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button type="button" onClick={prevStep} className="h-12 w-12 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background)] transition-all">
                                        <ArrowLeft size={18} className="text-[var(--muted-foreground)]" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-1 h-12 rounded-xl bg-primary-500 text-white font-bold uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                                    >
                                        <span>{t('auth.register.continue')}</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6 pt-2"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.access_credentials')}</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input type="password" {...register("password")} placeholder="Secret_Key" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase ml-2">{t('auth.register.key_verification')}</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50" size={16} />
                                            <input type="password" {...register("confirmPassword")} placeholder="Confirm_Secret" className="w-full bg-[var(--background)]/50 border border-[var(--border)] rounded-xl h-11 pl-10 pr-4 text-sm font-semibold focus:border-primary-500 transition-all outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button type="button" onClick={prevStep} className="h-12 w-12 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background)] transition-all">
                                        <ArrowLeft size={18} className="text-[var(--muted-foreground)]" />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 h-12 rounded-xl bg-primary-500 text-white font-bold uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                                    >
                                        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                            <>
                                                <span>{t('auth.register.initialize_agent')}</span>
                                                <CheckCircle2 size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </AuthWrapper>
    );
}
