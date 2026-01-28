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

// --- Elite Sub-Components ---
function StatCard({
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
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-primary-500/5 transition-all rounded-[2.5rem]" />
            <div className="relative glass-card rounded-[2.5rem] p-8 border border-white/20 dark:border-white/5 bg-white/30 backdrop-blur-3xl shadow-2xl transition-all hover:translate-y-[-5px] overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                <div className="flex flex-col gap-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl", color)}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{label}</p>
                        <div className="flex items-end gap-3">
                            <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter">{value}</p>
                            {trend && (
                                <div className="flex items-center gap-1 text-green-500 mb-1.5">
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
}

import { cn } from "@/lib/utils";

export function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore(selectIsAdmin);

    const stats = [
        {
            icon: UtensilsCrossed,
            label: "Recipes in Vault",
            value: "156",
            trend: "+12.5%",
            color: "bg-neutral-900",
        },
        {
            icon: FolderOpen,
            label: "Active Protocols",
            value: "24",
            trend: "+3.2%",
            color: "bg-primary-500 shadow-primary-500/20",
        },
        {
            icon: Users,
            label: "Managed Fleet",
            value: "1.2k",
            trend: "+18.9%",
            color: "bg-neutral-900",
        },
        {
            icon: Heart,
            label: "Curated Picks",
            value: "89",
            trend: "+5.1%",
            color: "bg-red-500 shadow-red-500/20",
        },
    ];

    return (
        <div className="space-y-10">
            {/* World Class Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-neutral-950 p-12 text-white border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                {/* Decorative Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.2)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <ChefHat size={200} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                <Activity size={12} className="text-primary-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">System Online</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Zap size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">Elite Access</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                            Welcome, <span className="text-primary-500 italic">Chef {user?.userName || "Expert"}</span>
                        </h1>
                        <p className="text-white/40 font-bold max-w-2xl tracking-tight text-lg">
                            The culinary core is synchronized. manage your high-performance <br className="hidden md:block" />
                            recipes and categories with industrial precision.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {isAdmin && (
                                <Link to="/dashboard/recipes/new" className="premium-button premium-button-primary px-8 h-14 group">
                                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    <span className="font-black uppercase tracking-widest text-xs">New Protocol</span>
                                </Link>
                            )}
                            <Link to="/dashboard/recipes" className="premium-button bg-white/5 border-white/10 text-white hover:bg-white/10 px-8 h-14 group">
                                <span className="font-black uppercase tracking-widest text-xs">Access Vault</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Elite Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <StatCard key={stat.label} {...stat} delay={index * 0.1} />
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
                            <h2 className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase italic">Stream Feed</h2>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-200 dark:border-white/10 px-3 py-1 rounded-full">Real-time</span>
                    </div>

                    <div className="glass-card rounded-[3rem] overflow-hidden border border-white/20 dark:border-white/5 bg-white/30 backdrop-blur-3xl p-8">
                        <div className="space-y-6">
                            {[
                                { action: "VAULT UPDATE", item: "Pasta Carbonara Protocol Initialized", time: "2 MIN AGO", icon: UtensilsCrossed },
                                { action: "METADATA SYNC", item: "Italian Category Refined", time: "1 HOUR AGO", icon: FolderOpen },
                                { action: "FLEET JOIN", item: "Agent john@culinary.io Authorized", time: "3 HOURS AGO", icon: Users },
                                { action: "CURATION", item: "Spicy Ramen Favorited", time: "5 HOURS AGO", icon: Heart },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-6 group cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 p-4 rounded-3xl transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center border border-white/10 shrink-0">
                                        <activity.icon className="w-5 h-5 text-primary-500" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-primary-500">{activity.action}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{activity.time}</span>
                                        </div>
                                        <p className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-tight">{activity.item}</p>
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
                        <h2 className="text-2xl font-black tracking-tighter text-neutral-900 dark:text-white uppercase italic">Shortcuts</h2>
                    </div>

                    <div className="glass-card rounded-[3rem] border border-white/20 dark:border-white/5 bg-white/30 backdrop-blur-3xl p-8 space-y-4">
                        <Link to="/dashboard/recipes" className="flex items-center gap-4 p-5 rounded-3xl bg-neutral-900 text-white hover:bg-primary-500 transition-all group overflow-hidden relative">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                <UtensilsCrossed size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black uppercase tracking-widest text-[10px]">Studio</span>
                                <span className="text-xs font-bold opacity-60">Manage Recipes</span>
                            </div>
                            <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </Link>

                        <Link to="/dashboard/categories" className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-neutral-200 dark:border-white/10 hover:border-primary-500 transition-all group relative">
                            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-primary-500/10">
                                <FolderOpen size={18} className="text-neutral-500 group-hover:text-primary-500" />
                            </div>
                            <div className="flex flex-col text-neutral-900 dark:text-white">
                                <span className="font-black uppercase tracking-widest text-[10px]">Taxonomy</span>
                                <span className="text-xs font-bold opacity-60">Organize Categories</span>
                            </div>
                        </Link>

                        <div className="pt-4">
                            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden group shadow-2xl shadow-primary-500/30 font-sans">
                                <div className="relative z-10 space-y-4">
                                    <Sparkles className="w-8 h-8 opacity-50" />
                                    <p className="font-black text-xl italic leading-none tracking-tighter uppercase">Upgrade to <br /> Culinary Pro</p>
                                    <button className="w-full py-3 bg-white text-primary-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">Get Access</button>
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
