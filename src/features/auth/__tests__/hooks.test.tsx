import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLogin, useRegister, useForgotPassword, useResetPassword, useVerifyAccount } from '../hooks';
import { authApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock dependencies
vi.mock('../api', () => ({
    authApi: {
        login: vi.fn(),
        register: vi.fn(),
        forgotPassword: vi.fn(),
        resetPassword: vi.fn(),
        verifyAccount: vi.fn(),
    },
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('@/stores/auth-store', () => ({
    useAuthStore: vi.fn(),
}));

// Setup QueryClient for React Query
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'QueryWrapper';
    return Wrapper;
};

describe('Auth Hooks', () => {
    const mockNavigate = vi.fn();
    const mockSetToken = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as unknown as { mockReturnValue: (v: unknown) => void }).mockReturnValue(mockNavigate);
        (useAuthStore as unknown as { mockImplementation: (f: (s: { setToken: typeof mockSetToken }) => unknown) => void }).mockImplementation((selector: (s: { setToken: typeof mockSetToken }) => void) => {
            if (selector) return selector({ setToken: mockSetToken });
            return { setToken: mockSetToken };
        });
    });

    describe('useLogin', () => {
        it('should handle successful login', async () => {
            const mockResponse = { token: 'fake-token' };
            (authApi.login as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue(mockResponse);

            const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ email: 'test@example.com', password: 'password' });

            await waitFor(() => {
                expect(authApi.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
                expect(mockSetToken).toHaveBeenCalledWith('fake-token');
                expect(toast.success).toHaveBeenCalled();
                expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
            });
        });

        it('should handle login error', async () => {
            const mockError = { response: { data: { message: 'Invalid credentials' } }, isAxiosError: true };
            (authApi.login as unknown as { mockRejectedValue: (v: unknown) => void }).mockRejectedValue(mockError);

            const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

            // Swallow error to prevent log noise
            try {
                await result.current.mutateAsync({ email: 'test@example.com', password: 'password' });
            } catch {
                // Expected
            }

            await waitFor(() => {
                expect(toast.error).toHaveBeenCalledWith('Login failed', expect.objectContaining({
                    description: 'Invalid credentials'
                }));
            });
        });
    });

    describe('useRegister', () => {
        it('should handle successful registration', async () => {
            (authApi.register as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({});

            const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

            // Minimal mock data for form data
            const formData = new FormData();
            await result.current.mutateAsync(formData as unknown);

            await waitFor(() => {
                expect(authApi.register).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalled();
                expect(mockNavigate).toHaveBeenCalledWith('/verify-account');
            });
        });

        it('should handle registration error', async () => {
            const mockError = { response: { data: { message: 'Email taken' } }, isAxiosError: true };
            (authApi.register as unknown as { mockRejectedValue: (v: unknown) => void }).mockRejectedValue(mockError);

            const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });

            try {
                await result.current.mutateAsync({} as unknown);
            } catch (error) {
                // Expected error during registration
                console.debug('Registration error caught in test:', error);
            }

            await waitFor(() => {
                expect(toast.error).toHaveBeenCalled();
                expect(mockNavigate).not.toHaveBeenCalled();
            });
        });
    });

    describe('useForgotPassword', () => {
        it('should handle successful request', async () => {
            (authApi.forgotPassword as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({});

            const { result } = renderHook(() => useForgotPassword(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ email: 'test@example.com' });

            await waitFor(() => {
                expect(authApi.forgotPassword).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalled();
                expect(mockNavigate).toHaveBeenCalledWith('/reset-password');
            });
        });
    });

    describe('useResetPassword', () => {
        it('should handle successful reset', async () => {
            (authApi.resetPassword as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({});

            const { result } = renderHook(() => useResetPassword(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ email: 'test', password: 'new', confirmPassword: 'new', seed: '123' });

            await waitFor(() => {
                expect(authApi.resetPassword).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalled();
                expect(mockNavigate).toHaveBeenCalledWith('/login');
            });
        });
    });

    describe('useVerifyAccount', () => {
        it('should handle successful verification', async () => {
            (authApi.verifyAccount as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue({});

            const { result } = renderHook(() => useVerifyAccount(), { wrapper: createWrapper() });

            await result.current.mutateAsync({ email: 'test', code: '123' });

            await waitFor(() => {
                expect(authApi.verifyAccount).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalled();
                expect(mockNavigate).toHaveBeenCalledWith('/login');
            });
        });
    });
});
