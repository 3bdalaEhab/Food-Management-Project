import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, selectIsAdmin } from "@/stores";
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

export function MobileBottomNav() {
    const { t } = useTranslation();
    const location = useLocation();
    const isAdmin = useAuthStore(selectIsAdmin);

    const filteredNavItems = useMemo(() => {
        const filtered = navItems.filter((item) => {
            if (item.adminOnly && !isAdmin) return false;
            if (item.hideForAdmin && isAdmin) return false;
            return true;
        });
        // Show max 5 items in bottom nav
        return filtered.slice(0, 5);
    }, [isAdmin]);

    return (
        <nav
            className={cn(
                "fixed bottom-0 inset-inline-start-0 inset-inline-end-0 z-40",
                "h-20 md:hidden",
                "bg-[var(--sidebar-background)]/98 backdrop-blur-xl",
                "border-t border-[var(--sidebar-border)]",
                "shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
                "dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
            )}
            aria-label="Mobile navigation"
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/10 to-transparent pointer-events-none" />

            {/* Navigation Items Container */}
            <div className="relative h-full flex items-center justify-around px-2">
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300",
                                "min-w-[64px] active:scale-95",
                                isActive
                                    ? "text-[var(--sidebar-foreground)]"
                                    : "text-[var(--muted-foreground)]"
                            )}
                            aria-current={isActive ? "page" : undefined}
                            aria-label={t(`sidebar.${item.labelKey}`)}
                        >
                            {/* Active Background Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-bottom-nav-active"
                                    className={cn(
                                        "absolute inset-0 rounded-2xl",
                                        isAdmin
                                            ? "bg-red-500/10"
                                            : "bg-primary-500/10"
                                    )}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                />
                            )}

                            {/* Icon Container */}
                            <div
                                className={cn(
                                    "relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
                                    isActive
                                        ? isAdmin
                                            ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                                            : "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                        : "bg-[var(--background)] border border-[var(--sidebar-border)]"
                                )}
                            >
                                <Icon
                                    size={isActive ? 20 : 18}
                                    className="relative z-10 transition-all duration-300"
                                    strokeWidth={isActive ? 2.5 : 2}
                                />

                                {/* Pulsing glow for active item */}
                                {isActive && (
                                    <motion.div
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className={cn(
                                            "absolute inset-0 rounded-xl blur-md",
                                            isAdmin ? "bg-red-500" : "bg-primary-500"
                                        )}
                                    />
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={cn(
                                    "text-[9px] font-black uppercase tracking-wider transition-all duration-300 relative z-10",
                                    isActive
                                        ? isAdmin
                                            ? "text-red-500"
                                            : "text-primary-500"
                                        : "text-[var(--muted-foreground)]"
                                )}
                            >
                                {t(`sidebar.${item.labelKey}`)}
                            </span>

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-bottom-nav-dot"
                                    className={cn(
                                        "absolute -top-1 w-1 h-1 rounded-full",
                                        isAdmin ? "bg-red-500" : "bg-primary-500"
                                    )}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Safe area for devices with bottom notch */}
            <div className="absolute bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-[var(--sidebar-background)] -z-10" />
        </nav>
    );
}
