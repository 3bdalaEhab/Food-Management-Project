import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    User,
    Phone,
    Globe,
    ChefHat,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Image as ImageIcon,
    Upload,
    Loader2,
    CheckCircle2,
    Zap
} from "lucide-react";

import { useRegister } from "../hooks";
import { registerSchema, type RegisterFormData } from "../schemas";
import { AuthBackground } from "./auth-background";

type Step = 1 | 2 | 3;

export function RegisterPage() {
    const [step, setStep] = useState<Step>(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutate: registerUser, isPending } = useRegister();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isValid },
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
        hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 font-sans selection:bg-primary-500/30">
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-xl"
            >
                {/* Elite Title Accent */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max flex flex-col items-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-4"
                    />
                    <div className="flex items-center gap-3">
                        <Zap size={14} className="text-primary-500 fill-primary-500" />
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40">Secure Identity Initialization</span>
                        <Zap size={14} className="text-primary-500 fill-primary-500" />
                    </div>
                </div>

                {/* Main Glass Card */}
                <div className="glass-card rounded-[4rem] p-10 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-[60px] bg-white/[0.03]">
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Header Evolution */}
                        <div className="flex flex-col items-center text-center space-y-6 mb-12">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(255,107,38,0.5)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                <ChefHat className="w-12 h-12 text-white drop-shadow-lg" />
                            </motion.div>

                            <div className="space-y-2">
                                <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                                    Join the <span className="text-primary-500">Elite</span>
                                </h1>
                                <p className="text-white/40 font-bold tracking-tight">Configure your professional culinary agent</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-2 rounded-full transition-all duration-700 ${step >= s ? 'w-14 bg-primary-500 box-shadow-[0_0_15px_rgba(255,107,38,0.6)]' : 'w-2 bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Registration Flow */}
                        <form onSubmit={handleSubmit((data) => registerUser(data))} className="w-full">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="relative group cursor-pointer">
                                                <div className="w-32 h-32 rounded-[3.5rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary-500/50 shadow-2xl relative">
                                                    {previewImage ? (
                                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <ImageIcon className="text-white/20 w-8 h-8" />
                                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Upload Portrait</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-500 text-white rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,107,38,0.5)] ring-8 ring-[#0a0a0a]">
                                                    <Upload size={20} />
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Identity Name</label>
                                                <div className="group relative">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("userName")} placeholder="John_Doe" className="premium-input bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 h-16 pl-14 group-focus-within:border-primary-500/50 group-focus-within:bg-white/[0.05]" />
                                                </div>
                                                {errors.userName && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase tracking-tighter">{errors.userName.message}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Universal Email</label>
                                                <div className="group relative">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("email")} placeholder="master@kitchen.io" className="premium-input bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 h-16 pl-14 group-focus-within:border-primary-500/50 group-focus-within:bg-white/[0.05]" />
                                                </div>
                                                {errors.email && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase tracking-tighter">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="premium-button premium-button-primary w-full h-16 text-lg tracking-widest group shadow-[0_25px_50px_-12px_rgba(255,107,38,0.5)]"
                                        >
                                            <span>Continue Protocol</span>
                                            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
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
                                        className="space-y-8"
                                    >
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Geographical Domain</label>
                                                <div className="group relative">
                                                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("country")} placeholder="Global Presence" className="premium-input bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 h-16 pl-14" />
                                                </div>
                                                {errors.country && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.country.message}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Comm Channel</label>
                                                <div className="group relative">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("phoneNumber")} placeholder="Secure Line" className="premium-input bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 h-16 pl-14" />
                                                </div>
                                                {errors.phoneNumber && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.phoneNumber.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex gap-5">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="h-16 flex-1 rounded-3xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all shadow-xl"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="premium-button premium-button-primary h-16 flex-[2] text-lg group shadow-[0_25px_50px_-12px_rgba(255,107,38,0.5)]"
                                            >
                                                <span>Validate</span>
                                                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
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
                                        className="space-y-8"
                                    >
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Access Credentials</label>
                                                <div className="group relative">
                                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("password")} type="password" placeholder="••••••••" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14" />
                                                </div>
                                                {errors.password && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.password.message}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Key Verification</label>
                                                <div className="group relative">
                                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary-500 transition-colors" size={20} />
                                                    <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="premium-input bg-white/[0.03] border-white/10 text-white h-16 pl-14" />
                                                </div>
                                                {errors.confirmPassword && <p className="text-[10px] text-primary-400 font-black ml-1 uppercase">{errors.confirmPassword.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex gap-5">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="h-16 flex-1 rounded-3xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                                            >
                                                Revise
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isPending || !isValid}
                                                className="premium-button premium-button-primary h-16 flex-[2] text-lg group shadow-[0_32px_64px_-12px_rgba(255,107,38,0.6)] relative overflow-hidden"
                                            >
                                                {isPending ? (
                                                    <Loader2 className="animate-spin w-8 h-8" />
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-black text-xl italic uppercase tracking-tighter">Initialize Agent</span>
                                                        <CheckCircle2 size={24} className="group-hover:rotate-12 transition-transform text-white/80" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                        <div className="mt-12 pt-10 border-t border-white/5 w-full text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-white/30 hover:text-white transition-all group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                                Already authenticated? <span className="text-primary-500 font-black uppercase ml-1">Initiate Access</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
