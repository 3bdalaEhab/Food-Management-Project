import { Menu, Bell, Search, Sun, Moon, Globe, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { useAuthStore, useAppStore } from "@/stores";
import { cn } from "@/lib/utils";

export function Navbar() {
    const user = useAuthStore((state) => state.user);
    const { theme, setTheme, language, setLanguage, toggleSidebar } = useAppStore();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ar" : "en");
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-30 h-16",
                "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
                "border-b border-neutral-200 dark:border-neutral-800",
                "flex items-center justify-between px-6"
            )}
        >
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                >
                    <Menu className="w-5 h-5" />
                </Button>

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-64">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-neutral-400"
                    />
                    <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-700 px-1.5 font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
                        ⌘K
                    </kbd>
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

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-700">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {user?.userName || "User"}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {user?.role || "Guest"}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary-500/20">
                        {user?.userName?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                    </div>
                </div>
            </div>
        </header>
    );
}
