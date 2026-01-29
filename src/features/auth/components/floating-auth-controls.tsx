import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";

export function FloatingAuthControls() {
    const { theme, setTheme, language, setLanguage } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50"
            style={{ willChange: 'transform' }}
        >
            <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-[var(--background)]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[var(--border)] shadow-xl">
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[var(--sidebar-background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-primary-500 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <Sun size={16} className="sm:w-[18px] sm:h-[18px]" />
                    ) : (
                        <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    )}
                </button>

                {/* Divider */}
                <div className="w-px h-5 sm:h-6 bg-[var(--border)]" />

                {/* Language Selector */}
                <div className="flex gap-0.5 sm:gap-1">
                    <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                            "px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide transition-all",
                            language === 'en'
                                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                : "bg-[var(--sidebar-background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]"
                        )}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage('ar')}
                        className={cn(
                            "px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide transition-all",
                            language === 'ar'
                                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                : "bg-[var(--sidebar-background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]"
                        )}
                    >
                        AR
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
