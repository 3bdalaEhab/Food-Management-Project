import { memo } from "react";
import { motion } from "framer-motion";
import {
    Globe,
    ShieldCheck,
    UserX,
    ArrowRight,
    ChefHat,
    Mail,
    Phone,
    Calendar
} from "lucide-react";
import { format } from "date-fns";
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
                whileHover={{ x: 8 }}
                transition={{ duration: 0.15 }}
                className="group relative glass-card rounded-[2rem] p-4 flex items-center gap-6 cursor-pointer border border-[var(--border)] hover:border-primary-500/30 hover:shadow-[0_0_20px_rgba(255,107,38,0.1)] transition-[border-color,box-shadow,transform] duration-150 transform-gpu will-change-transform overflow-hidden"
            >
                {/* Holographic Beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[var(--background)] border border-[var(--border)] shadow-xl group-hover:shadow-primary-500/20 transition-all duration-300 relative z-10"
                >
                    {user.imagePath ? (
                        <ImageWithFallback src={getImageUrl(user.imagePath)} alt={user.userName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-500/5">
                            <ChefHat className="text-primary-500/40 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    )}
                </motion.div>

                <div className="flex-1 min-w-0 relative z-10">
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-black text-[var(--foreground)] truncate group-hover:text-primary-500 transition-colors px-1 italic uppercase tracking-tighter leading-none"
                    >
                        {user.userName}
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center gap-3 mt-1.5 opacity-60"
                    >
                        <span className="text-primary-500 font-black text-[9px] tracking-[0.2em] uppercase italic">{user.group.name}</span>
                        <div className="h-0.5 w-3 bg-[var(--border)] rounded-full" />
                        <span className="text-[9px] font-black text-[var(--muted-foreground)] truncate tracking-tight uppercase">{user.email}</span>
                    </motion.div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-150 translate-x-4 group-hover:translate-x-0 relative z-10">
                    <button onClick={(e) => { e.stopPropagation(); onDelete?.(user.id); }} className="w-11 h-11 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-[background-color,color,transform] duration-150 shadow-xl flex items-center justify-center group/btn">
                        <UserX size={16} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <div className="w-11 h-11 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] flex items-center justify-center shadow-md">
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
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative bg-[var(--sidebar-background)] rounded-[3rem] p-8 overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-[0_20px_50px_rgba(255,107,38,0.15)] hover:border-primary-500/30 transition-[box-shadow,border-color,transform] duration-200 flex flex-col items-center text-center gap-8 min-h-[22rem] cursor-pointer transform-gpu will-change-transform [backface-visibility:hidden]"
        >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            <div className="relative shrink-0 mt-4">
                <div className="w-28 h-28 rounded-[2.5rem] bg-[var(--background)] overflow-hidden flex items-center justify-center border-4 border-[var(--border)] shadow-2xl group-hover:border-primary-500 group-hover:scale-105 transition-[border-color,transform] duration-300 relative">
                    {user.imagePath ? (
                        <ImageWithFallback src={getImageUrl(user.imagePath)} alt={user.userName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-500/5">
                            <ChefHat className="text-primary-500/20" size={48} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-all" />
                </div>
                <div className="absolute -bottom-1 -end-1 w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,107,38,0.4)] ring-4 ring-[var(--sidebar-background)] group-hover:rotate-12 transition-transform duration-300 z-10">
                    <ShieldCheck size={20} />
                </div>
            </div>

            <div className="space-y-4 w-full relative z-10">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-center gap-3"
                >
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--foreground)] group-hover:text-primary-500 transition-colors duration-150 px-1 leading-none line-clamp-1">
                        {user.userName}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse shrink-0" />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)] italic"
                >
                    AGENT_COMMAND: #{user.id}
                </motion.p>
            </div>

            <div className="w-full mt-auto pt-4 border-t border-[var(--border)] border-dashed space-y-4 relative z-10">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-[10px] font-black tracking-widest uppercase italic opacity-70 group-hover:opacity-100 transition-opacity">
                        <Mail size={12} className="text-primary-500" />
                        <span className="truncate max-w-full">{user.email}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                    <span className="flex-1 flex items-center justify-center gap-2 bg-[var(--background)] text-[var(--foreground)] px-4 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest border border-[var(--border)] shadow-inner italic group-hover:border-primary-500/20 transition-colors">
                        <Globe size={14} className="text-primary-500" />
                        {user.country}
                    </span>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(user.id); }}
                        className="w-12 h-12 rounded-[1.2rem] bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-[background-color,color,transform] duration-150 shadow-xl flex items-center justify-center shrink-0 group/btn"
                    >
                        <UserX size={18} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Technical Detail Overlay */}
            <motion.div
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                className="absolute inset-x-0 bottom-0 h-24 bg-primary-500/95 backdrop-blur-lg flex items-center justify-around p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20"
            >
                <div className="flex flex-col items-center gap-1 text-white">
                    <Phone size={16} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">{user.phoneNumber}</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col items-center gap-1 text-white">
                    <Calendar size={16} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                        {user.creationDate ? format(new Date(user.creationDate), "MMM dd, yyyy") : "N/A"}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
});

UserCard.displayName = "UserCard";
