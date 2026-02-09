import { memo } from "react";
import {
    X,
    Zap,
    Clock,
    Heart,
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
export const RecipeDetails = memo(({ recipe, onClose }: RecipeDetailsProps) => {
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
        <div className="flex flex-col bg-[var(--sidebar-background)]/95 backdrop-blur-2xl rounded-[2rem] overflow-hidden tactical-border shadow-[0_0_100px_rgba(0,0,0,0.8)] relative max-h-[85vh] w-full">

            {/* Banner Image */}
            <div className="h-64 md:h-72 relative shrink-0 group">
                <ImageWithFallback
                    src={imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sidebar-background)] via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 md:top-6 start-4 md:start-6 flex items-center gap-2 z-20">
                    <div className="px-3 py-1.5 bg-primary-500 rounded-xl flex items-center gap-2 shadow-lg border border-primary-400/50">
                        <Zap size={12} className="text-white fill-white animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-white rtl:not-italic">{recipe.tag.name}</span>
                    </div>
                </div>

                {/* Close Button (Absolute) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-6 end-4 md:end-6 w-10 h-10 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all z-50 hover:rotate-90"
                    aria-label={t('common.close')}
                >
                    <X size={20} />
                </button>

                {/* Favorite Button */}
                {!isAdmin && (
                    <button
                        onClick={handleToggleFavorite}
                        className={cn(
                            "absolute bottom-4 end-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all z-30 border backdrop-blur-md shadow-xl",
                            isFavorite
                                ? "bg-red-500 text-white border-red-400"
                                : "bg-black/20 text-white border-white/10 hover:bg-black/40"
                        )}
                        aria-label={isFavorite ? t('favorites.remove') : t('favorites.add')}
                    >
                        <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
                    </button>
                )}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

                {/* Header */}
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal text-[var(--foreground)] leading-none">
                        {recipe.name}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-primary-500 italic rtl:not-italic tabular-nums">${recipe.price}</span>
                        <div className="h-4 w-px bg-[var(--border)]" />
                        <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">{t('recipes.verified')}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="relative p-5 rounded-2xl bg-[var(--sidebar-background)]/50 border border-[var(--border)]">
                    <p className="text-sm md:text-base font-medium text-[var(--muted-foreground)] leading-relaxed relative z-10">
                        {recipe.description || t('recipes.no_data_registry')}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--sidebar-background)]/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                            <Clock size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest rtl:tracking-normal text-[var(--muted-foreground)] opacity-60 rtl:not-italic">{t('recipes.runtime')}</span>
                            <span className="text-sm font-bold text-[var(--foreground)]">{Math.min(60, (recipe.id % 40) + 15)} {t('recipes.min')}</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--sidebar-background)]/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                            <Shield size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest rtl:tracking-normal text-[var(--muted-foreground)] opacity-60 rtl:not-italic">{t('recipes.integrity')}</span>
                            <span className="text-sm font-bold text-[var(--foreground)]">{t('recipes.verified')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

RecipeDetails.displayName = "RecipeDetails";
