import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    LogOut,
    ChefHat,
    Box,
    Cpu,
    ShieldAlert,
    Terminal,
    Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useAppStore, selectIsAdmin } from "@/stores";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface NavItem {
    icon: React.ElementType;
    labelKey: string;
    href: string;
    adminOnly?: boolean;
    hideForAdmin?: boolean;
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, labelKey: "dashboard", href: "/dashboard" },
    { icon: UtensilsCrossed, labelKey: "recipes", href: "/dashboard/recipes" },
    { icon: FolderOpen, labelKey: "categories", href: "/dashboard/categories", adminOnly: true },
    { icon: Users, labelKey: "users", href: "/dashboard/users", adminOnly: true },
    { icon: Heart, labelKey: "favorites", href: "/dashboard/favorites", hideForAdmin: true },
];

export function Sidebar() {
    const { t } = useTranslation();
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore(selectIsAdmin);
    const { sidebarCollapsed, toggleSidebar, language } = useAppStore();

    const isRtl = language === "ar";
    const springConfig = { type: "spring", stiffness: 400, damping: 40 } as const;

    const filteredNavItems = useMemo(() =>
        navItems.filter((item) => {
            if (item.adminOnly && !isAdmin) return false;
            if (item.hideForAdmin && isAdmin) return false;
            return true;
        }),
        [isAdmin]
    );

    return (
        <motion.aside
            initial={false}
            animate={{
                width: sidebarCollapsed ? 88 : 280,
                x: 0
            }}
            transition={springConfig}
            className={cn(
                "fixed top-0 z-50 h-screen",
                "hidden md:flex",
                "inset-inline-start-0",
                "bg-[var(--sidebar-background)] border-[var(--sidebar-border)]",
                "border-ie",
                "flex-col shadow-lg overflow-hidden",
                "selection:bg-primary-500/30"
            )}
        >
            {/* Cinematic Tactical Layers */}
            <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

            {/* Header: Brand Protocol */}
            <div className="relative h-24 flex items-center px-6 shrink-0 border-b border-[var(--sidebar-border)]">
                <div
                    onClick={toggleSidebar}
                    className="flex items-center gap-4 group cursor-pointer w-full transition-all active:scale-95"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-[0_10px_30px_rgba(255,107,38,0.3)] relative overflow-hidden shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <ChefHat className="w-6 h-6 text-white relative z-10 drop-shadow-md" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                    {!sidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="font-black text-lg text-[var(--sidebar-foreground)] tracking-widest leading-none uppercase italic">
                                {t('sidebar.culinary_command')}
                                <span className="text-primary-500 block text-[10px] tracking-[0.4em] not-italic mt-1">{t('sidebar.culinary_command_suffix')}</span>
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Role HUD: Protocol Identifier */}
            {!sidebarCollapsed && (
                <div className="px-6 pt-6 shrink-0">
                    <div className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl border transition-all duration-500",
                        isAdmin
                            ? "bg-red-500/10 border-red-500/30 shadow-[0_10px_30px_rgba(239,68,68,0.1)]"
                            : "bg-primary-500/10 border-primary-500/30 shadow-[0_10px_30px_rgba(255,107,38,0.1)]"
                    )}>
                        <div className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                            isAdmin ? "bg-red-500 text-white shadow-[0_5px_15px_rgba(239,68,68,0.4)]" : "bg-primary-500 text-white shadow-[0_5px_15px_rgba(255,107,38,0.4)]"
                        )}>
                            {isAdmin ? <ShieldAlert size={18} /> : <Terminal size={18} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('sidebar.auth_level')}</span>
                            <span className={cn(
                                "text-[12px] font-black uppercase tracking-tighter truncate",
                                isAdmin ? "text-red-500" : "text-primary-500"
                            )}>
                                {isAdmin ? t('sidebar.admin_strategist') : t('sidebar.field_operator')}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation: Tactical Nodes */}
            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth min-h-0">
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    const navItemContent = (
                        <Link
                            to={item.href}
                            className={cn(
                                "flex items-center transition-all duration-300 group relative",
                                sidebarCollapsed
                                    ? "justify-center h-14 w-14 mx-auto rounded-xl mb-3"
                                    : "gap-4 px-4 py-3 rounded-2xl mx-1",
                                isActive
                                    ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-foreground)] shadow-sm border border-[var(--sidebar-border)]"
                                    : "text-[var(--muted-foreground)] hover:text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                            )}
                            aria-label={t(`sidebar.${item.labelKey}`)}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 relative",
                                isActive
                                    ? isAdmin ? "bg-red-500 text-white shadow-lg" : "bg-primary-500 text-white shadow-lg"
                                    : "bg-[var(--background)] border border-[var(--sidebar-border)] group-hover:border-primary-500/50"
                            )}>
                                <Icon size={isActive ? 20 : 18} className="relative z-10" />
                                {isActive && (
                                    <motion.div
                                        layoutId="active-glow"
                                        className={cn(
                                            "absolute inset-0 blur-xl rounded-full opacity-40",
                                            isAdmin ? "bg-red-500" : "bg-primary-500"
                                        )}
                                    />
                                )}
                            </div>

                            {!sidebarCollapsed && (
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] italic truncate">
                                        {t(`sidebar.${item.labelKey}`)}
                                    </span>
                                </div>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className={cn(
                                        "absolute w-1 h-6 rounded-full",
                                        isAdmin ? "bg-red-500 shadow-red-500/50" : "bg-primary-500 shadow-primary-500/50",
                                        "inset-inline-start-0"
                                    )}
                                />
                            )}
                        </Link>
                    );

                    return (
                        <div key={item.href}>
                            {navItemContent}
                        </div>
                    );
                })}
            </nav>

            {/* Footer: User Identity & Exit Protocol */}
            <div className="p-4 shrink-0 border-t border-[var(--sidebar-border)] space-y-4">
                <Link
                    to="/dashboard/profile"
                    className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl bg-[var(--sidebar-accent)] border border-[var(--sidebar-border)] transition-all group relative overflow-hidden hover:border-primary-500/30",
                        sidebarCollapsed && "justify-center h-14 w-14 p-0 mx-auto"
                    )}
                >
                    <div className="w-10 h-10 rounded-xl bg-[var(--background)] overflow-hidden border border-[var(--sidebar-border)] group-hover:border-primary-500/50 transition-colors shrink-0 flex items-center justify-center">
                        {user?.imagePath ? (
                            <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover object-center" />
                        ) : (
                            <Fingerprint size={20} className="text-[var(--muted-foreground)] group-hover:text-primary-500 transition-colors" />
                        )}
                    </div>
                    {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-black text-[var(--sidebar-foreground)] uppercase italic tracking-tighter truncate">{user?.userName || t('sidebar.guest_user')}</p>
                            <div className="flex items-center gap-1.5 opacity-60">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">{t('sidebar.active_term')}</span>
                            </div>
                        </div>
                    )}
                </Link>

                <button
                    onClick={logout}
                    className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-2xl text-[var(--muted-foreground)] hover:text-white hover:bg-red-500 transition-all group overflow-hidden border border-transparent font-sans",
                        sidebarCollapsed && "justify-center h-14 w-14 p-0 mx-auto"
                    )}
                    aria-label={t('sidebar.logout')}
                >
                    <LogOut size={18} className={cn("transition-transform font-sans", isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1")} />
                    {!sidebarCollapsed && (
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">
                            {t('sidebar.shutdown_core')}
                        </span>
                    )}
                </button>

                {!sidebarCollapsed && (
                    <div className="flex items-center justify-between px-2 pt-2 opacity-30">
                        <div className="flex gap-1.5">
                            <Box size={12} className="text-[var(--muted-foreground)]" />
                            <Cpu size={12} className="text-primary-500" />
                        </div>
                        <span className="text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-widest tabular-nums font-mono">{t('sidebar.version')}</span>
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
