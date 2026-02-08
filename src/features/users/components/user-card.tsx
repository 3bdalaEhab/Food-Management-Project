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
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: isRtl ? -8 : 8 }}
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
                        initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-black text-[var(--foreground)] truncate group-hover:text-primary-500 transition-colors px-1 italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal leading-none"
                    >
                        {user.userName}
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center gap-3 mt-1.5 opacity-60"
                    >
                        <span className="text-primary-500 font-black text-[9px] tracking-[0.2em] rtl:tracking-normal uppercase italic rtl:not-italic">{user.group.name}</span>
                        <div className="h-0.5 w-3 bg-[var(--border)] rounded-full" />
                        <span className="text-[9px] font-black text-[var(--muted-foreground)] truncate tracking-tight uppercase">{user.email}</span>
                    </motion.div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0 relative z-10 rtl:translate-x-0 rtl:group-hover:-translate-x-0">
                    <button onClick={(e) => { e.stopPropagation(); onDelete?.(user.id); }} className="w-11 h-11 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors duration-150 shadow-xl flex items-center justify-center group/btn">
                        <UserX size={16} />
                    </button>
                    <div className="w-11 h-11 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] flex items-center justify-center shadow-md rtl:rotate-180">
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
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative bg-[var(--sidebar-background)] rounded-[3rem] p-8 overflow-hidden border border-[var(--border)] hover:shadow-[0_20px_50px_rgba(255,107,38,0.15)] hover:border-primary-500/30 transition-all duration-200 flex flex-col items-center text-center gap-8 min-h-[22rem] cursor-pointer transform-gpu will-change-transform [backface-visibility:hidden]"
        >
            {/* Ultra-Premium Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.04] via-transparent to-blue-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            <div className="relative shrink-0 mt-4">
                <div className="w-28 h-28 rounded-[2.5rem] bg-[var(--background)] overflow-hidden flex items-center justify-center border-4 border-[var(--border)] shadow-2xl group-hover:border-primary-500 group-hover:scale-105 transition-all duration-300 relative">
                    {user.imagePath ? (
                        <ImageWithFallback src={getImageUrl(user.imagePath)} alt={user.userName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-500/5">
                            <ChefHat className="text-primary-500/20" size={48} />
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-1 -end-1 w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(255,107,38,0.4)] ring-4 ring-[var(--sidebar-background)] group-hover:rotate-12 transition-transform duration-300 z-10">
                    <ShieldCheck size={20} />
                </div>
            </div>

            <div className="space-y-4 w-full relative z-10">
                <div className="flex items-center justify-center gap-3">
                    <h3 className="text-2xl md:text-3xl font-black italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal text-[var(--foreground)] group-hover:text-primary-500 transition-colors duration-150 px-1 leading-none line-clamp-1">
                        {user.userName}
                    </h3>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse shrink-0" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] rtl:tracking-normal text-[var(--muted-foreground)] italic rtl:not-italic opacity-50">
                    AGENT_ID: #{user.id}
                </p>
            </div>

            <div className="w-full mt-auto pt-6 border-t border-[var(--border)] border-dashed space-y-4 relative z-10">
                <div className="flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-[11px] font-black tracking-widest uppercase italic opacity-60 group-hover:opacity-100 transition-opacity">
                    <Mail size={14} className="text-primary-500" />
                    <span className="truncate max-w-full">{user.email}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                    <span className="flex-1 flex items-center justify-center gap-2 bg-[var(--background)] text-[var(--foreground)] px-4 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest rtl:tracking-normal border border-[var(--border)] shadow-sm italic rtl:not-italic group-hover:border-primary-500/20 transition-colors">
                        <Globe size={14} className="text-primary-500" />
                        {user.country}
                    </span>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(user.id); }}
                        className="w-12 h-12 rounded-[1.2rem] bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-150 shadow-xl flex items-center justify-center shrink-0 group/btn"
                    >
                        <UserX size={18} />
                    </button>
                </div>
            </div>

            {/* Tactical Detail Overlay - Elite Speed */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-primary-500/95 backdrop-blur-lg flex items-center justify-around p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                <div className="flex flex-col items-center gap-1 text-white">
                    <Phone size={18} />
                    <span className="text-[10px] font-black uppercase tracking-tighter italic rtl:not-italic">{user.phoneNumber}</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col items-center gap-1 text-white">
                    <Calendar size={18} />
                    <span className="text-[10px] font-black uppercase tracking-tighter italic rtl:not-italic">
                        {user.creationDate ? format(new Date(user.creationDate), "MMM dd, yyyy") : "N/A"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
});

UserCard.displayName = "UserCard";
