import { useState } from "react";
import { Utensils, Plus, Activity, FolderTree } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRecipes, useDeleteRecipe, useCreateRecipe, useUpdateRecipe } from "../hooks";
import { useCategories } from "@/features/categories/hooks";
import { RecipeCard } from "./recipe-card";
import { RecipeForm } from "./recipe-form";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { Recipe, CreateRecipeData } from "../types";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { RecipeDetails } from "./recipe-details";
import { useDebounce } from "@/hooks/use-debounce";
import { useAuthStore, selectIsAdmin } from "@/stores";
import { ModulePageLayout } from "@/components/shared/module-page-layout";


export function RecipesPage() {
    const { t } = useTranslation();
    const isAdmin = useAuthStore(selectIsAdmin);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: recipesData, isLoading } = useRecipes({
        name: debouncedSearch,
        pageSize: 1000, // Show all categories at once (high limit for simulation) (high limit for simulation)
    });

    const { data: categoriesData } = useCategories();

    const { mutate: deleteRecipe } = useDeleteRecipe();
    const { mutate: createRecipe } = useCreateRecipe();
    const { mutate: updateRecipe } = useUpdateRecipe();

    const isEmpty = !isLoading && (!recipesData?.data || recipesData.data.length === 0);

    const handleView = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsDetailsOpen(true);
    };

    const handleEdit = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsUpdateOpen(true);
    };

    return (
        <>
            <ModulePageLayout
                title={t('recipes.title_prefix')}
                titleSuffix={t('recipes.title_suffix')}
                description={t('recipes.description')}
                subtitle={t('recipes.subtitle')}
                badgeLabel={t('recipes.registry_system')}
                HeaderIcon={Utensils}
                primaryAction={isAdmin ? {
                    label: t('recipes.add'),
                    onClick: () => setIsCreateOpen(true),
                    icon: Plus
                } : undefined}
                secondaryNode={
                    <div className="flex gap-4">
                        <div className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-5 rounded-[2rem] shadow-xl flex items-center gap-5 min-w-[200px] group/item hover:border-primary-500/30 transition-all duration-500">
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500 shrink-0 group-hover/item:scale-110 transition-transform">
                                <Activity size={20} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[var(--muted-foreground)] opacity-50 rtl:not-italic">{t('recipes.active_deployments')}</span>
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black italic rtl:not-italic tracking-tighter rtl:tracking-normal text-[var(--foreground)] leading-none tabular-nums">{recipesData?.totalNumberOfRecords || 0}</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest rtl:tracking-normal text-primary-500 opacity-40 rtl:not-italic">{t('recipes.units')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-5 rounded-[2rem] shadow-xl flex items-center gap-5 min-w-[200px] group/item hover:border-blue-500/30 transition-all duration-500">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 group-hover/item:scale-110 transition-transform">
                                <FolderTree size={20} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[var(--muted-foreground)] opacity-50 rtl:not-italic">{t('categories.management')}</span>
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black italic rtl:not-italic tracking-tighter rtl:tracking-normal text-[var(--foreground)] leading-none tabular-nums">{categoriesData?.totalNumberOfRecords || 0}</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest rtl:tracking-normal text-blue-500 opacity-40 rtl:not-italic">{t('categories.initialize')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={t('recipes.search_placeholder')}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isLoading={isLoading}
                isEmpty={isEmpty}
                emptyState={
                    <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-[var(--border)] rounded-[4rem] text-center">
                        <Utensils size={64} className="text-[var(--muted-foreground)]/20 mb-6" />
                        <h3 className="text-3xl font-black italic rtl:not-italic uppercase tracking-tighter rtl:tracking-normal text-[var(--foreground)] mb-2">{t('recipes.empty')}</h3>
                        <p className="text-[var(--muted-foreground)] font-bold mb-8 uppercase tracking-widest rtl:tracking-normal text-[10px] rtl:not-italic">{t('recipes.empty_desc')}</p>
                        {isAdmin && (
                            <button onClick={() => setIsCreateOpen(true)} className="premium-button premium-button-primary h-14 px-8">
                                <Plus size={20} />
                                <span className="font-black uppercase tracking-widest rtl:tracking-normal text-xs rtl:not-italic">{t('recipes.start_first')}</span>
                            </button>
                        )}
                    </div>
                }
            >
                {recipesData?.data?.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        viewMode={viewMode}
                        onEdit={handleEdit}
                        onDelete={(id) => setDeleteId(id)}
                        onView={handleView}
                    />
                ))}
            </ModulePageLayout>

            {/* Dialog Ecosystem */}
            <CustomDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} maxWidth="4xl">
                <RecipeForm
                    onSubmit={(data: CreateRecipeData) => {
                        createRecipe(data);
                        setIsCreateOpen(false);
                    }}
                    onCancel={() => setIsCreateOpen(false)}
                    title={t('recipes.masterpiece')}
                />
            </CustomDialog>

            <CustomDialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen} maxWidth="4xl">
                {selectedRecipe && (
                    <RecipeForm
                        initialData={selectedRecipe ? {
                            ...selectedRecipe,
                            price: String(selectedRecipe.price)
                        } : undefined}
                        onSubmit={(data: CreateRecipeData) => {
                            updateRecipe({ id: selectedRecipe.id, ...data });
                            setIsUpdateOpen(false);
                        }}
                        onCancel={() => setIsUpdateOpen(false)}
                        title={t('recipes.registry_system')}
                    />
                )}
            </CustomDialog>

            <CustomDialog
                open={isDetailsOpen}
                onOpenChange={(open) => {
                    setIsDetailsOpen(open);
                    if (!open) setSelectedRecipe(null);
                }}
                maxWidth="2xl"
            >
                {selectedRecipe && (
                    <RecipeDetails
                        recipe={selectedRecipe}
                        onClose={() => setIsDetailsOpen(false)}
                    />
                )}
            </CustomDialog>

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
                itemName={`${t('recipes.delete_node')}_${deleteId}`}
            />
        </>
    );
}
