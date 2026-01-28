import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useCallback } from "react";
import {
    X,
    ChefHat,
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuthStore, useAppStore, selectIsAdmin } from "@/stores";
import { cn } from "@/lib/utils";

export function MobileDrawer() {
    const { t } = useTranslation();
    const location = useLocation();
    const { mobileMenuOpen, setMobileMenuOpen, language } = useAppStore();
    const logout = useAuthStore((state) => state.logout);
    const isAdmin = useAuthStore(selectIsAdmin);
    const isRtl = language === "ar";

    const navItems = useMemo(() => [
        { icon: LayoutDashboard, label: t('sidebar.dashboard'), href: "/dashboard" },
        { icon: UtensilsCrossed, label: t('sidebar.recipes'), href: "/dashboard/recipes" },
        { icon: FolderOpen, label: t('sidebar.categories'), href: "/dashboard/categories", adminOnly: true },
        { icon: Users, label: t('sidebar.users'), href: "/dashboard/users", adminOnly: true },
        { icon: Heart, label: t('sidebar.favorites'), href: "/dashboard/favorites" },
    ].filter(item => !item.adminOnly || isAdmin), [t, isAdmin]);

    const handleClose = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen]);

    const handleLogout = useCallback(() => {
        logout();
        setMobileMenuOpen(false);
    }, [logout, setMobileMenuOpen]);

    return (
        <AnimatePresence>
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[60] bg-neutral-950/80 backdrop-blur-xl lg:hidden"
                    />

                    {/* Drawer Console */}
                    <motion.div
                        initial={{ x: isRtl ? "100%" : "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: isRtl ? "100%" : "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed top-0 bottom-0 z-[70] w-full max-w-[320px] bg-neutral-950 border-white/10 flex flex-col lg:hidden",
                            isRtl ? "right-0 border-l" : "left-0 border-r"
                        )}
                    >
                        {/* Header: Identity Port */}
                        <div className="p-8 border-b border-white/10 flex items-center justify-between">
                            <Link to="/dashboard" onClick={handleClose} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center shadow-2xl shadow-primary-500/20">
                                    <ChefHat className="text-white" size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-xl text-white tracking-tighter leading-none">
                                        CULINARY<span className="text-primary-500 italic">CORE</span>
                                    </span>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mt-1">MOBILE PROTOCOL</span>
                                </div>
                            </Link>
                            <button
                                onClick={handleClose}
                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation Ecosystem */}
                        <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
                            <div className="px-4 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">Mission Parameters</span>
                            </div>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={handleClose}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden group",
                                            isActive
                                                ? "bg-primary-500 text-white shadow-2xl shadow-primary-500/20"
                                                : "text-neutral-500 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                            isActive ? "bg-white/20" : "bg-neutral-900 group-hover:bg-primary-500/10"
                                        )}>
                                            <Icon size={20} className={cn(isActive ? "text-white" : "text-neutral-400 group-hover:text-primary-500")} />
                                        </div>
                                        <span className="font-black uppercase tracking-widest text-xs">{item.label}</span>
                                        {isActive && (
                                            <motion.div layoutId="mobile-active" className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer Rail */}
                        <div className="p-8 border-t border-white/10 space-y-4 bg-neutral-900/50">
                            <Link
                                to="/dashboard/profile"
                                onClick={handleClose}
                                className="flex items-center gap-4 p-4 rounded-2xl text-neutral-500 hover:bg-white/5 transition-all group"
                            >
                                <Settings size={20} className="group-hover:rotate-45 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">{t('sidebar.settings')}</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                            >
                                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">{t('sidebar.logout')}</span>
                            </button>

                            <div className="flex items-center justify-center gap-2 pt-4 opacity-20">
                                <Sparkles size={12} className="text-primary-500" />
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Elite System V4.0</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
