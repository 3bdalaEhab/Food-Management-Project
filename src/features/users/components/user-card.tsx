import { memo } from "react";
import { motion } from "framer-motion";
import {
    Globe,
    ShieldCheck,
    UserX,
    ArrowRight,
    ChefHat,
    Mail
} from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getImageUrl } from "@/lib/utils";
import type { User } from "../types";

interface UserCardProps {
    user: User;
    onDelete?: (id: number) => void;
    viewMode?: "grid" | "list";
}

export const UserCard = memo(({ user, onDelete, viewMode = "list" }: UserCardProps) => {
    if (viewMode === "list") {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 5 }}
                className="group relative glass-card rounded-[2rem] p-4 flex items-center gap-6 cursor-pointer border border-[var(--border)] hover:border-primary-500/30 transition-all"
            >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/5 shadow-lg">
                    {user.imagePath ? (
                        <ImageWithFallback src={getImageUrl(user.imagePath)} alt={user.userName} className="w-full h-full object-cover" />
                    ) : (
                        <ChefHat className="text-[var(--muted-foreground)]/30 w-full h-full p-4" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--foreground)] truncate group-hover:text-primary-500 transition-colors px-1 italic uppercase tracking-tighter">
                        {user.userName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-primary-500 font-bold text-[10px] tracking-widest">{user.group.name}</span>
                        <div className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]/30" />
                        <span className="text-[10px] font-bold text-[var(--muted-foreground)] truncate">{user.email}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={(e) => { e.stopPropagation(); onDelete?.(user.id); }} className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                        <UserX size={16} />
                    </button>
                    <div className="p-3 rounded-xl bg-white/5 text-[var(--muted-foreground)]">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-[var(--sidebar-background)] rounded-[2.5rem] p-6 overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-primary-500/40 transition-all duration-500 flex flex-col items-center text-center gap-6 min-h-[18rem] cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.02] to-transparent pointer-events-none" />

            <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-[2rem] bg-[var(--background)] overflow-hidden flex items-center justify-center border-4 border-[var(--border)] shadow-2xl group-hover:scale-110 transition-transform duration-700 relative">
                    {user.imagePath ? (
                        <ImageWithFallback src={getImageUrl(user.imagePath)} alt={user.userName} className="w-full h-full object-cover" />
                    ) : (
                        <ChefHat className="text-[var(--muted-foreground)]/20" size={48} />
                    )}
                    <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-all" />
                </div>
                <div className="absolute -bottom-1 -end-1 w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,107,38,0.4)] ring-4 ring-[var(--sidebar-background)] group-hover:rotate-12 transition-transform">
                    <ShieldCheck size={16} />
                </div>
            </div>

            <div className="space-y-3 w-full">
                <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[var(--foreground)] group-hover:text-primary-500 transition-colors truncate px-1">
                        {user.userName}
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] shrink-0" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] opacity-50">AGENT_NODE: #{user.id}</p>
            </div>

            <div className="w-full mt-auto pt-4 border-t border-[var(--border)] border-dashed space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-[10px] font-bold tracking-widest">
                        <Mail size={12} className="text-primary-500" />
                        <span className="truncate max-w-full">{user.email}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--border)] shadow-inner">
                        <Globe size={12} className="text-primary-500" />
                        {user.country}
                    </span>
                    <button
                        onClick={() => onDelete?.(user.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-xl flex items-center justify-center"
                    >
                        <UserX size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

UserCard.displayName = "UserCard";
