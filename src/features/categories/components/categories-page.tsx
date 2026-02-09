import { useState, useCallback, lazy, Suspense } from "react";
import { FolderTree, Plus, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from "../hooks";
import { CategoryCard } from "./category-card";

// Lazy load CategoryForm
const CategoryForm = lazy(() => import("./category-form").then(m => ({ default: m.CategoryForm })));

import { CustomDialog } from "@/components/shared/custom-dialog";
import { Category, CreateCategoryData } from "../types";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { useDebounce } from "@/hooks/use-debounce";
import { ModulePageLayout } from "@/components/shared/module-page-layout";

const DialogLoader = () => (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
        <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Loading Module...</p>
    </div>
);

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
        pageSize: 1000, // Show all categories at once (high limit for simulation)
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
                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 w-full sm:w-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl flex items-center gap-4 md:gap-6 hover:border-primary-500/30 transition-all duration-500 group overflow-hidden relative min-w-full sm:min-w-[320px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20 relative z-10 group-hover:rotate-12 transition-transform">
                                <FolderTree size={28} className="text-white" />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                                    <p className="text-[9px] font-black text-primary-500 uppercase tracking-[0.4em] rtl:tracking-normal italic rtl:not-italic leading-none">{t('categories.taxonomy_nodes')}</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter rtl:tracking-normal leading-none italic rtl:not-italic uppercase tabular-nums">
                                        {categoriesData?.totalNumberOfRecords || 0}
                                    </p>
                                    <span className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-widest rtl:tracking-normal opacity-60 rtl:not-italic">{t('categories.items')}</span>
                                </div>
                            </div>
                        </motion.div>
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
                            <h3 className="text-4xl font-black text-[var(--foreground)] tracking-tighter rtl:tracking-normal leading-none italic rtl:not-italic">{t('categories.empty')}</h3>
                            <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-[11px] opacity-60 max-w-sm mx-auto rtl:not-italic">{t('categories.empty_desc')}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCreateOpen(true)}
                            className="premium-button premium-button-primary h-16 px-10 group mt-10"
                        >
                            <span className="font-black uppercase tracking-widest rtl:tracking-normal text-sm rtl:not-italic">{t('categories.initialize')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
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
                <Suspense fallback={<DialogLoader />}>
                    <CategoryForm
                        onSubmit={(data: CreateCategoryData) => {
                            createCategory(data);
                            setIsCreateOpen(false);
                        }}
                        onCancel={() => setIsCreateOpen(false)}
                        title={t('categories.initialize_node')}
                    />
                </Suspense>
            </CustomDialog>

            <CustomDialog
                open={isUpdateOpen}
                onOpenChange={(open) => {
                    setIsUpdateOpen(open);
                    if (!open) setSelectedCategory(null);
                }}
                maxWidth="2xl"
            >
                <Suspense fallback={<DialogLoader />}>
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
                </Suspense>
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
