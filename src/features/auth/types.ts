// Auth Types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage?: File | null;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    email: string;
    seed: string;
    password: string;
    confirmPassword: string;
}

export interface VerifyAccountData {
    email: string;
    code: string;
}

export interface AuthResponse {
    token: string;
    message?: string;
}

export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
}

// User Type
export interface User {
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath?: string;
    group: {
        id: number;
        name: string;
    };
    creationDate: string;
    modificationDate: string;
}
