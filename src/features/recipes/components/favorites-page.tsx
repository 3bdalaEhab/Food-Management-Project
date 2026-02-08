import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Activity, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useDeleteRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { useFavorites } from "@/features/favorites";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { ModulePageLayout } from "@/components/shared/module-page-layout";

export function FavoritesPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Fetch favorites from API
    const { data: favorites = [], isLoading } = useFavorites();
    const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();

    // Filter favorites by search term
    const filteredFavorites = useMemo(() => {
        if (!favorites.length) return [];
        return favorites.filter(fav =>
            fav.recipe?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [favorites, search]);

    const isEmpty = !isLoading && filteredFavorites.length === 0;

    return (
        <>
            <ModulePageLayout
                title={t('favorites.title')}
                titlePrefix={t('favorites.title_prefix')}
                description={t('favorites.description')}
                subtitle={t('favorites.subtitle')}
                badgeLabel={t('favorites.badge_label')}
                HeaderIcon={Heart}
                secondaryNode={
                    <div className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-5 rounded-[2rem] shadow-xl flex items-center gap-5 min-w-[200px] group/item hover:border-red-500/30 transition-all duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 group-hover/item:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[var(--muted-foreground)] opacity-50 rtl:not-italic">{t('favorites.assets_cataloged')}</span>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-3xl font-black italic rtl:not-italic tracking-tighter rtl:tracking-normal text-[var(--foreground)] leading-none tabular-nums">{favorites.length}</span>
                                <span className="text-[8px] font-black uppercase tracking-widest rtl:tracking-normal text-red-500 opacity-40 rtl:not-italic">{t('recipes.units')}</span>
                            </div>
                        </div>
                    </div>
                }
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={t('favorites.search_placeholder')}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isLoading={isLoading}
                isEmpty={isEmpty}
                emptyState={
                    <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-red-500/20 bg-red-500/[0.02] rounded-[4rem] text-center">
                        <div className="w-32 h-32 bg-[var(--sidebar-background)] rounded-[3rem] shadow-2xl border border-[var(--border)] flex items-center justify-center mb-8 group overflow-hidden relative">
                            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Heart size={48} className="text-red-500 fill-red-500 relative z-10" />
                        </div>
                        <h3 className="text-3xl font-black italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal text-[var(--foreground)] mb-2">{t('favorites.empty_title')}</h3>
                        <p className="text-[var(--muted-foreground)] font-bold mb-8 uppercase tracking-widest rtl:tracking-normal text-[10px] rtl:not-italic">{t('favorites.empty_desc')}</p>
                        <button
                            onClick={() => navigate('/dashboard/recipes')}
                            className="premium-button premium-button-primary h-14 px-8 group"
                        >
                            <span className="font-black uppercase tracking-widest rtl:tracking-normal text-xs rtl:not-italic">{t('favorites.return_button')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                }
            >
                {filteredFavorites.map((fav) => fav.recipe && (
                    <RecipeCard
                        key={fav.id}
                        recipe={fav.recipe}
                        viewMode={viewMode}
                        onDelete={(id) => setDeleteId(id)}
                    />
                ))}
            </ModulePageLayout>

            <DeleteConfirmation
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId) {
                        deleteRecipe(deleteId, {
                            onSuccess: () => setDeleteId(null)
                        });
                    }
                }}
                isDeleting={isDeleting}
                itemName={`${t('recipes.delete_node')}_${deleteId}`}
            />
        </>
    );
}
