import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    LayoutGrid,
    List,
    Sparkles,
    FolderTree,
    Zap,
    ArrowRight
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from "../hooks";
import { CategoryCard } from "./category-card";
import { CategoryForm } from "./category-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";
import type { Category, CreateCategoryData } from "../types";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/shared/seo";

export function CategoriesPage() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const { data: categoriesData, isLoading } = useCategories({
        name: search,
    });

    const { mutate: deleteCategory } = useDeleteCategory();
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

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
                title={t('categories.title')}
                description={t('categories.description')}
            />
            {/* World Class Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-neutral-950 p-10 md:p-14 text-white border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <FolderTree size={200} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{t('categories.subtitle')}</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Zap size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">{t('categories.management')}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase italic">
                            {t('categories.header_title')} <span className="text-primary-500 italic">{t('categories.header_suffix')}</span>
                        </h1>
                        <p className="text-white/40 font-bold max-w-xl tracking-tight text-lg">
                            {t('categories.description')}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-16 px-10 group shadow-[0_20px_50px_rgba(255,107,38,0.3)]"
                    >
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-sm">{t('categories.add')}</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Tactical Toolbar */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-0 bg-white/5 blur-xl group-focus-within:bg-primary-500/5 transition-all rounded-3xl" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder={t('categories.search')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-16 h-18 bg-white/40 dark:bg-white/5 border-[var(--border)] backdrop-blur-3xl font-black uppercase tracking-widest text-sm"
                    />
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="h-18 bg-neutral-950 p-2 rounded-[1.5rem] flex shadow-2xl">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "w-14 rounded-xl flex items-center justify-center transition-all",
                                viewMode === 'grid' ? 'bg-primary-500 text-white shadow-lg' : 'text-white/40 hover:text-white'
                            )}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "w-14 rounded-xl flex items-center justify-center transition-all",
                                viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg' : 'text-white/40 hover:text-white'
                            )}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="glass-card rounded-[3rem] p-10 h-56 animate-pulse bg-white/30 dark:bg-white/5 backdrop-blur-3xl border border-[var(--border)]" />
                    ))}
                </div>
            ) : categoriesData?.data?.length ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
                >
                    <AnimatePresence mode="popLayout">
                        {categoriesData.data.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                viewMode={viewMode}
                                onEdit={(cat) => {
                                    setSelectedCategory(cat);
                                    setIsUpdateOpen(true);
                                }}
                                onDelete={(id) => deleteCategory(id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02] text-center px-6">
                    <div className="w-32 h-32 bg-neutral-900 rounded-[3rem] shadow-2xl flex items-center justify-center mb-8 group overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FolderTree size={48} className="text-white relative z-10" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter mb-2">{t('categories.empty')}</h3>
                    <p className="text-[var(--muted-foreground)] font-bold mb-10 uppercase tracking-widest text-[11px]">{t('categories.empty_desc')}</p>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-16 px-10 group"
                    >
                        <span>{t('categories.initialize')}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            )}

            {/* Elite Dialog Ecosystem */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-2xl bg-transparent border-none p-0 overflow-visible shadow-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>New Category Protocol</DialogTitle>
                    </DialogHeader>
                    <CategoryForm
                        onSubmit={(data: CreateCategoryData) => {
                            createCategory(data);
                            setIsCreateOpen(false);
                        }}
                        onCancel={() => setIsCreateOpen(false)}
                        isPending={isCreating}
                        title="Initialize Node"
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={isUpdateOpen}
                onOpenChange={(open) => {
                    setIsUpdateOpen(open);
                    if (!open) setSelectedCategory(null);
                }}
            >
                <DialogContent className="max-w-2xl bg-transparent border-none p-0 overflow-visible shadow-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Refine Category Protocol</DialogTitle>
                    </DialogHeader>
                    {selectedCategory && (
                        <CategoryForm
                            initialData={selectedCategory}
                            onSubmit={(data: CreateCategoryData) => {
                                updateCategory({ id: selectedCategory.id, ...data });
                                setIsUpdateOpen(false);
                            }}
                            onCancel={() => setIsUpdateOpen(false)}
                            isPending={isUpdating}
                            title="Refine Node"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
