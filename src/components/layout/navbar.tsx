import { Bell, Search, Sun, Moon, Globe, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { useAuthStore, useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Navbar() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const { theme, setTheme, language, setLanguage, setMobileMenuOpen } = useAppStore();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ar" : "en");
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
                {/* Language Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    className="text-neutral-600 dark:text-neutral-400"
                >
                    <Globe className="w-5 h-5" />
                </Button>

                {/* Theme Toggle */}
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

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-600 dark:text-neutral-400 relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* User Identity Port */}
                <div className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer">
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">{user?.userName || "EXPERT"}</span>
                        <span className="text-[8px] font-black text-primary-500 uppercase tracking-[0.2em] leading-none">{user?.role || "GUEST"}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 p-0.5 border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                        <div className="w-full h-full rounded-[0.9rem] bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-black text-sm italic">
                            {user?.userName?.charAt(0).toUpperCase() || <User size={18} />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
