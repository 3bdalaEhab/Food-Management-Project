import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, Edit2, Trash2, Utensils, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, selectIsAdmin } from "@/stores";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { useTranslation } from "react-i18next";
import { useFavoriteStatus, useAddFavorite, useRemoveFavorite } from "@/features/favorites";
import type { Recipe } from "../types";

interface RecipeCardProps {
    recipe: Recipe;
    onEdit?: (recipe: Recipe) => void;
    onDelete?: (id: number) => void;
    onView?: (recipe: Recipe) => void;
    viewMode?: "grid" | "list";
}

export const RecipeCard = memo(({
    recipe,
    onEdit,
    onDelete,
    onView,
    viewMode = "grid"
}: RecipeCardProps) => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const isAdmin = useAuthStore(selectIsAdmin);

    // Favorites Logic
    const { isFavorite, favoriteId } = useFavoriteStatus(recipe.id);
    const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
    const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();

    const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (isAdding || isRemoving) return;
        if (isFavorite && favoriteId) {
            removeFavorite(favoriteId);
        } else {
            addFavorite(recipe.id);
        }
    }, [isFavorite, favoriteId, recipe.id, addFavorite, removeFavorite, isAdding, isRemoving]);

    const imageUrl = recipe.imagePath
        ? `${import.meta.env.VITE_API_BASE_URL.split('/api/v1')[0]}/${recipe.imagePath}`
        : "/placeholder-recipe.jpg";

    if (viewMode === "list") {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: isRtl ? -5 : 5 }}
                onClick={() => onView?.(recipe)}
                className="group relative glass-card rounded-[2rem] p-4 flex items-center gap-6 cursor-pointer border border-[var(--border)] hover:border-primary-500/30 transition-all"
            >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/5 shadow-lg">
                    <ImageWithFallback src={imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-black text-primary-500/70 uppercase tracking-widest rtl:not-italic">ASSET_LOADED</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] truncate group-hover:text-primary-500 transition-colors px-1 italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal">
                        {recipe.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-primary-500 font-black italic tabular-nums">${recipe.price}</span>
                        <div className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]/30" />
                        <div className="flex items-center gap-2 overflow-hidden">
                            {(recipe.category || []).slice(0, 2).map((cat) => (
                                <span key={cat.id} className="text-[8px] font-black uppercase tracking-widest rtl:tracking-normal text-blue-500/60 bg-blue-500/5 px-2 py-0.5 rounded-full border border-blue-500/10 whitespace-nowrap rtl:not-italic">
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex flex-col items-end gap-1 me-4">
                        <span className="text-[7px] font-black text-[var(--muted-foreground)] uppercase tracking-tighter">SPEC_V2</span>
                        <span className="text-[7px] font-black text-primary-500/50 uppercase tracking-tighter">READY</span>
                    </div>
                    {isAdmin ? (
                        <div className="flex gap-2">
                            <button onClick={(e) => { e.stopPropagation(); onEdit?.(recipe); }} className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all"><Edit2 size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete?.(recipe.id); }} className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                    ) : (
                        <button onClick={handleToggleFavorite} className={cn("p-3 rounded-xl transition-all border", isFavorite ? "bg-red-500 text-white border-red-400" : "bg-white/5 text-white border-white/10 hover:bg-primary-500")}><Heart size={16} className={cn(isFavorite && "fill-current")} /></button>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="group relative bg-[var(--sidebar-background)] rounded-[2.5rem] overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-primary-500/40 transition-all duration-500 cursor-pointer flex flex-col min-h-[18rem]"
            onClick={() => onView?.(recipe)}
        >
            {/* Image Ecosystem */}
            <div className="relative overflow-hidden bg-neutral-900 group aspect-[4/3]">
                <ImageWithFallback
                    src={imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Category Tags Overlay - High Fidelity */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
                    {(recipe.category || []).slice(0, 2).map((cat) => (
                        <motion.div
                            key={cat.id}
                            initial={{ x: isRtl ? 10 : -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg shadow-2xl flex items-center gap-1.5"
                        >
                            <Activity size={8} className="text-primary-500" />
                            <span className="text-[8px] font-black uppercase tracking-widest rtl:tracking-normal text-white/90 italic rtl:not-italic">{cat.name}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px] z-20">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                        <Eye className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Narrative Identity Hub */}
            <div className="p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none group-hover:opacity-10 group-hover:scale-110 transition-all">
                    <Utensils size={64} />
                </div>

                <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] rtl:tracking-normal text-[var(--muted-foreground)] px-1 rtl:not-italic">UNIT_ID: #{recipe.id}</span>
                        </div>
                        <span className="text-[7px] font-black text-primary-500/40 uppercase tracking-tighter">LIVE_DATA</span>
                    </div>
                    <h3 className="text-xl font-black italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal text-[var(--foreground)] group-hover:text-primary-500 transition-colors duration-300 px-1 leading-tight line-clamp-2">
                        {recipe.name}
                    </h3>
                </div>

                {/* Technical Spectral Bar */}
                <div className="h-1.5 w-full bg-[var(--background)] rounded-full overflow-hidden mb-4 border border-[var(--border)] opacity-30 group-hover:opacity-60 transition-opacity">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(90, (recipe.id % 10) * 10 + 30)}%` }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                    />
                </div>

                <div className="pt-4 mt-auto border-t border-[var(--border)] border-dashed flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5 text-primary-500">
                        <span className="text-[10px] font-black border border-primary-500/30 px-1.5 py-0.5 rounded oklch(0.6 0.28 45 / 0.1)">$</span>
                        <span className="text-2xl font-black italic rtl:not-italic tracking-tight rtl:tracking-normal tabular-nums">{recipe.price}</span>
                    </div>

                    <div className="flex gap-1.5">
                        {!isAdmin ? (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleToggleFavorite}
                                className={cn(
                                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all border",
                                    isFavorite
                                        ? "bg-red-500 text-white border-red-400"
                                        : "bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)] hover:bg-primary-500 hover:text-white"
                                )}
                            >
                                <Heart size={14} className={cn(isFavorite && "fill-current")} />
                            </motion.button>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={(e) => { e.stopPropagation(); onEdit?.(recipe); }}
                                    className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                                >
                                    <Edit2 size={14} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={(e) => { e.stopPropagation(); onDelete?.(recipe.id); }}
                                    className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={14} />
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

RecipeCard.displayName = "RecipeCard";
