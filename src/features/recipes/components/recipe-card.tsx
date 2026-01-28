import { memo } from "react";
import { motion } from "framer-motion";
import { Utensils, Clock, Edit2, Trash2, Heart, Zap, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import type { Recipe } from "../types";

interface RecipeCardProps {
    recipe: Recipe;
    onEdit?: (recipe: Recipe) => void;
    onDelete?: (id: number) => void;
}

export const RecipeCard = memo(({
    recipe,
    onEdit,
    onDelete,
}: RecipeCardProps) => {
    const { toggleFavorite, isFavorite } = useAppStore();
    const favorite = isFavorite(recipe.id);

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
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full glass-card rounded-[2.5rem] overflow-hidden flex flex-col border border-[var(--border)] bg-[var(--sidebar-background)]/95 backdrop-blur-3xl shadow-2xl transition-all duration-500 group-hover:border-primary-500/40 group-hover:shadow-primary-500/10">
                {/* Visual Content Port */}
                <div className="relative h-64 overflow-hidden bg-[var(--muted)] shrink-0">
                    <ImageWithFallback
                        src={imageUrl}
                        alt={recipe.name}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />

                    {/* Atmospheric Lighting Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Elite Tactical Badges - Top Start */}
                    <div className="absolute top-5 start-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
                            <Zap size={10} className="text-primary-500 fill-primary-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">{recipe.tag.name}</span>
                        </div>
                    </div>

                    {/* Floating Tactical Actions - Top End */}
                    <div className="absolute top-5 end-5 flex flex-col gap-2 ltr:translate-x-8 rtl:-translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(recipe.id)}
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-3xl border transition-all shadow-xl",
                                favorite ? 'bg-red-500 text-white border-red-500' : 'bg-black/50 text-white border-white/10 hover:bg-primary-500 hover:border-primary-500'
                            )}
                            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart className={cn("w-4 h-4", favorite && "fill-current")} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onEdit?.(recipe)}
                            className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:border-blue-500 transition-all shadow-xl"
                            aria-label="Edit recipe"
                        >
                            <Edit2 className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Price Hub Overlay - Bottom */}
                    <div className="absolute bottom-5 start-5 end-5 flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Value Exchange</span>
                            <div className="flex items-baseline gap-1 text-white">
                                <span className="text-lg font-bold text-primary-500">$</span>
                                <span className="text-3xl font-black tracking-tighter italic shadow-black drop-shadow-lg">{recipe.price}</span>
                            </div>
                        </div>
                        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-1.5">
                            <Clock size={10} className="text-primary-500" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-white">25 MIN</span>
                        </div>
                    </div>
                </div>

                {/* Industrial Metadata & Content Section */}
                <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-br from-[var(--sidebar-background)] to-[var(--background)]">
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 opacity-50">
                            <Hash size={10} className="text-primary-500" />
                            <span className="text-[10px] font-bold tracking-widest text-[var(--muted-foreground)]">ID: #{recipe.id.toString().padStart(4, '0')}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--foreground)] tracking-tight leading-none group-hover:text-primary-500 transition-colors line-clamp-1">
                            {recipe.name}
                        </h3>
                        <p className="text-[var(--muted-foreground)] text-xs font-medium leading-relaxed line-clamp-2 h-10">
                            {recipe.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-[var(--border)] border-dashed">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]">
                                <Utensils size={12} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-medium text-[var(--muted-foreground)]">Category</span>
                                <span className="text-[11px] font-bold text-[var(--foreground)] tracking-wider">
                                    {recipe.category?.[0]?.name || "N/A"}
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDelete?.(recipe.id)}
                            className="premium-button premium-button-danger h-12 flex-1 group"
                            aria-label="Delete recipe"
                        >
                            <Trash2 size={18} className="group-hover:-rotate-12 transition-transform" />
                            <span className="font-black italic uppercase tracking-widest text-[10px]">Purge</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

RecipeCard.displayName = "RecipeCard";
