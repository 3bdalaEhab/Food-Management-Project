import { memo } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Mail,
    Phone,
    Globe,
    ShieldCheck,
    UserX,
    ArrowRight,
    Zap,
    ChefHat
} from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import type { User } from "../types";

interface UserCardProps {
    user: User;
    onDelete?: (id: number) => void;
}

export const UserCard = memo(({ user, onDelete }: UserCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group relative glass-card rounded-[3rem] p-8 overflow-hidden border border-[var(--border)] bg-[var(--sidebar-background)] shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-[var(--background)] hover:border-primary-500/30"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-all" />

            <div className="relative z-10 flex items-center gap-8">
                <div className="relative">
                    <div className="w-20 h-20 rounded-[2rem] bg-[var(--background)] overflow-hidden flex items-center justify-center border-4 border-[var(--border)] shadow-2xl group-hover:scale-110 transition-transform duration-700">
                        {user.imagePath ? (
                            <ImageWithFallback src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                        ) : (
                            <ChefHat className="text-[var(--muted-foreground)]/30" size={36} />
                        )}
                    </div>
                    <div className="absolute -bottom-1 -end-1 w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,107,38,0.4)] ring-4 ring-[var(--sidebar-background)] group-hover:rotate-12 transition-transform">
                        <ShieldCheck size={16} />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Zap size={10} className="text-primary-500 fill-primary-500" />
                        <span className="text-[9px] font-bold tracking-widest text-[var(--muted-foreground)]">Authorized Agent</span>
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--foreground)] tracking-tight leading-none group-hover:text-primary-500 transition-colors">
                        {user.userName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-6">
                        <span className="flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest shadow-xl border border-[var(--border)]">
                            <Users size={12} className="text-primary-500" />
                            {user.group.name}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] font-bold text-[var(--muted-foreground)] tracking-widest border-s border-[var(--border)] ps-6 group-hover:text-[var(--foreground)] transition-colors">
                            <Mail size={12} className="text-primary-500" />
                            {user.email}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-8 lg:gap-14">
                <div className="space-y-2 lg:border-s lg:border-[var(--border)] lg:ps-10">
                    <p className="text-[9px] font-bold text-[var(--muted-foreground)] tracking-widest">Deployment Region</p>
                    <div className="flex items-center gap-3 text-[var(--foreground)] font-bold text-xs italic tracking-wider">
                        <Globe size={16} className="text-primary-500" />
                        {user.country}
                    </div>
                </div>

                <div className="space-y-2 lg:border-s lg:border-[var(--border)] lg:ps-10">
                    <p className="text-[9px] font-bold text-[var(--muted-foreground)] tracking-widest">Comm Channel</p>
                    <div className="flex items-center gap-3 text-[var(--foreground)] font-bold text-xs italic tracking-wider">
                        <Phone size={16} className="text-primary-500" />
                        {user.phoneNumber}
                    </div>
                </div>

                <div className="flex items-center gap-4 ms-auto lg:ms-0 lg:ps-10">
                    <button
                        onClick={() => onDelete?.(user.id)}
                        className="w-14 h-14 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-neutral-400 hover:bg-red-500 hover:text-white transition-all shadow-xl group/btn"
                    >
                        <UserX size={24} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <div className="w-14 h-14 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]">
                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

UserCard.displayName = "UserCard";
