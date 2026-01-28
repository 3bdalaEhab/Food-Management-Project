import { memo } from "react";
import { motion } from "framer-motion";
import { Utensils, Clock, Edit2, Trash2, Heart, Zap, TrendingUp, Layers, Hash } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Recipe } from "../types";

interface RecipeCardProps {
    recipe: Recipe;
    onEdit?: (recipe: Recipe) => void;
    onDelete?: (id: number) => void;
    onToggleFavorite?: (id: number) => void;
    isFavorite?: boolean;
}

export const RecipeCard = memo(({
    recipe,
    onEdit,
    onDelete,
    onToggleFavorite,
    isFavorite
}: RecipeCardProps) => {
    const imageUrl = recipe.imagePath
        ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
        : "/placeholder-recipe.jpg";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="group relative h-full"
            role="article"
            aria-label={`Recipe: ${recipe.name}`}
        >
            {/* Elite Industrial Glow Shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full glass-card rounded-[3rem] overflow-hidden flex flex-col border border-[var(--border)] bg-white/40 dark:bg-black/40 backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-primary-500/40">
                {/* Visual Content Port */}
                <div className="relative h-72 overflow-hidden bg-neutral-900">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src={imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                    />

                    {/* Atmospheric Lighting Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-40" />

                    {/* Elite Tactical Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                            <Zap size={12} className="text-primary-500 fill-primary-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white italic">{recipe.tag.name}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <Hash size={10} className="text-primary-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">NODE_{recipe.id}</span>
                        </div>
                    </div>

                    {/* Floating Tactical Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <Tooltip content={isFavorite ? 'Remove Favorite' : 'Mark Favorite'} side="left">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onToggleFavorite?.(recipe.id)}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-3xl border border-white/20 transition-all shadow-2xl",
                                    isFavorite ? 'bg-red-500 text-white border-red-400/50 shadow-red-500/40' : 'bg-black/60 text-white hover:bg-primary-500'
                                )}
                            >
                                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                            </motion.button>
                        </Tooltip>
                        <Tooltip content="Refine Data" side="left">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onEdit?.(recipe)}
                                className="w-12 h-12 bg-black/60 hover:bg-neutral-900 border border-white/20 backdrop-blur-3xl rounded-2xl flex items-center justify-center text-white transition-all shadow-2xl group/btn"
                            >
                                <Edit2 className="w-5 h-5 group-hover/btn:text-primary-500" />
                            </motion.button>
                        </Tooltip>
                    </div>

                    {/* Price Hub Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingUp size={16} className="text-primary-500" />
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Market_Value</span>
                                <span className="text-2xl font-black text-primary-500 tracking-tighter italic leading-none">${recipe.price}</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col items-end">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Execution</span>
                            <div className="flex items-center gap-1.5 text-white">
                                <Clock size={12} className="text-primary-500" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">25 MIN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industrial Metadata & Content Section */}
                <div className="p-8 flex flex-col flex-1 relative bg-gradient-to-br from-transparent to-primary-500/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 opacity-60">
                            <Layers size={14} className="text-primary-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500 dark:text-white/60">Culinary_Object</span>
                        </div>
                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none group-hover:text-primary-500 transition-colors uppercase italic">
                            {recipe.name}
                        </h3>
                        <p className="text-[var(--muted-foreground)] text-sm font-bold leading-relaxed line-clamp-2 italic">
                            {recipe.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-10 flex items-center justify-between border-t border-black/5 dark:border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">Primary_Taxonomy</span>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                                <Utensils size={14} className="text-primary-500" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--foreground)]">{recipe.category?.[0]?.name || "GENERAL"}</span>
                            </div>
                        </div>

                        <Tooltip content="Purge Record" side="top">
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#ef4444", color: "white" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDelete?.(recipe.id)}
                                className="w-12 h-12 rounded-[1.25rem] bg-neutral-950/5 dark:bg-white/5 text-neutral-400 flex items-center justify-center transition-all group/trash shadow-inner"
                            >
                                <Trash2 size={18} className="transition-transform group-hover/trash:rotate-12" />
                            </motion.button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

RecipeCard.displayName = "RecipeCard";
