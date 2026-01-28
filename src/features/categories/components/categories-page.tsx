import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    LayoutGrid,
    List,
    Sparkles,
    Edit3,
    FolderTree
} from "lucide-react";

import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from "../hooks";
import { CategoryForm } from "./category-form";
import { Skeleton, Dialog } from "@/components/ui";
import type { Category } from "../types";

export function CategoriesPage() {
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
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[11px]"
                    >
                        <Sparkles size={14} />
                        Culinary Organization
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none">
                        Recipe <span className="text-primary-500">Categories</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-neutral-100 p-1 rounded-2xl border border-neutral-200 shadow-inner">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-white text-primary-600 shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${viewMode === "list" ? "bg-white text-primary-600 shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            <List size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-14 px-8"
                    >
                        <Plus size={20} />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-12 h-14 bg-white shadow-sm border-neutral-200/60"
                    />
                </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                    {[1, 2, 3, 4, 8].map((i) => (
                        <div key={i} className="glass-card rounded-[2.5rem] p-6 h-48 animate-pulse bg-neutral-100/50" />
                    ))}
                </div>
            ) : categoriesData?.data?.length ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
                >
                    <AnimatePresence mode="popLayout">
                        {categoriesData.data.map((category) => (
                            <motion.div
                                key={category.id}
                                variants={itemVariant}
                                layout
                                className={`group glass-card rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 border-white/40 flex ${viewMode === "grid" ? "flex-col items-center text-center justify-between min-h-[14rem]" : "flex-row items-center justify-between"}`}
                            >
                                <div className={`flex items-center gap-6 ${viewMode === "grid" ? "flex-col" : "flex-row"}`}>
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary-50 text-primary-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <FolderTree size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-neutral-900 tracking-tight group-hover:text-primary-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                            <Sparkles size={12} className="text-primary-400" />
                                            <span>Active Selection</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex items-center gap-3 ${viewMode === "grid" ? "mt-6" : ""}`}>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setIsUpdateOpen(true);
                                        }}
                                        className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-primary-50 hover:text-primary-600 transition-all shadow-sm group/btn"
                                    >
                                        <Edit3 size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category.id)}
                                        className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm group/btn"
                                    >
                                        <Plus className="rotate-45 group-hover/btn:scale-110 transition-transform" size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem] border-dashed border-2 border-white/40 text-center px-6">
                    <div className="w-24 h-24 bg-neutral-100 rounded-[2.5rem] flex items-center justify-center mb-6 text-neutral-400">
                        <FolderTree size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">Empty Inventory</h3>
                    <p className="text-neutral-500 font-bold mb-8 max-w-sm">No categories found in the culinary vault. Start organizing your project now.</p>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-14 px-10"
                    >
                        <Plus size={20} />
                        <span>Initialize First Category</span>
                    </button>
                </div>
            )}

            {/* Dialogs */}
            <Dialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            >
                <CategoryForm
                    onSuccess={(data) => {
                        createCategory(data);
                        setIsCreateOpen(false);
                    }}
                    onCancel={() => setIsCreateOpen(false)}
                    isPending={isCreating}
                    title="New Category"
                />
            </Dialog>

            <Dialog
                open={isUpdateOpen}
                onOpenChange={(open) => {
                    setIsUpdateOpen(open);
                    if (!open) setSelectedCategory(null);
                }}
            >
                {selectedCategory && (
                    <CategoryForm
                        initialData={selectedCategory}
                        onSuccess={(data) => {
                            updateCategory({ id: selectedCategory.id, ...data });
                            setIsUpdateOpen(false);
                        }}
                        onCancel={() => setIsUpdateOpen(false)}
                        isPending={isUpdating}
                        title="Update Category"
                    />
                )}
            </Dialog>
        </div>
    );
}
