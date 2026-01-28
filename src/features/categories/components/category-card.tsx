import { memo } from "react";
import { motion } from "framer-motion";
import { FolderTree, Edit3, Trash2, Hash } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import type { Category } from "../types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
    viewMode: "grid" | "list";
}

export const CategoryCard = memo(({
    category,
    onEdit,
    onDelete,
    viewMode
}: CategoryCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className={cn(
                "group relative glass-card rounded-[2.5rem] p-8 overflow-hidden border border-[var(--border)] bg-[var(--sidebar-background)]/80 backdrop-blur-3xl shadow-xl transition-all duration-500 flex",
                viewMode === "grid"
                    ? "flex-col items-center text-center justify-between min-h-[16rem] hover:border-primary-500/40"
                    : "flex-row items-center justify-between hover:bg-[var(--background)] hover:border-primary-500/30"
            )}
        >
            {/* Elite Industrial Glow Shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 blur-3xl transition-all" />

            <div className={cn("relative z-10 flex items-center gap-6", viewMode === "grid" ? "flex-col w-full" : "flex-row")}>
                <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-500 relative overflow-hidden">
                        <FolderTree size={32} className="text-primary-500 group-hover:text-white relative z-10 transition-colors" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                        />
                    </div>
                </div>

                <div className={cn("space-y-2 max-w-full overflow-hidden", viewMode === "grid" ? "w-full" : "")}>
                    <div className={cn("flex items-center gap-2 opacity-50", viewMode === "grid" ? "justify-center" : "justify-start")}>
                        <Hash size={10} className="text-primary-500" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">ID: #{category.id}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight leading-snug group-hover:text-primary-500 transition-colors line-clamp-1">
                        {category.name}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)] border-dashed">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-[var(--muted-foreground)]">Created</span>
                    <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                        <Calendar size={10} className="text-primary-500" />
                        <span className="text-[10px] font-bold tracking-wide">{formattedDate}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-end text-right">
                    <span className="text-[9px] font-bold text-[var(--muted-foreground)]">Updated</span>
                    <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                        <span className="text-[10px] font-bold tracking-wide">{formattedUpdate}</span>
                        <Clock size={10} className="text-primary-500" />
                    </div>
                </div>
            </div>

            <div className={cn("relative z-10 flex items-center gap-3", viewMode === "grid" ? "mt-8 pt-6 w-full justify-center border-t border-[var(--border)] border-dashed" : "")}>
                <Tooltip content="Modify Node" side="top">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "var(--primary-500)", color: "white" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(category)}
                        className="w-10 h-10 rounded-xl bg-[var(--background)]/50 border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] transition-all shadow-md group/btn"
                    >
                        <Edit3 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                    </motion.button>
                </Tooltip>
                <Tooltip content="Purge Node" side="top">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#ef4444", color: "white" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(category.id)}
                        className="w-10 h-10 rounded-xl bg-[var(--background)]/50 border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] transition-all shadow-md group/btn"
                    >
                        <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                </Tooltip>
            </div>
        </motion.div>
    );
});

CategoryCard.displayName = "CategoryCard";
