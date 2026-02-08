import { useState } from "react";
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

    const { data: categoriesData, isLoading } = useCategories({
        name: debouncedSearch,
        pageSize: 100, // Show all categories at once
    });

    const { mutate: deleteCategory } = useDeleteCategory();
    const { mutate: createCategory } = useCreateCategory();
    const { mutate: updateCategory } = useUpdateCategory();



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
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Total Categories */}
                        <div className="bg-[var(--background)]/40 backdrop-blur-md border border-[var(--border)] p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-inner flex items-center gap-4 md:gap-6">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                <FolderTree size={24} className="text-blue-500" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[8px] md:text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('categories.taxonomy_nodes')}</p>
                                <p className="text-2xl md:text-3xl font-black text-[var(--foreground)] italic leading-none">
                                    {categoriesData?.totalNumberOfRecords || 0}
                                    <span className="text-blue-500 text-xs ml-2 uppercase tracking-widest">{t('categories.items')}</span>
                                </p>
                            </div>
                        </div>

                        {/* Categories Breakdown */}
                        <div className="flex gap-3 md:gap-4">
                            <div className="flex-1 bg-[var(--background)]/40 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-inner">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-primary-500/10 flex items-center justify-center">
                                        <FolderTree size={14} className="text-primary-500" />
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('categories.categories_label')}</p>
                                </div>
                                <p className="text-xl md:text-2xl font-black text-[var(--foreground)] italic leading-none">
                                    {categoriesData?.data?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                }
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
                        viewMode="grid"
                        onEdit={(cat) => {
                            setSelectedCategory(cat);
                            setIsUpdateOpen(true);
                        }}
                        onDelete={(id) => setDeleteId(id)}
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
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId) {
                        deleteCategory(deleteId, {
                            onSuccess: () => setDeleteId(null)
                        });
                    }
                }}
                itemName={`${t('categories.delete_node')}_${deleteId}`}
            />


        </>
    );
}
