import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Sparkles,
    Activity,
    ArrowRight,
    ShieldAlert
} from "lucide-react";

import { useUsers, useDeleteUser } from "../hooks";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { UserCard } from "./user-card";

export function UsersPage() {
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { data: usersData, isLoading } = useUsers({
        userName: search,
        pageSize: 12,
        pageNumber: 1
    });

    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
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
                        placeholder="Scan collaborators..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-16 h-18 bg-[var(--background)]/80 border-[var(--border)] font-bold tracking-wide text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                    />
                </div>
            </div>

            {/* User Fleet Grid */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-card rounded-[3rem] p-8 flex items-center gap-8 animate-pulse bg-[var(--sidebar-background)]/60 border border-[var(--border)]">
                            <div className="w-20 h-20 rounded-[2rem] bg-[var(--background)]/50" />
                            <div className="flex-1 space-y-4">
                                <div className="h-8 w-1/4 bg-[var(--background)]/50 rounded-full" />
                                <div className="h-4 w-1/2 bg-[var(--background)]/50 rounded-full" />
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
                            <UserCard
                                key={user.id}
                                user={user}
                                onDelete={setDeleteId}
                            />
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

            <DeleteConfirmation
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId) {
                        deleteUser(deleteId, {
                            onSuccess: () => setDeleteId(null)
                        });
                    }
                }}
                isDeleting={isDeleting}
                itemName={`AGENT_NODE_${deleteId}`}
            />
        </div>
    );
}
