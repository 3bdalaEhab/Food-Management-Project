import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    ChefHat,
    Zap,
    Sparkles,
    ArrowRight,
    UtensilsCrossed
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { useRecipes, useDeleteRecipe, useCreateRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { RecipeForm } from "./recipe-form";
import type { CreateRecipeData } from "../types";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/shared/seo";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { useDebounce } from "@/hooks/use-debounce";

export function RecipesPage() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const toggleViewMode = useCallback((mode: "grid" | "list") => {
        setViewMode(mode);
    }, []);

    const { data: recipesData, isLoading } = useRecipes({
        name: debouncedSearch,
        pageSize: 12,
        pageNumber: 1
    });

    const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();
    const { mutate: createRecipe, isPending: isCreating } = useCreateRecipe();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="space-y-12 pb-24">
            <SEO
                title={t('recipes.title')}
                description={t('recipes.description')}
            />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-[var(--sidebar-background)] p-10 md:p-14 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <UtensilsCrossed size={180} strokeWidth={0.5} className="text-[var(--foreground)]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                <Sparkles size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('recipes.subtitle')}</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Zap size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">{t('recipes.mode')}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase italic">
                            {t('recipes.header_title')} <span className="text-primary-500 italic">{t('recipes.header_suffix')}</span>
                        </h1>
                        <p className="text-[var(--muted-foreground)] font-bold max-w-xl tracking-tight text-lg">
                            {t('recipes.description')}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-16 px-10 group shadow-2xl"
                    >
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-sm">{t('recipes.add')}</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Add Recipe Dialog */}
            <CustomDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} maxWidth="5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full overflow-hidden rounded-[3rem] border border-[var(--border)] bg-[var(--sidebar-background)] shadow-2xl"
                >
                    <RecipeForm
                        title={t('recipes.new_recipe')}
                        onSubmit={(data: CreateRecipeData) => {
                            createRecipe(data, {
                                onSuccess: () => setIsCreateOpen(false)
                            });
                        }}
                        onCancel={() => setIsCreateOpen(false)}
                        isPending={isCreating}
                    />
                </motion.div>
            </CustomDialog>

            {/* Tactical Toolbar */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-0 bg-primary-500/5 blur-xl group-focus-within:bg-primary-500/10 transition-all rounded-3xl" />
                    <Search className="absolute inset-inline-start-6 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder={t('recipes.search')}
                        value={search}
                        onChange={handleSearchChange}
                        className="premium-input ps-16 h-18 bg-[var(--background)]/80 border-[var(--border)] font-bold tracking-wide text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                        aria-label="Search recipes"
                    />
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <button className="h-18 px-8 bg-[var(--background)]/80 border border-[var(--border)] rounded-[1.5rem] flex items-center gap-3 font-bold text-[11px] tracking-wider text-[var(--muted-foreground)] hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm">
                        <Filter size={18} />
                        {t('recipes.refinement')}
                    </button>
                    <div className="h-18 bg-[var(--background)] border border-[var(--border)] p-2 rounded-[1.5rem] flex shadow-sm" role="tablist" aria-label="View mode">
                        <button
                            onClick={() => toggleViewMode("grid")}
                            role="tab"
                            aria-selected={viewMode === "grid"}
                            className={cn(
                                "w-14 rounded-xl flex items-center justify-center transition-all",
                                viewMode === 'grid' ? 'bg-primary-500 text-white shadow-lg' : 'text-[var(--muted-foreground)] hover:text-primary-500'
                            )}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => toggleViewMode("list")}
                            role="tab"
                            aria-selected={viewMode === "list"}
                            className={cn(
                                "w-14 rounded-xl flex items-center justify-center transition-all",
                                viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg' : 'text-[var(--muted-foreground)] hover:text-primary-500'
                            )}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Viewport Ecosystem */}
            {
                isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="glass-card rounded-[3rem] overflow-hidden p-6 border border-[var(--border)] bg-[var(--sidebar-background)]/60 animate-pulse">
                                <div className="w-full h-56 rounded-[2.5rem] bg-neutral-200/20" />
                                <div className="mt-8 space-y-4">
                                    <div className="h-8 w-3/4 bg-neutral-200 rounded-full" />
                                    <div className="h-4 w-full bg-neutral-200 rounded-full" />
                                    <div className="h-12 w-full mt-6 bg-neutral-200 rounded-[1.5rem]" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recipesData?.data?.length ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {recipesData.data.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onDelete={(id) => setDeleteId(id)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02]">
                        <div className="w-32 h-32 bg-[var(--sidebar-background)] rounded-[3rem] shadow-2xl border border-[var(--border)] flex items-center justify-center mb-8 group overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ChefHat size={48} className="text-primary-500/40 group-hover:text-white relative z-10" />
                        </div>
                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter mb-2">{t('recipes.empty')}</h3>
                        <p className="text-[var(--muted-foreground)] font-bold mb-10 uppercase tracking-widest text-[11px]">{t('recipes.empty_desc')}</p>
                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="premium-button premium-button-primary px-10 h-16 group"
                        >
                            <span>{t('recipes.start_first')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                )
            }

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
        </div >
    );
}

