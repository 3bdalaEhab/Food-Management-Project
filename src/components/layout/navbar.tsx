import { Bell, Search, Sun, Moon, Globe, User, Menu, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { useAuthStore, useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";

export function Navbar() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const { theme, setTheme, language, setLanguage, setMobileMenuOpen } = useAppStore();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    const selectLanguage = useCallback((lang: "en" | "ar") => {
        setLanguage(lang);
        setIsLangOpen(false);
    }, [setLanguage]);

    return (
        <header
            className={cn(
                "h-20 rounded-[2rem] px-8 flex items-center justify-between",
                "bg-[var(--sidebar-background)]/80 backdrop-blur-3xl",
                "border border-[var(--border)] shadow-2xl transition-all duration-500"
            )}
            role="banner"
        >
            {/* Left Side: Industrial Search Port */}
            <div className="flex items-center gap-6 flex-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden text-neutral-600 dark:text-neutral-400"
                >
                    <Menu className="w-6 h-6" />
                </Button>
                <div className="relative group w-full max-w-md hidden md:block">
                    <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 blur-xl transition-all rounded-2xl" />
                    <div className="relative flex items-center gap-4 px-6 h-12 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl backdrop-blur-xl group-hover:border-primary-500/30 transition-all cursor-pointer">
                        <Search className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-primary-500 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">{t('navbar.search')}</span>
                        <div className="ml-auto flex items-center gap-2">
                            <kbd className="px-2 py-0.5 rounded-lg bg-[var(--sidebar-background)] text-[9px] font-black text-[var(--muted-foreground)] border border-[var(--border)]">⌘K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Language Tactical Interface */}
                <div className="relative" ref={langRef}>
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="w-10 h-10 rounded-xl bg-[var(--sidebar-background)]/80 backdrop-blur-xl border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] transition-all shadow-md"
                        aria-label={t('navbar.language')}
                    >
                        <Globe size={18} className={cn("transition-transform duration-500", isLangOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isLangOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={cn(
                                    "absolute top-14 w-48 p-2 rounded-2xl bg-[var(--sidebar-background)] border border-[var(--border)] shadow-2xl backdrop-blur-3xl z-50",
                                    language === "ar" ? "left-0" : "right-0"
                                )}
                            >
                                <div className="space-y-1">
                                    <button
                                        onClick={() => selectLanguage("en")}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                            language === "en" ? "bg-primary-500 text-white shadow-lg" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
                                        )}
                                    >
                                        <span>English</span>
                                        {language === "en" && <Zap size={10} className="fill-current" />}
                                    </button>
                                    <button
                                        onClick={() => selectLanguage("ar")}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                            language === "ar" ? "bg-primary-500 text-white shadow-lg" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
                                        )}
                                    >
                                        <span>العربية</span>
                                        {language === "ar" && <Zap size={10} className="fill-current" />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-xl bg-[var(--sidebar-background)]/80 backdrop-blur-xl border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] transition-all shadow-md"
                    aria-label={t('navbar.theme')}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {theme === 'dark' ? (
                            <motion.div key="moon">
                                <Moon size={18} />
                            </motion.div>
                        ) : (
                            <motion.div key="sun">
                                <Sun size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-xl bg-[var(--sidebar-background)]/80 backdrop-blur-xl border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--sidebar-accent)] transition-all shadow-md" aria-label={t('navbar.notifications')}>
                    <Bell size={18} />
                    <span className="absolute -top-0.5 -end-0.5 w-3 h-3 bg-red-500 border-2 border-[var(--background)] rounded-full animate-pulse" />
                </button>

                {/* User Identity Port */}
                <div className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black text-[var(--foreground)] uppercase tracking-tighter leading-none">{user?.userName || "EXPERT_UNIT"}</span>
                        <div className={cn(
                            "px-2 py-0.5 rounded-full border text-[7px] font-black uppercase tracking-widest",
                            user?.role === "SuperAdmin"
                                ? "bg-red-500/10 border-red-500/30 text-red-500"
                                : "bg-primary-500/10 border-primary-500/30 text-primary-500"
                        )}>
                            {user?.role === "SuperAdmin" ? "ADMIN_STRATEGIST" : "FIELD_OPERATOR"}
                        </div>
                    </div>
                    <div className={cn(
                        "w-12 h-12 rounded-2xl p-0.5 border shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden relative",
                        user?.role === "SuperAdmin" ? "bg-red-500 border-red-500/50" : "bg-[var(--sidebar-background)] border-[var(--border)]"
                    )}>
                        <div className={cn(
                            "w-full h-full rounded-[0.9rem] flex items-center justify-center text-white font-black text-sm italic",
                            user?.role === "SuperAdmin" ? "bg-gradient-to-br from-red-500 to-red-600" : "bg-gradient-to-br from-primary-500 to-primary-600"
                        )}>
                            {user?.userName?.charAt(0).toUpperCase() || <User size={18} />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
