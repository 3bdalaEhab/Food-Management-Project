import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    ArrowRight,
    Sparkles,
    Zap,
    Clock,
    Activity,
    ChefHat
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { useTranslation } from "react-i18next";
import { PageWrapper, staggeredItemVariants } from "@/components/shared/page-wrapper";
import { SEO } from "@/components/shared/seo";
import { cn } from "@/lib/utils";

import { StatCard } from "./stat-card";

export function DashboardPage() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);

    const stats = useMemo(() => [
        {
            icon: UtensilsCrossed,
            label: t('dashboard.recipes_vault'),
            value: "156",
            trend: "+12.5%",
            color: "bg-[var(--sidebar-background)] border border-[var(--border)]",
            iconColor: "text-[var(--foreground)]",
            iconBg: "bg-[var(--muted)]/50",
            chartType: "line" as const,
            chartUnit: t('charts.units'),
            chartDescription: t('charts.recipes_trend'),
            chartData: [
                { name: 'Jan', value: 40 },
                { name: 'Feb', value: 60 },
                { name: 'Mar', value: 45 },
                { name: 'Apr', value: 90 },
                { name: 'May', value: 120 },
                { name: 'Jun', value: 156 },
            ]
        },
        {
            icon: FolderOpen,
            label: t('dashboard.active_protocols'),
            value: "24",
            trend: "+3.2%",
            color: "bg-primary-500 shadow-primary-500/20",
            iconColor: "text-primary-500",
            iconBg: "bg-primary-500/10",
            chartType: "bar" as const,
            chartUnit: t('charts.category'),
            chartDescription: t('charts.categories_distribution'),
            chartData: [
                { name: t('dashboard.taxonomy'), value: 10 },
                { name: 'Italian', value: 15 },
                { name: 'Mexican', value: 8 },
                { name: 'French', value: 5 },
                { name: 'Asian', value: 12 },
            ],
        },
        {
            icon: Users,
            label: t('dashboard.managed_fleet'),
            value: "1.2k",
            trend: "+18.9%",
            color: "bg-[var(--sidebar-background)] border border-[var(--border)]",
            iconColor: "text-[var(--foreground)]",
            iconBg: "bg-[var(--muted)]/50",
            chartType: "area" as const,
            chartUnit: t('users.agents'),
            chartDescription: t('charts.users_growth'),
            chartData: [
                { name: 'Week 1', value: 200 },
                { name: 'Week 2', value: 450 },
                { name: 'Week 3', value: 800 },
                { name: 'Week 4', value: 1200 },
            ]
        },
        {
            icon: Heart,
            label: t('dashboard.curated_picks'),
            value: "89",
            trend: "+5.1%",
            color: "bg-[var(--sidebar-background)] border border-[var(--border)]",
            iconColor: "text-[var(--foreground)]",
            iconBg: "bg-[var(--muted)]/50",
            chartType: "area" as const,
            chartUnit: t('charts.count'),
            chartDescription: t('charts.favorites_breakdown'),
            chartData: [
                { name: 'Pasta', value: 30 },
                { name: 'Pizza', value: 25 },
                { name: 'Salads', value: 20 },
                { name: 'Sweets', value: 14 },
            ],
        },
    ], [t]);

    const chefName = useMemo(() => {
        if (!user?.userName) return t('navbar.expert');
        const firstPart = user.userName.split(' ')[0] || '';
        return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
    }, [user, t]);

    return (
        <PageWrapper>
            <div className="space-y-10" role="main">
                <SEO
                    title={t('dashboard.title') || 'Command Center'}
                    description={t('dashboard.description')}
                />
                {/* World Class Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[var(--sidebar-background)] p-6 md:p-10 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
                >
                    {/* Elite Chromatic Mesh */}
                    <div className="absolute inset-0 bg-mesh-gradient-1 opacity-30" />
                    <div className="absolute inset-0 bg-mesh-gradient-2 opacity-30" />
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <ChefHat size={300} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="px-5 py-2 rounded-full bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border)] flex items-center gap-2 shadow-inner">
                                    <Activity size={14} className="text-primary-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[var(--muted-foreground)] rtl:not-italic">{t('dashboard.system_online')}</span>
                                </div>
                                <div className="px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                    <Zap size={14} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-primary-500 rtl:not-italic">{t('dashboard.elite_access')}</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter rtl:tracking-normal leading-[0.85] text-[var(--foreground)] uppercase group">
                                {t('dashboard.welcome')}{' '}
                                <span className="text-primary-500 italic rtl:not-italic block mt-1 relative">
                                    Chef {chefName}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 1, duration: 2 }}
                                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 to-transparent opacity-30"
                                    />
                                </span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold max-w-2xl tracking-tight text-base md:text-lg leading-relaxed opacity-80 border-s-2 border-primary-500/20 ps-6">
                                {t('dashboard.description')}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/dashboard/recipes" className="premium-button premium-button-primary px-8 h-14 group shadow-[0_20px_40px_rgba(255,107,38,0.2)]">
                                    <span className="font-black uppercase tracking-widest rtl:tracking-normal text-sm rtl:not-italic">{t('dashboard.access_vault')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-all duration-500 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Elite Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} variants={staggeredItemVariants} className="h-full">
                            <StatCard {...stat} delay={index * 0.1} />
                        </motion.div>
                    ))}
                </div>

                {/* Data Ecosystem */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Advanced Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                                    <Clock className="text-primary-500" size={24} />
                                </div>
                                <h2 className="text-3xl font-black tracking-tighter rtl:tracking-normal text-[var(--foreground)] uppercase italic rtl:not-italic">{t('dashboard.stream_feed')}</h2>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[var(--muted-foreground)] border border-[var(--border)] px-4 py-2 rounded-full bg-[var(--sidebar-background)] rtl:not-italic">{t('dashboard.real_time')}</span>
                        </div>

                        <div className="glass-card rounded-[2.5rem] overflow-hidden border border-[var(--border)] bg-[var(--sidebar-background)]/40 backdrop-blur-xl p-6 md:p-8 shadow-2xl relative">
                            {/* Technical Floating Indicators */}
                            <div className="absolute top-4 right-8 flex gap-4 opacity-20 pointer-events-none">
                                <div className="text-[8px] font-black uppercase tracking-widest">[ STREAM_OK ]</div>
                                <div className="text-[8px] font-black uppercase tracking-widest">[ SYNC_99% ]</div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { action: t('dashboard.vault_update'), item: t('dashboard.pasta_carbonara'), time: t('dashboard.2_min_ago'), icon: UtensilsCrossed, status: "active" },
                                    { action: t('dashboard.metadata_sync'), item: t('dashboard.italian_refined'), time: t('dashboard.1_hour_ago'), icon: FolderOpen, status: "syncing" },
                                    { action: t('dashboard.fleet_join'), item: t('dashboard.agent_authorized'), time: t('dashboard.3_hours_ago'), icon: Users, status: "pending" },
                                    { action: t('dashboard.curation'), item: t('dashboard.ramen_favorited'), time: t('dashboard.5_hours_ago'), icon: Heart, status: "completed" },
                                ].map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-6 group cursor-pointer hover:bg-[var(--foreground)]/[0.03] p-4 md:p-5 rounded-2xl transition-all duration-500 border border-transparent hover:border-[var(--border)] hover:shadow-lg relative overflow-hidden"
                                    >
                                        {/* Pulse Status Indicator */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                                        <div className="w-14 h-14 rounded-xl bg-[var(--sidebar-background)] flex items-center justify-center border border-[var(--border)] shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                                            <activity.icon className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        activity.status === 'active' ? 'bg-green-500 animate-pulse' :
                                                            activity.status === 'syncing' ? 'bg-blue-500 animate-spin' :
                                                                'bg-primary-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]'
                                                    )} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-primary-500/70 group-hover:text-primary-500 transition-colors rtl:not-italic">{activity.action}</span>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-widest rtl:tracking-normal text-[var(--muted-foreground)] opacity-50 rtl:not-italic">{activity.time}</span>
                                            </div>
                                            <p className="text-base font-black text-[var(--foreground)] uppercase tracking-tight rtl:tracking-normal group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:not-italic">{activity.item}</p>
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
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 px-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                                <Sparkles className="text-primary-500" size={24} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter rtl:tracking-normal text-[var(--foreground)] uppercase italic rtl:not-italic">{t('dashboard.shortcuts')}</h2>
                        </div>

                        <div className="glass-card rounded-[2.5rem] border border-[var(--border)] bg-[var(--sidebar-background)]/80 backdrop-blur-2xl p-6 md:p-8 space-y-4 shadow-2xl border-white/5">
                            <Link to="/dashboard/recipes" className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[var(--background)]/50 text-[var(--foreground)] border border-[var(--border)] hover:border-primary-500 transition-all duration-500 group overflow-hidden relative shadow-inner">
                                <div className="w-10 h-10 rounded-xl bg-[var(--sidebar-background)] flex items-center justify-center shrink-0 border border-[var(--border)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                                    <UtensilsCrossed size={16} className="text-primary-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[9px] text-primary-500/80 rtl:not-italic">{t('dashboard.studio')}</span>
                                    <span className="text-xs font-black uppercase text-[var(--foreground)] tracking-tight rtl:tracking-normal rtl:not-italic">{t('dashboard.manage_recipes')}</span>
                                </div>
                                <ArrowRight className="absolute end-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-500 text-primary-500 rtl:rotate-180" size={18} />
                            </Link>

                            <Link to="/dashboard/categories" className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)] hover:border-primary-500 transition-all duration-500 group relative shadow-inner">
                                <div className="w-10 h-10 rounded-xl bg-[var(--sidebar-background)] flex items-center justify-center shrink-0 border border-[var(--border)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                                    <FolderOpen size={16} className="text-[var(--muted-foreground)] group-hover:text-primary-500" />
                                </div>
                                <div className="flex flex-col text-[var(--foreground)]">
                                    <span className="font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[9px] text-[var(--muted-foreground)]/60 rtl:not-italic">{t('dashboard.taxonomy')}</span>
                                    <span className="text-xs font-black uppercase text-[var(--foreground)] tracking-tight rtl:tracking-normal rtl:not-italic">{t('dashboard.organize_categories')}</span>
                                </div>
                                <ArrowRight className="absolute end-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-500 text-primary-500 rtl:rotate-180" size={18} />
                            </Link>

                            <div className="pt-4">
                                <div className="p-6 md:p-8 rounded-[2rem] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-primary-500/30 shadow-inner">
                                    <div className="relative z-10 space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                                            <Sparkles className="w-6 h-6 text-primary-500 opacity-80" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-xl italic rtl:not-italic leading-none tracking-tighter rtl:tracking-normal uppercase text-[var(--foreground)]">{t('dashboard.upgrade_pro')}</p>
                                            <p className="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-widest rtl:tracking-normal opacity-70 rtl:not-italic">{t('dashboard.get_access')}</p>
                                        </div>
                                        <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[9px] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,107,38,0.2)] rtl:not-italic">
                                            {t('dashboard.get_access')}
                                        </button>
                                    </div>
                                    <Activity className="absolute -bottom-10 -right-10 w-32 h-32 opacity-[0.03] group-hover:scale-125 group-hover:opacity-[0.07] transition-all duration-1000" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    );
}
