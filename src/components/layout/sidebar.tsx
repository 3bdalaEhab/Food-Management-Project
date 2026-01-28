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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useAppStore, selectIsAdmin } from "@/stores";
import { Button } from "@/components/ui";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
    adminOnly?: boolean;
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: UtensilsCrossed, label: "Recipes", href: "/dashboard/recipes" },
    { icon: FolderOpen, label: "Categories", href: "/dashboard/categories", adminOnly: true },
    { icon: Users, label: "Users", href: "/dashboard/users", adminOnly: true },
    { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "fixed left-0 top-0 z-40 h-screen",
                "bg-white dark:bg-neutral-900",
                "border-r border-neutral-200 dark:border-neutral-800",
                "flex flex-col",
                "shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/50"
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <ChefHat className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence>
                        {!sidebarCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="font-bold text-lg text-neutral-900 dark:text-white overflow-hidden whitespace-nowrap"
                            >
                                Food<span className="text-primary-500">Manager</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={toggleSidebar}
                    className="hidden lg:flex"
                >
                    {sidebarCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                "group relative",
                                isActive
                                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
                                    isActive && "text-white"
                                )}
                            />
                            <AnimatePresence>
                                {!sidebarCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="font-medium overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Tooltip for collapsed state */}
                            {sidebarCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <Link
                    to="/dashboard/profile"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                        "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    <AnimatePresence>
                        {!sidebarCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-medium"
                            >
                                Settings
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                <button
                    onClick={logout}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                        "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    )}
                >
                    <LogOut className="w-5 h-5" />
                    <AnimatePresence>
                        {!sidebarCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-medium"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    );
}
