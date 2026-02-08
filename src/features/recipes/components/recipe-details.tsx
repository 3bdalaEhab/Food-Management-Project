import { motion } from "framer-motion";
import {
    X,
    Zap,
    Clock,
    ChefHat,
    FileText,
    ArrowLeft,
    Heart,
    DollarSign,
    Shield
} from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { useFavoriteStatus, useAddFavorite, useRemoveFavorite } from "@/features/favorites";
import { useAuthStore, selectIsAdmin } from "@/stores";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { Recipe } from "../types";

interface RecipeDetailsProps {
    recipe: Recipe;
    onClose: () => void;
}

/**
 * RecipeDetails - Full-Screen Tactical Recipe Presentation
 * Optimized for Light/Dark modes and responsive display
 */
export function RecipeDetails({ recipe, onClose }: RecipeDetailsProps) {
    const { t } = useTranslation();
    const isAdmin = useAuthStore(selectIsAdmin);
    const { isFavorite, favoriteId } = useFavoriteStatus(recipe.id);
    const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
    const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();

    const imageUrl = recipe.imagePath
        ? `${import.meta.env.VITE_API_BASE_URL.split('/api/v1')[0]}/${recipe.imagePath}`
        : "/placeholder-recipe.jpg";

    const handleToggleFavorite = () => {
        if (isAdding || isRemoving) return;
        if (isFavorite && favoriteId) {
            removeFavorite(favoriteId);
        } else {
            addFavorite(recipe.id);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full max-h-[95vh] lg:h-[min(800px,85vh)] bg-[var(--sidebar-background)] rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-[var(--border)] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] relative">

            {/* Visual Anchor (Left) */}
            <div className="w-full lg:w-[40%] h-[35vh] lg:h-full relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border)] group">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <ImageWithFallback
                        src={imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-[2s]"
                    />
                </motion.div>

                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sidebar-background)] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />

                {/* Header Badge */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 z-20">
                    <div className="px-3 py-1.5 bg-primary-500 rounded-xl flex items-center gap-2 shadow-2xl border border-primary-400/50">
                        <Zap size={12} className="text-white fill-white animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white">{recipe.tag.name}</span>
                    </div>
                </div>

                {/* Hero Title */}
                <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 space-y-2 md:space-y-3 z-20">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
                    >
                        {recipe.name}
                    </motion.h2>
                    <div className="h-0.5 w-12 bg-primary-500 rounded-full" />
                </div>

                {/* Favorite Action Node */}
                {!isAdmin && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggleFavorite}
                        className={cn(
                            "absolute bottom-6 md:bottom-8 right-4 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all z-30 border backdrop-blur-xl shadow-2xl",
                            isFavorite
                                ? "bg-red-500 text-white border-red-400"
                                : "bg-[var(--background)]/40 text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                        )}
                    >
                        <Heart className={cn("w-5 h-5 md:w-6 md:h-6", isFavorite && "fill-current")} />
                    </motion.button>
                )}
            </div>

            {/* Tactical Content Dashboard (Right) */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--background)]/30 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--muted-foreground)] transition-all z-50 group"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">

                    {/* Compact Status Matrix */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="p-4 md:p-5 rounded-2xl bg-[var(--sidebar-background)]/40 border border-[var(--border)] space-y-1.5">
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] opacity-60 flex items-center gap-1.5">
                                {t('recipes.protocol_id')}
                            </span>
                            <div className="text-xl md:text-2xl font-bold italic tracking-tighter text-[var(--foreground)]">
                                00{recipe.id.toString().padStart(4, '0')}
                            </div>
                        </div>
                        <div className="p-4 md:p-5 rounded-2xl bg-[var(--sidebar-background)]/40 border border-[var(--border)] space-y-1.5 text-right">
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] opacity-60 flex items-center justify-end gap-1.5">
                                {t('recipes.valuation')}
                                <DollarSign size={10} className="text-primary-500" />
                            </span>
                            <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-[var(--foreground)] flex items-center justify-end gap-1">
                                <span className="text-xs md:text-sm font-bold text-primary-500">$</span>
                                {recipe.price}
                            </div>
                        </div>
                    </div>

                    {/* Integrated Narrative */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <FileText size={14} className="text-primary-500" />
                            <h3 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)] opacity-60">{t('recipes.technical_brief')}</h3>
                        </div>

                        <div className="relative p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-[var(--sidebar-background)]/30 border border-[var(--border)] group">
                            <ChefHat size={100} className="absolute -bottom-4 -right-4 text-[var(--muted-foreground)] opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity" />
                            <p className="text-xs md:text-sm lg:text-base font-bold text-[var(--muted-foreground)] leading-relaxed relative z-10 first-letter:text-3xl md:first-letter:text-4xl first-letter:font-black first-letter:text-primary-500 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                {recipe.description || t('recipes.no_data_registry')}
                            </p>
                        </div>
                    </div>


                    {/* Operational Node */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--sidebar-background)]/30 flex items-center gap-3">
                            <Clock size={16} className="text-primary-500/60" />
                            <div className="flex flex-col">
                                <span className="text-[7px] md:text-[8px] font-black uppercase text-[var(--muted-foreground)] opacity-40">{t('recipes.runtime')}</span>
                                <span className="text-[9px] md:text-[10px] font-black text-[var(--foreground)] opacity-80 italic">25:00 {t('recipes.min')}</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--sidebar-background)]/30 flex items-center gap-3">
                            <Shield size={16} className="text-green-500/60" />
                            <div className="flex flex-col">
                                <span className="text-[7px] md:text-[8px] font-black uppercase text-[var(--muted-foreground)] opacity-40">{t('recipes.integrity')}</span>
                                <span className="text-[9px] md:text-[10px] font-black text-[var(--foreground)] opacity-80 italic">{t('recipes.verified')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Exit Navigation (Mobile) */}
                    <div className="lg:hidden pt-4">
                        <button
                            onClick={onClose}
                            className="w-full h-14 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-black uppercase tracking-widest text-[9px] md:text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
                        >
                            <ArrowLeft size={16} />
                            {t('recipes.exit_navigation')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
