import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { authApi } from "./api";
import type { LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, VerifyAccountData } from "./types";
import { parseApiError } from "@/lib/api-client";

// Login mutation hook
export function useLogin() {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
        onSuccess: (data) => {
            setToken(data.token);
            toast.success("Welcome back! 🎉", {
                description: "You have successfully logged in.",
            });
            navigate("/dashboard");
        },
        onError: (error) => {
            const apiError = parseApiError(error);
            toast.error("Login failed", {
                description: apiError.message,
            });
        },
    });
}

// Register mutation hook
export function useRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (userData: RegisterData) => authApi.register(userData),
        onSuccess: () => {
            toast.success("Registration successful! 🎉", {
                description: "Please verify your email to continue.",
            });
            // Only navigate if registration was truly successful
            navigate("/verify-account");
        },
        onError: (error) => {
            const apiError = parseApiError(error);
            toast.error("Registration failed", {
                description: apiError.message || "Please check your information and try again.",
            });
            // Stay on registration page - don't navigate
        },
    });
}

// Forgot password mutation hook
export function useForgotPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (emailData: ForgotPasswordData) => authApi.forgotPassword(emailData),
        onSuccess: () => {
            toast.success("Reset code sent! 📧", {
                description: "Please check your email for the reset code.",
            });
            navigate("/reset-password");
        },
        onError: (error) => {
            const apiError = parseApiError(error);
            toast.error("Request failed", {
                description: apiError.message,
            });
        },
    });
}

// Reset password mutation hook
export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (resetData: ResetPasswordData) => authApi.resetPassword(resetData),
        onSuccess: () => {
            toast.success("Password reset successful! 🔐", {
                description: "You can now login with your new password.",
            });
            navigate("/login");
        },
        onError: (error) => {
            const apiError = parseApiError(error);
            toast.error("Reset failed", {
                description: apiError.message,
            });
        },
    });
}

// Verify account mutation hook
export function useVerifyAccount() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (verifyData: VerifyAccountData) => authApi.verifyAccount(verifyData),
        onSuccess: () => {
            toast.success("Account verified! ✅", {
                description: "Your account has been verified. Please login.",
            });
            navigate("/login");
        },
        onError: (error) => {
            const apiError = parseApiError(error);
            toast.error("Verification failed", {
                description: apiError.message,
            });
        },
    });
}
