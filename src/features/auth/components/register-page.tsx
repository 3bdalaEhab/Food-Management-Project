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
    Image as ImageIcon,
    Upload,
    Loader2,
    CheckCircle2
} from "lucide-react";

import { useRegister } from "../hooks";
import { registerSchema, type RegisterFormData } from "../schemas";

export function RegisterPage() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutate: registerUser, isPending } = useRegister();

    const {
        register,
        handleSubmit,
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

    const onSubmit = (data: RegisterFormData) => {
        // Handle registration (logic for FormData if image exists would go here)
        registerUser(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-[#f8fafc] py-20 px-4">
            {/* Background Polish */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary-500/5 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-2xl"
            >
                <div className="glass-card rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-white/40">
                    <div className="flex flex-col items-center">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center space-y-4 mb-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-500/20"
                            >
                                <ChefHat className="w-10 h-10 text-white" />
                            </motion.div>
                            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">Create Account</h1>
                            <p className="text-neutral-500 font-bold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-secondary-500" />
                                Start your culinary journey with us today
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
                            {/* Image Upload Component */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-neutral-100 border-2 border-dashed border-neutral-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary-500/50">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-neutral-300 w-10 h-10" />
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors shadow-lg">
                                        <Upload size={18} />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>
                                <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">Profile Photo (Optional)</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Username */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Username</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("userName")} placeholder="johndoe" className="premium-input pl-12" />
                                    </div>
                                    {errors.userName && <p className="text-[11px] text-error font-black ml-1">{errors.userName.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("phoneNumber")} placeholder="+20 123 456 789" className="premium-input pl-12" />
                                    </div>
                                    {errors.phoneNumber && <p className="text-[11px] text-error font-black ml-1">{errors.phoneNumber.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("email")} placeholder="you@example.com" className="premium-input pl-12" />
                                    </div>
                                    {errors.email && <p className="text-[11px] text-error font-black ml-1">{errors.email.message}</p>}
                                </div>

                                {/* Country */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Country</label>
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("country")} placeholder="Egypt" className="premium-input pl-12" />
                                    </div>
                                    {errors.country && <p className="text-[11px] text-error font-black ml-1">{errors.country.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("password")} type="password" placeholder="••••••••" className="premium-input pl-12" />
                                    </div>
                                    {errors.password && <p className="text-[11px] text-error font-black ml-1">{errors.password.message}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Confirm Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="premium-input pl-12" />
                                    </div>
                                    {errors.confirmPassword && <p className="text-[11px] text-error font-black ml-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button w-full py-5 text-lg mt-4 flex items-center justify-center gap-3 shadow-2xl"
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin w-6 h-6" />
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <CheckCircle2 size={22} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-neutral-100 w-full text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-primary-600 transition-all group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Already have an account? <span className="text-primary-600 font-black">Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
