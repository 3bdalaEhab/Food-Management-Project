import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound, Send } from "lucide-react";

import { Button, Input, Card, CardContent } from "@/components/ui";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";

export function ForgotPasswordPage() {
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/10 via-white to-primary-500/10 dark:from-blue-950 dark:via-neutral-950 dark:to-primary-950">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-400/20 blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, -50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-4"
            >
                <Card variant="glass" padding="lg" className="backdrop-blur-xl shadow-2xl">
                    <CardContent className="space-y-6">
                        {/* Back Link */}
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>

                        {/* Header */}
                        <div className="text-center space-y-2">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                            >
                                <KeyRound className="w-8 h-8 text-white" />
                            </motion.div>

                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                Forgot Password?
                            </h1>
                            <p className="text-neutral-500 dark:text-neutral-400">
                                No worries! Enter your email and we'll send you a reset code.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                leftIcon={<Mail className="w-4 h-4" />}
                                error={errors.email?.message}
                                {...register("email")}
                            />

                            <Button
                                type="submit"
                                loading={isPending}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                                size="lg"
                                rightIcon={<Send className="w-4 h-4" />}
                            >
                                Send Reset Code
                            </Button>
                        </form>

                        {/* Help Text */}
                        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                            <p>
                                Remember your password?{" "}
                                <Link to="/login" className="text-primary-600 hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
