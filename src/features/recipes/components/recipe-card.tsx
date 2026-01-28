import { motion } from "framer-motion";
import { Utensils, Clock, Edit2, Trash2, Heart, Sparkles, Zap, TrendingUp } from "lucide-react";
import type { Recipe } from "../types";

interface RecipeCardProps {
    recipe: Recipe;
    onEdit?: (recipe: Recipe) => void;
    onDelete?: (id: number) => void;
    onToggleFavorite?: (id: number) => void;
    isFavorite?: boolean;
}

export function RecipeCard({
    recipe,
    onEdit,
    onDelete,
    onToggleFavorite,
    isFavorite
}: RecipeCardProps) {
    const imageUrl = recipe.imagePath
        ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
        : "/placeholder-recipe.jpg";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-full"
        >
            {/* Elite Glow Effect */}
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 blur-3xl transition-all rounded-[3.5rem]" />

            <div className="relative glass-card rounded-[3rem] overflow-hidden flex flex-col h-full border border-white/20 dark:border-white/5 bg-white/40 backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-primary-500/30">
                {/* Advanced Image Port */}
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.15, rotate: 2 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        src={imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Elite Tactical Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                            <Zap size={10} className="text-primary-500 fill-primary-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">{recipe.tag.name}</span>
                        </div>
                    </div>

                    {/* Floating Tactical Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <button
                            onClick={() => onToggleFavorite?.(recipe.id)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-2xl border border-white/20 transition-all hover:scale-110 active:scale-95 ${isFavorite ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' : 'bg-white/10 text-white hover:bg-primary-500'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={() => onEdit?.(recipe)}
                            className="w-12 h-12 bg-white/10 hover:bg-neutral-900 border border-white/20 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group/btn"
                        >
                            <Edit2 className="w-5 h-5 group-hover/btn:text-primary-500" />
                        </button>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">OPTIMIZED FLOW</span>
                        </div>
                        <div className="h-px flex-1 mx-4 bg-white/10" />
                        <span className="text-2xl font-black text-primary-500 tracking-tighter italic">${recipe.price}</span>
                    </div>
                </div>

                {/* Industrial Content Section */}
                <div className="p-8 flex flex-col flex-1 relative">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Sparkles size={12} className="text-primary-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-500 dark:text-white">Culinary Protocol</span>
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none group-hover:text-primary-500 transition-colors uppercase">
                            {recipe.name}
                        </h3>
                        <p className="text-neutral-400 dark:text-white/40 text-xs font-bold leading-relaxed line-clamp-2">
                            {recipe.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">Taxonomy</span>
                                <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
                                    <Utensils size={12} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{recipe.category?.[0]?.name || "General"}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">Execution</span>
                                <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
                                    <Clock size={12} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">25 Min</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => onDelete?.(recipe.id)}
                            className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:bg-red-500 hover:text-white transition-all group/trash"
                        >
                            <Trash2 size={16} className="transition-transform group-hover/trash:scale-110" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
