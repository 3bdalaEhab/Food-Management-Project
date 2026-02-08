import { memo } from "react";
import { motion } from "framer-motion";
import { FolderTree, Edit3, Trash2, Hash, Calendar, Clock } from "lucide-react";
import type { Category } from "../types";
import { useTranslation } from "react-i18next";

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
    const formattedDate = new Date(category.creationDate).toLocaleDateString();
    const formattedUpdate = new Date(category.modificationDate).toLocaleDateString();
    const { t } = useTranslation();

    if (viewMode === "list") {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 5 }}
                className="group relative glass-card rounded-[2rem] p-4 flex items-center gap-6 cursor-pointer border border-[var(--border)] hover:border-primary-500/30 transition-all shadow-md"
                onClick={() => onEdit(category)}
            >
                <div className="w-16 h-16 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
                    <FolderTree size={28} className="text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--foreground)] truncate group-hover:text-primary-500 transition-colors px-1 italic uppercase tracking-tighter">
                        {category.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">{t('common.id')}: #{category.id}</span>
                        <div className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]/30" />
                        <span className="text-[10px] font-bold text-[var(--muted-foreground)]">{formattedDate}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={(e) => { e.stopPropagation(); onEdit?.(category); }} className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete?.(category.id); }} className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[var(--sidebar-background)] rounded-[2.5rem] p-6 overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-primary-500/40 transition-all duration-500 flex flex-col items-center text-center gap-6 min-h-[18rem]"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.02] to-transparent pointer-events-none" />

            <div className="relative shrink-0 mt-2">
                <div className="w-24 h-24 rounded-[2rem] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-500 relative overflow-hidden">
                    <FolderTree size={36} className="text-primary-500 group-hover:text-white relative z-10 transition-colors" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                    />
                </div>
            </div>

            <div className="space-y-3 w-full">
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <Hash size={10} className="text-primary-500" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">{t('common.id')}: #{category.id}</span>
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[var(--foreground)] group-hover:text-primary-500 transition-colors line-clamp-2 px-1 leading-tight">
                    {category.name}
                </h3>
            </div>

            <div className="w-full mt-auto pt-4 border-t border-[var(--border)] border-dashed grid grid-cols-2 gap-4 relative z-10">
                <div className="flex flex-col gap-1 items-start text-left">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--muted-foreground)] opacity-60 leading-none mb-1">{t('common.created')}</span>
                    <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                        <Calendar size={10} className="text-primary-500" />
                        <span className="text-[9px] font-black tracking-tight">{formattedDate}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-end text-right">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--muted-foreground)] opacity-60 leading-none mb-1">{t('common.updated')}</span>
                    <div className="flex items-center gap-1.5 text-[var(--foreground)]">
                        <span className="text-[9px] font-black tracking-tight">{formattedUpdate}</span>
                        <Clock size={10} className="text-primary-500" />
                    </div>
                </div>
            </div>

            {/* Tactical Action Overlay */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <button onClick={(e) => { e.stopPropagation(); onEdit(category); }} className="w-8 h-8 rounded-lg bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border)] text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center justify-center"><Edit3 size={14} /></button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(category.id); }} className="w-8 h-8 rounded-lg bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border)] text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl flex items-center justify-center"><Trash2 size={14} /></button>
            </div>
        </motion.div>
    );
});

CategoryCard.displayName = "CategoryCard";
