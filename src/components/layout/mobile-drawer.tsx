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
import { cn, getImageUrl } from "@/lib/utils";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";

export function MobileDrawer() {
    const { t } = useTranslation();
    const location = useLocation();
    const { mobileMenuOpen, setMobileMenuOpen, language } = useAppStore();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const finalImagePath = user?.imagePath;
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

                     <motion.div
                        initial={{ x: isRtl ? "100%" : "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: isRtl ? "100%" : "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                        className={cn(
                            "fixed top-0 bottom-0 z-[70] w-[85%] max-w-[340px] bg-[var(--sidebar-background)] border-white/10 flex flex-col lg:hidden",
                            "inset-inline-start-0 border-ie shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        )}
                    >
                        {/* High-End Tactical Backdrop Glow */}
                        <div className="absolute inset-0 bg-radial-fade opacity-50 pointer-events-none" />

                        {/* Top Identification Rail */}
                        <div className="relative p-6 pt-10 flex flex-col gap-8 shrink-0">
                            <div className="flex items-center justify-between">
                                <Link to="/dashboard" onClick={handleClose} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                                        <ChefHat className="text-white drop-shadow-lg" size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-xl text-[var(--sidebar-foreground)] tracking-tighter leading-none italic">
                                            {t('sidebar.culinary_command')}<span className="text-primary-500 not-italic uppercase ml-1 block text-[10px] tracking-[0.3em]">{t('sidebar.culinary_command_suffix')}</span>
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleClose}
                                    className="w-10 h-10 rounded-2xl bg-[var(--background)]/80 border border-[var(--sidebar-border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-white transition-all active:scale-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Mobile Profile HUD Integration */}
                            <div className={cn(
                                "flex items-center gap-4 p-4 rounded-3xl border relative bg-[var(--background)]/40 backdrop-blur-md overflow-hidden",
                                isAdmin ? "border-red-500/30" : "border-primary-500/30"
                            )}>
                                <div className="w-14 h-14 rounded-2xl bg-[var(--background)] overflow-hidden border border-[var(--sidebar-border)] shrink-0 shadow-lg p-0.5">
                                    <div className="w-full h-full rounded-[0.8rem] overflow-hidden bg-white/5 flex items-center justify-center">
                                        {finalImagePath ? (
                                            <ImageWithFallback src={getImageUrl(finalImagePath)} alt={user?.userName || "User"} className="w-full h-full object-cover" />
                                        ) : (
                                            <Sparkles size={24} className="text-primary-500/40" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-black text-[var(--sidebar-foreground)] uppercase tracking-tight truncate">{user?.userName || t('sidebar.guest_user')}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={cn("w-2 h-2 rounded-full animate-pulse", isAdmin ? "bg-red-500" : "bg-green-500")} />
                                        <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">{isAdmin ? t('sidebar.admin_strategist') : t('sidebar.field_operator')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 px-6 py-4 space-y-3 overflow-y-auto no-scrollbar">
                            <div className="px-4 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] opacity-40">{t('sidebar.management')}</span>
                            </div>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={handleClose}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 relative group border border-transparent shadow-sm",
                                            isActive
                                                ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)] shadow-xl"
                                                : "text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)]/50 hover:text-[var(--sidebar-foreground)]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500",
                                            isActive
                                                ? isAdmin ? "bg-red-500 text-white shadow-lg" : "bg-primary-500 text-white shadow-lg"
                                                : "bg-[var(--background)] border border-[var(--sidebar-border)] group-hover:border-primary-500/50"
                                        )}>
                                            <Icon size={20} className="relative z-10" />
                                        </div>
                                        <span className="font-extrabold uppercase tracking-widest text-[11px] italic rtl:not-italic">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobile-active-pill"
                                                className={cn(
                                                    "absolute w-1 h-6 rounded-full inset-inline-start-0",
                                                    isAdmin ? "bg-red-500" : "bg-primary-500"
                                                )}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-6 pb-10 border-t border-[var(--sidebar-border)] space-y-3 bg-[var(--background)]/40 shrink-0">
                            <Link
                                to="/dashboard/profile"
                                onClick={handleClose}
                                className="flex items-center gap-4 p-4 rounded-3xl text-[var(--muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)] transition-all group border border-transparent shadow-sm"
                                aria-label={t('sidebar.settings')}
                            >
                                <div className="w-11 h-11 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--sidebar-border)] group-hover:border-primary-500/50">
                                    <Settings size={20} className="group-hover:rotate-45 transition-transform" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest">{t('sidebar.settings')}</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 p-4 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white transition-all group border border-transparent shadow-sm shadow-red-500/10"
                                aria-label={t('sidebar.logout')}
                            >
                                <div className="w-11 h-11 rounded-2xl bg-[var(--background)] flex items-center justify-center border border-[var(--sidebar-border)] group-hover:bg-white/10 group-hover:border-transparent">
                                    <LogOut size={20} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest">{t('sidebar.shutdown_core')}</span>
                            </button>

                            <div className="flex items-center justify-between px-4 pt-4 opacity-40">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)] italic rtl:not-italic">{t('sidebar.culinary_command')} V4.9</span>
                                <Sparkles size={12} className="text-primary-500" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
