import { memo } from "react";
import { motion } from "framer-motion";
import { FolderTree, Edit3, Trash2, Hash, Database } from "lucide-react";
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
                "group relative glass-card rounded-[3rem] p-10 overflow-hidden border border-[var(--border)] bg-white/40 dark:bg-black/40 backdrop-blur-3xl shadow-2xl transition-all duration-500 flex",
                viewMode === "grid"
                    ? "flex-col items-center text-center justify-between min-h-[18rem] hover:border-primary-500/40"
                    : "flex-row items-center justify-between hover:bg-white/60 dark:hover:bg-white/5"
            )}
        >
            {/* Elite Industrial Glow Shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 blur-3xl transition-all" />

            <div className={cn("relative z-10 flex items-center gap-8", viewMode === "grid" ? "flex-col" : "flex-row")}>
                <div className="relative">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-700 relative overflow-hidden">
                        <FolderTree size={40} className="text-white relative z-10" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white/5 opacity-40"
                        />
                    </div>
                    {/* Status Pip */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--background)] border-4 border-[var(--border)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className={cn("flex items-center gap-2 opacity-60", viewMode === "grid" ? "justify-center" : "justify-start")}>
                        <Database size={12} className="text-primary-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)]">Taxonomy_Node</span>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none italic group-hover:text-primary-500 transition-colors">
                            {category.name}
                        </h3>
                        <div className={cn("flex items-center gap-2 text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-widest", viewMode === "grid" ? "justify-center" : "justify-start")}>
                            <Hash size={10} className="text-primary-500" />
                            <span>NODE_IDX_{category.id}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cn("relative z-10 flex items-center gap-4", viewMode === "grid" ? "mt-10" : "")}>
                <Tooltip content="Modify Node" side="top">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "var(--primary-500)", color: "white" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(category)}
                        className="w-16 h-16 rounded-[1.5rem] bg-neutral-950/5 dark:bg-white/5 flex items-center justify-center text-neutral-400 transition-all shadow-xl group/btn"
                    >
                        <Edit3 size={24} className="group-hover/btn:rotate-12 transition-transform" />
                    </motion.button>
                </Tooltip>
                <Tooltip content="Purge Node" side="top">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#ef4444", color: "white" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(category.id)}
                        className="w-16 h-16 rounded-[1.5rem] bg-neutral-950/5 dark:bg-white/5 flex items-center justify-center text-neutral-400 transition-all shadow-xl group/btn"
                    >
                        <Trash2 size={24} className="group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                </Tooltip>
            </div>
        </motion.div>
    );
});

CategoryCard.displayName = "CategoryCard";
