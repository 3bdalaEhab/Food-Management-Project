import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    ChefHat,
    Sparkles,
    Zap,
    ShieldCheck,
    Box
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
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, labelKey: "dashboard", href: "/dashboard" },
    { icon: UtensilsCrossed, labelKey: "recipes", href: "/dashboard/recipes" },
    { icon: FolderOpen, labelKey: "categories", href: "/dashboard/categories", adminOnly: true },
    { icon: Users, labelKey: "users", href: "/dashboard/users", adminOnly: true },
    { icon: Heart, labelKey: "favorites", href: "/dashboard/favorites" },
];

export function Sidebar() {
    const { t } = useTranslation();
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore(selectIsAdmin);
    const { sidebarCollapsed, toggleSidebar, language } = useAppStore();

    const isRtl = language === "ar";

    const filteredNavItems = useMemo(() =>
        navItems.filter((item) => !item.adminOnly || isAdmin),
        [isAdmin]
    );

    const springConfig = { type: "spring", stiffness: 300, damping: 30 };

    return (
        <motion.aside
            initial={false}
            animate={{
                width: sidebarCollapsed ? 96 : 300,
                x: 0
            }}
            transition={springConfig}
            className={cn(
                "fixed top-0 z-50 h-screen",
                isRtl ? "right-0" : "left-0",
                "bg-white/40 dark:bg-black/30 backdrop-blur-[40px] saturate-150",
                isRtl ? "border-l" : "border-r",
                "border-white/20 dark:border-white/5",
                "flex flex-col overflow-hidden",
                "shadow-[0_0_80px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(0,0,0,0.4)]"
            )}
        >
            {/* Elite Brand Hub */}
            <div className="relative flex items-center justify-between px-6 h-28 border-b border-white/10 overflow-hidden">
                <Link to="/dashboard" className="flex items-center gap-5 group">
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        className="w-14 h-14 rounded-2xl bg-neutral-950 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:shadow-primary-500/40 transition-shadow duration-500"
                    >
                        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <ChefHat className="w-7 h-7 text-white relative z-10" />
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {!sidebarCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                className="flex flex-col"
                            >
                                <span className="font-black text-2xl text-neutral-900 dark:text-white tracking-tighter leading-none uppercase italic">
                                    CULINARY<span className="text-primary-500 italic">HUB</span>
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] uppercase font-black tracking-[0.2em] text-neutral-400">OS_CORE_v4</span>
                                    <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-950 text-white rounded-2xl hidden lg:flex items-center justify-center hover:bg-primary-500 transition-all shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] ring-4 ring-white/5 dark:ring-black/20",
                        isRtl ? "-left-5" : "-right-5"
                    )}
                >
                    {sidebarCollapsed ? (isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />) : (isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)}
                </motion.button>
            </div>

            {/* User Identity Port (If Expanded) */}
            <AnimatePresence>
                {!sidebarCollapsed && user && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="px-6 py-8"
                    >
                        <Link to="/dashboard/profile" className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-950 text-white shadow-2xl relative group overflow-hidden border border-white/5 hover:border-primary-500/50 transition-colors">
                            <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-2xl bg-neutral-900 overflow-hidden border border-white/10 relative">
                                {user.imagePath ? (
                                    <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ChefHat size={20} className="text-white/20" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black truncate uppercase italic tracking-tight">{user.userName}</p>
                                <p className="text-[9px] font-black text-primary-500 uppercase tracking-widest">{user.role}</p>
                            </div>
                            <ShieldCheck size={16} className="text-primary-500 opacity-50" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar Hub Transition */}
            <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto no-scrollbar">
                {!sidebarCollapsed && (
                    <p className="px-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-4">Tactical_Systems</p>
                )}

                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-5 px-5 py-4 rounded-[2rem] transition-all duration-500",
                                "group relative overflow-hidden",
                                isActive
                                    ? "bg-neutral-950 text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
                                    : "text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
                            )}
                        >
                            <div className={cn(
                                "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 relative",
                                isActive ? "bg-primary-500 shadow-[0_0_20px_rgba(255,107,38,0.4)]" : "bg-neutral-100 dark:bg-white/5 group-hover:bg-primary-500/10 group-active:scale-95"
                            )}>
                                <Icon className={cn(
                                    "w-5.5 h-5.5 transition-colors duration-500",
                                    isActive ? "text-white" : "text-neutral-400 group-hover:text-primary-500"
                                )} />
                                {isActive && (
                                    <motion.div
                                        layoutId="glow"
                                        className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"
                                    />
                                )}
                            </div>

                            {!sidebarCollapsed && (
                                <span className="font-black uppercase tracking-[0.15em] text-[11px] italic">
                                    {t(`sidebar.${item.labelKey}`)}
                                </span>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="active-marker"
                                    transition={springConfig}
                                    className={cn(
                                        "absolute top-1/2 -translate-y-1/2 w-2 h-10 bg-primary-500",
                                        isRtl ? "left-0 rounded-r-2xl" : "right-0 rounded-l-2xl"
                                    )}
                                />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 opacity-40">
                    <div className="h-px bg-white/10 mx-6 mb-8" />
                </div>
            </div>

            {/* Tactical Footer Console */}
            <div className="p-6 border-t border-white/10 space-y-4">
                <Link
                    to="/dashboard/profile"
                    className={cn(
                        "flex items-center gap-5 p-4 rounded-[1.5rem] text-neutral-500 hover:bg-neutral-950 hover:text-white transition-all group relative overflow-hidden",
                        sidebarCollapsed && "justify-center"
                    )}
                >
                    <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Settings
                        size={22}
                        className="group-hover:rotate-90 transition-transform duration-700 relative z-10"
                    />
                    {!sidebarCollapsed && (
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] relative z-10 italic">
                            {t('sidebar.settings')}
                        </span>
                    )}
                </Link>

                <button
                    onClick={logout}
                    className={cn(
                        "w-full flex items-center gap-5 p-4 rounded-[1.5rem] text-red-500/60 hover:bg-red-500 hover:text-white transition-all group shadow-xl",
                        sidebarCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={22} className={cn("transition-transform", isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1")} />
                    {!sidebarCollapsed && (
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">
                            {t('sidebar.logout')}
                        </span>
                    )}
                </button>

                {!sidebarCollapsed && (
                    <div className="pt-4 flex items-center justify-between px-2 opacity-20">
                        <Box size={14} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Sys_v4.5.12_Stable</span>
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
