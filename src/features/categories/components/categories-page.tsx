import { useState, useCallback } from "react";
import { FolderTree, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from "../hooks";
import { CategoryCard } from "./category-card";
import { CategoryForm } from "./category-form";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { Category, CreateCategoryData } from "../types";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { useDebounce } from "@/hooks/use-debounce";
import { ModulePageLayout } from "@/components/shared/module-page-layout";

export function CategoriesPage() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);


    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteName, setDeleteName] = useState<string>("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const { data: categoriesData, isLoading } = useCategories({
        name: debouncedSearch,
        pageSize: 100, // Show all categories at once
    });

    const { mutate: deleteCategory } = useDeleteCategory();
    const { mutate: createCategory } = useCreateCategory();
    const { mutate: updateCategory } = useUpdateCategory();

    const handleEdit = useCallback((cat: Category) => {
        setSelectedCategory(cat);
        setIsUpdateOpen(true);
    }, []);

    const handleDelete = useCallback((id: number, name: string) => {
        setDeleteId(id);
        setDeleteName(name);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        if (deleteId) {
            deleteCategory(deleteId, {
                onSuccess: () => {
                    setDeleteId(null);
                    setDeleteName("");
                }
            });
        }
    }, [deleteId, deleteCategory]);

    const isEmpty = !isLoading && (!categoriesData?.data || categoriesData.data.length === 0);

    return (
        <>
            <ModulePageLayout
                title={t('categories.header_title')}
                description={t('categories.description')}
                titleSuffix={t('categories.header_suffix')}
                subtitle={t('categories.subtitle')}
                badgeLabel={t('categories.management')}
                HeaderIcon={FolderTree}
                primaryAction={{
                    label: t('categories.add'),
                    onClick: () => setIsCreateOpen(true),
                    icon: Plus
                }}
                secondaryNode={
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        {/* Total Categories - Advanced Analytic Node */}
                        <div className="group relative bg-[var(--background)]/40 backdrop-blur-md border border-primary-500/20 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl transition-[border-color,box-shadow] duration-150 hover:border-primary-500/40 hover:shadow-primary-500/10 flex items-center gap-6 overflow-hidden transform-gpu will-change-transform">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-[var(--sidebar-background)] border border-[var(--border)] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-105 group-hover:bg-primary-500 group-hover:border-primary-500 transition-[background-color,border-color,transform] duration-150 shadow-xl shadow-black/20">
                                <FolderTree size={32} className="text-primary-500 group-hover:text-white transition-colors duration-150" />
                                <div className="absolute inset-[2px] border border-dashed border-primary-500/30 rounded-[1.3rem] md:rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <p className="text-[9px] md:text-[10px] font-black text-primary-500/60 uppercase tracking-[0.4em] italic">{t('categories.taxonomy_nodes')}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl md:text-5xl font-black text-[var(--foreground)] italic tracking-tighter leading-none">
                                        {categoriesData?.totalNumberOfRecords || 0}
                                    </p>
                                    <span className="text-[10px] md:text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-widest opacity-40">{t('categories.items')}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                }
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={t('categories.search') || ""}
                isLoading={isLoading}
                isEmpty={isEmpty}
                emptyState={
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02] text-center px-6"
                    >
                        <div className="w-32 h-32 bg-neutral-900 rounded-[3rem] shadow-2xl flex items-center justify-center mb-8 group overflow-hidden relative border border-[var(--border)]">
                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <FolderTree size={48} className="text-primary-500/40 group-hover:text-white relative z-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase italic">{t('categories.empty')}</h3>
                            <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-[0.2em] text-[11px] opacity-60 max-w-sm mx-auto">{t('categories.empty_desc')}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCreateOpen(true)}
                            className="premium-button premium-button-primary h-16 px-10 group mt-10"
                        >
                            <span className="font-black uppercase tracking-widest text-sm">{t('categories.initialize')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </motion.button>
                    </motion.div>
                }
            >

                {categoriesData?.data?.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        viewMode={viewMode}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </ModulePageLayout>

            {/* Elite Dialog Ecosystem */}
            <CustomDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} maxWidth="2xl">
                <CategoryForm
                    onSubmit={(data: CreateCategoryData) => {
                        createCategory(data);
                        setIsCreateOpen(false);
                    }}
                    onCancel={() => setIsCreateOpen(false)}
                    title={t('categories.initialize_node')}
                />
            </CustomDialog>

            <CustomDialog
                open={isUpdateOpen}
                onOpenChange={(open) => {
                    setIsUpdateOpen(open);
                    if (!open) setSelectedCategory(null);
                }}
                maxWidth="2xl"
            >
                {selectedCategory && (
                    <CategoryForm
                        initialData={selectedCategory}
                        onSubmit={(data: CreateCategoryData) => {
                            updateCategory({ id: selectedCategory.id, ...data });
                            setIsUpdateOpen(false);
                        }}
                        onCancel={() => setIsUpdateOpen(false)}
                        title={t('categories.refine_node')}
                    />
                )}
            </CustomDialog>

            <DeleteConfirmation
                isOpen={deleteId !== null}
                onClose={() => {
                    setDeleteId(null);
                    setDeleteName("");
                }}
                onConfirm={handleConfirmDelete}
                itemName={deleteName}
            />


        </>
    );
}
