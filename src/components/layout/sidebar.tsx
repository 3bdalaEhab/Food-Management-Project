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
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useAppStore, selectIsAdmin } from "@/stores";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
    adminOnly?: boolean;
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard Hub", href: "/dashboard" },
    { icon: UtensilsCrossed, label: "Culinary Studio", href: "/dashboard/recipes" },
    { icon: FolderOpen, label: "Categories", href: "/dashboard/categories", adminOnly: true },
    { icon: Users, label: "User Fleet", href: "/dashboard/users", adminOnly: true },
    { icon: Heart, label: "Collection", href: "/dashboard/favorites" },
];

export function Sidebar() {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const isAdmin = useAuthStore(selectIsAdmin);
    const { sidebarCollapsed, toggleSidebar } = useAppStore();

    const filteredNavItems = navItems.filter(
        (item) => !item.adminOnly || isAdmin
    );

    return (
        <motion.aside
            initial={false}
            animate={{ width: sidebarCollapsed ? 80 : 280 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed left-0 top-0 z-50 h-screen",
                "bg-white/40 dark:bg-black/20 backdrop-blur-3xl",
                "border-r border-white/20 dark:border-white/5",
                "flex flex-col",
                "shadow-[0_0_50px_rgba(0,0,0,0.05)]"
            )}
        >
            {/* Brand Header */}
            <div className="relative flex items-center justify-between p-6 h-24 border-b border-white/10">
                <Link to="/dashboard" className="flex items-center gap-4 group">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:shadow-primary-500/20 transition-all"
                    >
                        <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <ChefHat className="w-6 h-6 text-white relative z-10" />
                    </motion.div>

                    <AnimatePresence>
                        {!sidebarCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex flex-col"
                            >
                                <span className="font-black text-xl text-neutral-900 dark:text-white tracking-tighter leading-none">
                                    CULINARY<span className="text-primary-500 italic">CORE</span>
                                </span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mt-1">Management v4.0</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 text-white rounded-xl hidden lg:flex items-center justify-center hover:bg-primary-500 transition-all shadow-xl ring-4 ring-white dark:ring-neutral-900"
                >
                    {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Nav Ecosystem */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300",
                                "group relative overflow-hidden",
                                isActive
                                    ? "bg-neutral-900 text-white shadow-2xl shadow-neutral-900/20"
                                    : "text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                isActive ? "bg-primary-500" : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-500/10"
                            )}>
                                <Icon className={cn(
                                    "w-5 h-5",
                                    isActive ? "text-white" : "text-neutral-400 group-hover:text-primary-500"
                                )} />
                            </div>

                            {!sidebarCollapsed && (
                                <span className="font-black uppercase tracking-widest text-xs">
                                    {item.label}
                                </span>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary-500 rounded-l-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Tactical Footer */}
            <div className="p-6 border-t border-white/10 space-y-3">
                <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-4 p-3 rounded-2xl text-neutral-500 hover:bg-white dark:hover:bg-white/5 transition-all group"
                >
                    <Settings size={20} className="group-hover:rotate-45 transition-transform" />
                    {!sidebarCollapsed && <span className="text-xs font-black uppercase tracking-widest">Settings Hub</span>}
                </Link>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-red-500/10 group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {!sidebarCollapsed && <span className="text-xs font-black uppercase tracking-widest">Eject Session</span>}
                </button>
            </div>
        </motion.aside>
    );
}
