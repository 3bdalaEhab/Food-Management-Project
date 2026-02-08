import apiClient from "@/lib/api-client";
import type {
    LoginCredentials,
    RegisterData,
    ForgotPasswordData,
    ResetPasswordData,
    VerifyAccountData,
    AuthResponse,
} from "./types";

// Auth API endpoints
export const authApi = {
    // Login
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>("/Users/Login", credentials);
        return data;
    },

    // Register - Uses FormData for file upload
    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const formData = new FormData();
        formData.append("userName", userData.userName);
        formData.append("email", userData.email);
        formData.append("country", userData.country);
        formData.append("phoneNumber", userData.phoneNumber);
        formData.append("password", userData.password);
        formData.append("confirmPassword", userData.confirmPassword);

        if (userData.profileImage) {
            formData.append("profileImage", userData.profileImage);
        }

        const { data } = await apiClient.post<AuthResponse>("/Users/Register", formData);
        return data;
    },

    // Forgot Password - Request reset code
    forgotPassword: async (emailData: ForgotPasswordData): Promise<{ message: string }> => {
        const { data } = await apiClient.post<{ message: string }>("/Users/Reset/Request", emailData);
        return data;
    },

    // Reset Password - With code
    resetPassword: async (resetData: ResetPasswordData): Promise<{ message: string }> => {
        const { data } = await apiClient.post<{ message: string }>("/Users/Reset", resetData);
        return data;
    },

    // Verify Account
    verifyAccount: async (verifyData: VerifyAccountData): Promise<{ message: string }> => {
        const { data } = await apiClient.put<{ message: string }>("/Users/verify", verifyData);
        return data;
    },
};
