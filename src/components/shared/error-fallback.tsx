import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorFallbackProps {
    error: Error | null;
    onReset?: () => void;
}

/**
 * Fallback UI component displayed when an error is caught by ErrorBoundary.
 * Provides user-friendly error message with retry and navigation options.
 */
export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#050505] p-6">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-lg w-full"
            >
                <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
                    {/* Error Header */}
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white">
                                    Oops! Something went wrong
                                </h1>
                                <p className="text-white/80 text-sm mt-1">
                                    Don't worry, we're on it
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Content */}
                    <div className="p-6 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Bug className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                                            Error Details
                                        </p>
                                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-mono break-all">
                                            {error.message || 'An unexpected error occurred'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Help Text */}
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center">
                            This error has been logged. You can try refreshing the page or return to the dashboard.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {onReset && (
                                <button
                                    onClick={onReset}
                                    className="flex-1 h-12 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Try Again
                                </button>
                            )}
                            <button
                                onClick={handleReload}
                                className="flex-1 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reload Page
                            </button>
                        </div>

                        {/* Home Link */}
                        <div className="text-center pt-2">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 font-semibold transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
