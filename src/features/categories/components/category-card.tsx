import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { FolderTree, Edit3, Trash2, Hash, Calendar, Clock } from "lucide-react";
import type { Category } from "../types";
import { useTranslation } from "react-i18next";

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: number, name: string) => void;
    viewMode: "grid" | "list";
}

export const CategoryCard = memo(({
    category,
    onEdit,
    onDelete,
    viewMode
}: CategoryCardProps) => {
    const { t } = useTranslation();

    const { formattedDate, formattedUpdate } = useMemo(() => ({
        formattedDate: new Date(category.creationDate).toLocaleDateString(),
        formattedUpdate: new Date(category.modificationDate).toLocaleDateString()
    }), [category.creationDate, category.modificationDate]);

    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 10 }}
                className="group relative glass-card rounded-[2rem] p-5 flex items-center gap-8 cursor-pointer border border-[var(--border)] hover:shadow-[0_0_20px_rgba(255,107,38,0.1)] overflow-hidden transform-gpu [backface-visibility:hidden] will-change-transform"
                onClick={() => onEdit(category)}
            >
                {/* Plasma Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:border-primary-500 transition-[background-color,border-color,transform] duration-150 relative shadow-xl overflow-hidden">
                    <FolderTree size={32} className="text-primary-500 group-hover:text-white transition-colors duration-150 relative z-10" />
                </div>

                <div className="flex-1 min-w-0 space-y-2 relative z-10">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-black text-[var(--foreground)] line-clamp-1 group-hover:text-primary-500 transition-colors duration-150 px-1 italic uppercase tracking-tighter leading-none">
                            {category.name}
                        </h3>
                        <div className="px-2 py-0.5 rounded-md bg-primary-500/10 border border-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                            <span className="text-[8px] font-black text-primary-500 uppercase tracking-widest italic">Node_Active</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Hash size={10} className="text-primary-500" />
                            <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('common.id')}: #{category.id}</span>
                        </div>
                        <div className="h-0.5 w-4 bg-[var(--border)] rounded-full" />
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Calendar size={10} className="text-primary-500" />
                            <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-tight">{formattedDate}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-[opacity,transform] duration-150 pr-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit?.(category); }}
                        className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-[background-color,color,transform] duration-150 shadow-xl flex items-center justify-center group/btn"
                    >
                        <Edit3 size={18} className="transition-transform duration-150" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(category.id, category.name); }}
                        className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-[background-color,color,transform] duration-150 shadow-xl flex items-center justify-center group/btn"
                    >
                        <Trash2 size={18} className="transition-transform duration-150" />
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.15, ease: "linear" }}
            className="group relative bg-[var(--sidebar-background)] rounded-[3rem] p-8 overflow-hidden border border-[var(--border)] hover:shadow-[0_0_20px_rgba(255,107,38,0.1)] transition-[box-shadow,border-color] duration-150 flex flex-col items-center text-center gap-8 min-h-[22rem] transform-gpu [backface-visibility:hidden] will-change-transform"
        >
            {/* Holographic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.05] via-transparent to-black/20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

            {/* Background Data Matrix Pattern (Subtle) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#000_1px,transparent_1px)]" />

            <div className="relative shrink-0 mt-4">
                <div className="w-28 h-28 rounded-[2.5rem] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:bg-primary-500 group-hover:border-primary-500 transition-[background-color,border-color,transform] duration-150 relative overflow-hidden group/icon">
                    <FolderTree size={42} className="text-primary-500 group-hover:text-white relative z-10 transition-[color,transform] duration-150" />

                    {/* Pulsing Core */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />
                </div>
            </div>

            <div className="space-y-4 w-full relative z-10">
                <div className="flex items-center justify-center gap-2 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)]">ID_LINK: #{category.id}</span>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black italic uppercase tracking-tighter text-[var(--foreground)] group-hover:text-primary-500 transition-colors duration-150 line-clamp-2 px-1 leading-[1.1] break-words">
                    {category.name}
                </h3>
            </div>

            <div className="w-full mt-auto pt-6 border-t border-primary-500/10 border-dashed grid grid-cols-2 gap-6 relative z-10">
                <div className="flex flex-col gap-1.5 items-start text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-60 leading-none mb-1 shadow-sm italic">Initiated</span>
                    <div className="flex items-center gap-2 text-[var(--foreground)]">
                        <Calendar size={12} className="text-primary-500/60" />
                        <span className="text-[10px] font-black tracking-tight opacity-80">{formattedDate}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 items-end text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-60 leading-none mb-1 shadow-sm italic">Modified</span>
                    <div className="flex items-center gap-2 text-[var(--foreground)]">
                        <span className="text-[10px] font-black tracking-tight opacity-80">{formattedUpdate}</span>
                        <Clock size={12} className="text-primary-500/60" />
                    </div>
                </div>
            </div>

            {/* Tactical Action Overlay - Floating Elite */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-[opacity,transform] duration-150">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(category); }}
                    className="w-10 h-10 rounded-xl bg-[var(--background)]/90 backdrop-blur-xl border border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center justify-center group/btn"
                >
                    <Edit3 size={16} className="transition-transform duration-150" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(category.id, category.name); }}
                    className="w-10 h-10 rounded-xl bg-[var(--background)]/90 backdrop-blur-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,transform] duration-150 shadow-2xl flex items-center justify-center group/btn"
                >
                    <Trash2 size={16} className="transition-transform duration-150" />
                </button>
            </div>

            {/* Scanning Line Effect Removed for Max Speed */}
        </motion.div>
    );
});

CategoryCard.displayName = "CategoryCard";
