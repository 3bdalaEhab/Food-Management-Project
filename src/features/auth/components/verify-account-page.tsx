import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { useEffect } from "react";

import { useVerifyAccount } from "../hooks";
import { verifyAccountSchema, type VerifyAccountFormData } from "../schemas";

export function VerifyAccountPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate: verify, isPending } = useVerifyAccount();

    // Attempt to get email from navigation state
    const email = location.state?.email || "";

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<VerifyAccountFormData>({
        resolver: zodResolver(verifyAccountSchema),
        mode: "onChange",
        defaultValues: {
            email: email,
            code: "",
        },
    });

    useEffect(() => {
        if (!email && !location.state?.fromRegister) {
            // If no email and didn't come from register, maybe redirect
            // navigate("/login");
        }
    }, [email, navigate, location.state]);

    const onSubmit = (data: VerifyAccountFormData) => {
        verify(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] py-12 px-4">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-[480px]"
            >
                <div className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/40 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-500/20 mx-auto mb-8"
                    >
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </motion.div>

                    <h1 className="text-3xl font-black text-neutral-900 mb-2">Verify Account</h1>
                    <p className="text-neutral-500 font-bold mb-10 px-4">
                        We've sent a verification code to your email. Please enter it below.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4 text-left">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        {...register("email")}
                                        placeholder="you@example.com"
                                        className="premium-input pl-12 opacity-80"
                                        readOnly={!!email}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-widest ml-1">Verification Code</label>
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                    <input
                                        {...register("code")}
                                        placeholder="Enter 6-digit code"
                                        className="premium-input pl-12 text-center tracking-[0.5em] font-black"
                                        maxLength={6}
                                    />
                                </div>
                                {errors.code && <p className="text-[11px] text-error font-black ml-1">{errors.code.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending || !isValid}
                            className="premium-button w-full py-4 text-lg"
                        >
                            {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                <>
                                    <span>Verify Account</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-neutral-100">
                        <p className="text-sm font-semibold text-neutral-500">
                            Didn't receive the code?{" "}
                            <button className="text-primary-600 font-black hover:underline transition-all">Resend Code</button>
                        </p>
                        <Link to="/login" className="inline-block mt-4 text-xs font-black text-neutral-400 hover:text-neutral-600 uppercase tracking-widest transition-colors">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
