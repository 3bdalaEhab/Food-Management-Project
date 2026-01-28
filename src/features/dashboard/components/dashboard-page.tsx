import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    TrendingUp,
    Plus,
    ArrowRight,
    Sparkles,
    Zap,
    Clock,
    Activity,
    ChefHat
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore, selectIsAdmin } from "@/stores";
import { useTranslation } from "react-i18next";
import { staggeredItemVariants } from "@/components/shared/page-wrapper";
import { SEO } from "@/components/shared/seo";

// --- Elite Sub-Components ---
const StatCard = memo(({
    icon: Icon,
    label,
    value,
    trend,
    color,
    delay,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
    delay: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="group relative"
            role="status"
            aria-label={`${label}: ${value}`}
        >
            <div className="absolute inset-0 bg-primary-500/5 blur-2xl group-hover:bg-primary-500/10 transition-all rounded-[2.5rem]" />
            <div className="relative glass-card rounded-[2.5rem] p-8 border border-[var(--border)] bg-white/40 dark:bg-black/20 backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-5px] overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                <div className="flex flex-col gap-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl", color)}>
                        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{label}</p>
                        <div className="flex items-end gap-3">
                            <p className="text-4xl font-black text-[var(--foreground)] tracking-tighter">{value}</p>
                            {trend && (
                                <div className="flex items-center gap-1 text-green-500 mb-1.5" aria-label={`Trend: up by ${trend}`}>
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-[10px] font-black uppercase">{trend}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

StatCard.displayName = "StatCard";

import { cn } from "@/lib/utils";

export function DashboardPage() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore(selectIsAdmin);

    const stats = useMemo(() => [
        {
            icon: UtensilsCrossed,
            label: t('dashboard.recipes_vault'),
            value: "156",
            trend: "+12.5%",
            color: "bg-[var(--sidebar-background)] border border-[var(--border)]",
        },
        {
            icon: FolderOpen,
            label: t('dashboard.active_protocols'),
            value: "24",
            trend: "+3.2%",
            color: "bg-primary-500 shadow-primary-500/20",
        },
        {
            icon: Users,
            label: t('dashboard.managed_fleet'),
            value: "1.2k",
            trend: "+18.9%",
            color: "bg-[var(--sidebar-background)] border border-[var(--border)]",
        },
        {
            icon: Heart,
            label: t('dashboard.curated_picks'),
            value: "89",
            trend: "+5.1%",
            color: "bg-red-500 shadow-red-500/20",
        },
    ], [t]);

    return (
        <div className="space-y-10" role="main">
            <SEO
                title={t('dashboard.title') || 'Command Center'}
                description={t('dashboard.description')}
            />
            {/* World Class Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[4rem] bg-[var(--sidebar-background)] p-12 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
            >
                {/* Elite Chromatic Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.6_0.28_45/0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_120%,oklch(0.58_0.17_145/0.1)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <ChefHat size={200} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                <Activity size={12} className="text-primary-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('dashboard.system_online')}</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Zap size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-500">{t('dashboard.elite_access')}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-[var(--foreground)]">
                            {t('dashboard.welcome')}, <span className="text-primary-500 italic">Chef {user?.userName?.split(' ')[0] || t('navbar.expert')}</span>
                        </h1>
                        <p className="text-[var(--muted-foreground)] font-bold max-w-2xl tracking-tight text-lg">
                            {t('dashboard.description')}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {isAdmin && (
                                <Link to="/dashboard/recipes/new" className="premium-button premium-button-primary px-8 h-14 group">
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    <span className="font-black uppercase tracking-widest text-xs">{t('dashboard.new_protocol')}</span>
                                </Link>
                            )}
                            <Link to="/dashboard/recipes" className="premium-button bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] px-8 h-14 group">
                                <span className="font-black uppercase tracking-widest text-xs">{t('dashboard.access_vault')}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Elite Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div key={stat.label} variants={staggeredItemVariants}>
                        <StatCard {...stat} delay={index * 0.1} />
                    </motion.div>
                ))}
            </div>

            {/* Data Ecosystem */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Advanced Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <Clock className="text-primary-500" size={24} />
                            <h2 className="text-2xl font-black tracking-tighter text-[var(--foreground)] uppercase italic">{t('dashboard.stream_feed')}</h2>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] border border-[var(--border)] px-3 py-1 rounded-full">{t('dashboard.real_time')}</span>
                    </div>

                    <div className="glass-card rounded-[3.5rem] overflow-hidden border border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-3xl p-10 shadow-2xl">
                        <div className="space-y-6">
                            {[
                                { action: t('dashboard.vault_update'), item: t('dashboard.pasta_carbonara'), time: t('dashboard.2_min_ago'), icon: UtensilsCrossed },
                                { action: t('dashboard.metadata_sync'), item: t('dashboard.italian_refined'), time: t('dashboard.1_hour_ago'), icon: FolderOpen },
                                { action: t('dashboard.fleet_join'), item: t('dashboard.agent_authorized'), time: t('dashboard.3_hours_ago'), icon: Users },
                                { action: t('dashboard.curation'), item: t('dashboard.ramen_favorited'), time: t('dashboard.5_hours_ago'), icon: Heart },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-6 group cursor-pointer hover:bg-[var(--background)]/50 p-4 rounded-3xl transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--sidebar-background)] flex items-center justify-center border border-[var(--border)] shrink-0">
                                        <activity.icon className="w-5 h-5 text-primary-500" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-primary-500">{activity.action}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{activity.time}</span>
                                        </div>
                                        <p className="text-sm font-black text-[var(--foreground)] uppercase tracking-tight">{activity.item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tactical Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 px-4">
                        <Sparkles className="text-primary-500" size={24} />
                        <h2 className="text-2xl font-black tracking-tighter text-[var(--foreground)] uppercase italic">{t('dashboard.shortcuts')}</h2>
                    </div>

                    <div className="glass-card rounded-[3rem] border border-[var(--border)] bg-[var(--sidebar-background)]/80 backdrop-blur-3xl p-8 space-y-4">
                        <Link to="/dashboard/recipes" className="flex items-center gap-4 p-5 rounded-3xl bg-[var(--sidebar-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-primary-500 transition-all group overflow-hidden relative">
                            <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center shrink-0">
                                <UtensilsCrossed size={18} className="text-primary-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black uppercase tracking-widest text-[10px]">{t('dashboard.studio')}</span>
                                <span className="text-xs font-bold text-[var(--muted-foreground)]">{t('dashboard.manage_recipes')}</span>
                            </div>
                            <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </Link>

                        <Link to="/dashboard/categories" className="flex items-center gap-4 p-5 rounded-3xl bg-[var(--sidebar-background)] border border-[var(--border)] hover:border-primary-500 transition-all group relative">
                            <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center shrink-0 group-hover:bg-primary-500/10">
                                <FolderOpen size={18} className="text-[var(--muted-foreground)] group-hover:text-primary-500" />
                            </div>
                            <div className="flex flex-col text-[var(--foreground)]">
                                <span className="font-black uppercase tracking-widest text-[10px]">{t('dashboard.taxonomy')}</span>
                                <span className="text-xs font-bold text-[var(--muted-foreground)]/60">{t('dashboard.organize_categories')}</span>
                            </div>
                        </Link>

                        <div className="pt-4">
                            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden group shadow-2xl shadow-primary-500/30 font-sans">
                                <div className="relative z-10 space-y-4">
                                    <Sparkles className="w-8 h-8 opacity-50" />
                                    <p className="font-black text-xl italic leading-none tracking-tighter uppercase">{t('dashboard.upgrade_pro')}</p>
                                    <button className="w-full py-3 bg-white text-primary-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">{t('dashboard.get_access')}</button>
                                </div>
                                <Activity className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:scale-120 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
