import { Bell, Search, Sun, Moon, Globe, User, Menu, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tooltip } from "@/components/ui";
import { useAuthStore, useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

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

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const selectLanguage = (lang: "en" | "ar") => {
        setLanguage(lang);
        setIsLangOpen(false);
    };

    return (
        <header
            className={cn(
                "h-20 rounded-[2rem] px-8 flex items-center justify-between",
                "bg-white/40 dark:bg-neutral-900/40 backdrop-blur-3xl",
                "border border-white/20 dark:border-white/5 shadow-2xl transition-all duration-500"
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
                    <div className="relative flex items-center gap-4 px-6 h-12 bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl backdrop-blur-xl group-hover:border-primary-500/30 transition-all cursor-pointer">
                        <Search className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{t('navbar.search')}</span>
                        <div className="ml-auto flex items-center gap-2">
                            <kbd className="px-2 py-0.5 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-[9px] font-black text-white/40 border border-white/10">⌘K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Language Tactical Interface */}
                <div className="relative" ref={langRef}>
                    <Tooltip content={t('navbar.language')} side="bottom">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className={cn(
                                "text-neutral-600 dark:text-neutral-400 group relative",
                                isLangOpen && "bg-primary-500/10 text-primary-500"
                            )}
                        >
                            <Globe className={cn("w-5 h-5 transition-transform duration-500", isLangOpen && "rotate-180")} />
                        </Button>
                    </Tooltip>

                    <AnimatePresence>
                        {isLangOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={cn(
                                    "absolute top-14 w-48 p-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl backdrop-blur-3xl z-50",
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
                <Tooltip content={t('navbar.theme')} side="bottom">
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-neutral-600 dark:text-neutral-400"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </Button>
                    </motion.div>
                </Tooltip>

                {/* Notifications */}
                <Tooltip content={t('navbar.notifications')} side="bottom">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-600 dark:text-neutral-400 relative"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </Button>
                </Tooltip>

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
                        user?.role === "SuperAdmin" ? "bg-red-500 border-red-500/50" : "bg-neutral-900 border-white/10"
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
