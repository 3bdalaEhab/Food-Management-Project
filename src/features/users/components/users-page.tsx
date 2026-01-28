import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Mail,
    Phone,
    Globe,
    ShieldCheck,
    UserX,
    Sparkles,
    ChefHat,
    Zap,
    Activity,
    ArrowRight,
    ShieldAlert
} from "lucide-react";

import { useUsers, useDeleteUser } from "../hooks";

export function UsersPage() {
    const [search, setSearch] = useState("");
    const { data: usersData, isLoading } = useUsers({
        userName: search,
        pageSize: 12,
        pageNumber: 1
    });

    const { mutate: deleteUser } = useDeleteUser();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, x: -20, scale: 0.95 },
        show: { opacity: 1, x: 0, scale: 1 }
    };

    return (
        <div className="space-y-12 pb-24">
            {/* World Class Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-[var(--sidebar-background)] p-10 md:p-14 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Users size={200} strokeWidth={0.5} className="text-[var(--foreground)]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                <Sparkles size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Fleet Command</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Activity size={12} className="text-primary-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">Tactical Control</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase italic">
                            Agent <span className="text-primary-500 italic">Fleet</span>
                        </h1>
                        <p className="text-[var(--muted-foreground)] font-bold max-w-xl tracking-tight text-lg">
                            Monitor and manage project collaborators. verify identities, <br className="hidden md:block" />
                            assign protocols, and maintain project security.
                        </p>
                    </div>

                    <div className="flex bg-[var(--background)] border border-[var(--border)] p-6 rounded-[2.5rem]">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Active Fleet Size</p>
                            <p className="text-4xl font-black text-[var(--foreground)] italic">{usersData?.totalNumberOfRecords || 0} <span className="text-primary-500 text-sm">AGENTS</span></p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tactical Toolbar */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-0 bg-primary-500/5 blur-xl group-focus-within:bg-primary-500/10 transition-all rounded-3xl" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="SCAN COLLABORATORS (NAME/ROLE)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-16 h-18 bg-[var(--background)]/50 border-[var(--border)] backdrop-blur-3xl font-black uppercase tracking-widest text-sm"
                    />
                </div>
            </div>

            {/* User Fleet Grid */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-card rounded-[3rem] p-8 flex items-center gap-8 animate-pulse bg-white/30 dark:bg-white/5 border border-[var(--border)]">
                            <div className="w-20 h-20 rounded-[2rem] bg-neutral-200" />
                            <div className="flex-1 space-y-4">
                                <div className="h-8 w-1/4 bg-neutral-200 rounded-full" />
                                <div className="h-4 w-1/2 bg-neutral-200 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : usersData?.data?.length ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {usersData.data.map((user) => (
                            <motion.div
                                key={user.id}
                                variants={itemVariant}
                                layout
                                className="group relative glass-card rounded-[3rem] p-8 overflow-hidden border border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-3xl shadow-2xl transition-all duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-[var(--background)] hover:border-primary-500/30"
                            >
                                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 blur-3xl transition-all" />

                                <div className="relative z-10 flex items-center gap-8">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-[2rem] bg-[var(--background)] overflow-hidden flex items-center justify-center border-4 border-[var(--border)] shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                            {user.imagePath ? (
                                                <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                                            ) : (
                                                <ChefHat className="text-[var(--muted-foreground)]/30" size={36} />
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,107,38,0.4)] ring-4 ring-[var(--sidebar-background)] group-hover:rotate-12 transition-transform">
                                            <ShieldCheck size={16} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <Zap size={10} className="text-primary-500 fill-primary-500" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">Authorized Agent</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter uppercase italic leading-none group-hover:text-primary-500 transition-colors">
                                            {user.userName}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-6">
                                            <span className="flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-[var(--border)]">
                                                <Users size={12} className="text-primary-500" />
                                                {user.group.name}
                                            </span>
                                            <span className="flex items-center gap-2 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest border-l border-[var(--border)] pl-6 group-hover:text-[var(--foreground)] transition-colors">
                                                <Mail size={12} className="text-primary-500" />
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-8 lg:gap-14">
                                    <div className="space-y-2 lg:border-l lg:border-[var(--border)] lg:pl-10">
                                        <p className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">Deployment Region</p>
                                        <div className="flex items-center gap-3 text-[var(--foreground)] font-black text-xs uppercase italic tracking-wider">
                                            <Globe size={16} className="text-primary-500" />
                                            {user.country}
                                        </div>
                                    </div>

                                    <div className="space-y-2 lg:border-l lg:border-[var(--border)] lg:pl-10">
                                        <p className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">Comm Channel</p>
                                        <div className="flex items-center gap-3 text-[var(--foreground)] font-black text-xs uppercase italic tracking-wider">
                                            <Phone size={16} className="text-primary-500" />
                                            {user.phoneNumber}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 ml-auto lg:ml-0 lg:pl-10">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="w-14 h-14 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-neutral-400 hover:bg-red-500 hover:text-white transition-all shadow-xl group/btn"
                                        >
                                            <UserX size={24} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <div className="w-14 h-14 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)] flex items-center justify-center text-neutral-300">
                                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02] text-center px-6">
                    <div className="w-32 h-32 bg-[var(--sidebar-background)] rounded-[3rem] shadow-2xl border border-[var(--border)] flex items-center justify-center mb-8 group overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ShieldAlert size={48} className="text-primary-500/40 group-hover:text-white relative z-10" />
                    </div>
                    <h3 className="text-4xl font-black text-[var(--foreground)] tracking-tighter mb-2">FLEET IS DISCONNECTED</h3>
                    <p className="text-[var(--muted-foreground)] font-bold mb-10 uppercase tracking-widest text-[11px]">System awaiting collaborator synchronization</p>
                    <button className="premium-button premium-button-primary h-16 px-10 group">
                        <span>Initialize Sync</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
}
