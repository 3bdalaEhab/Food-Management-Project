import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    ChefHat,
    Sparkles
} from "lucide-react";

import { useRecipes, useDeleteRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { Skeleton } from "@/components/ui";

export function RecipesPage() {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // In a real app, we'd handle pagination, but for now we'll fetch the first page
    const { data: recipesData, isLoading } = useRecipes({
        name: search,
        pageSize: 10,
        pageNumber: 1
    });

    const { mutate: deleteRecipe } = useDeleteRecipe();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
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
                        Culinary Collection
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none">
                        Recipes <span className="text-primary-500">Studio</span>
                    </h1>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="premium-button premium-button-primary shadow-xl shadow-primary-500/20"
                >
                    <Plus size={20} />
                    <span>Create New Recipe</span>
                </motion.button>
            </div>

            {/* toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search your culinary masterpieces..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-12 h-14 bg-white shadow-sm border-neutral-200/60"
                    />
                </div>

                <div className="flex gap-2">
                    <button className="h-14 px-6 bg-white border border-neutral-200/60 rounded-2xl flex items-center gap-2 font-black text-[11px] uppercase tracking-widest text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-all shadow-sm">
                        <Filter size={18} />
                        Advanced Filter
                    </button>

                    <div className="h-14 bg-white border border-neutral-200/60 rounded-2xl flex p-1 shadow-sm font-black uppercase text-[10px]">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${viewMode === 'list' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Recipes Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="glass-card rounded-[2.5rem] overflow-hidden space-y-4 p-4 border-white/40">
                            <Skeleton className="w-full h-52 rounded-[2rem]" variant="rounded" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-12 w-full mt-4" variant="rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : recipesData?.data?.length ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {recipesData.data.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onDelete={(id) => deleteRecipe(id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem] border-dashed border-2 border-white/40">
                    <div className="w-24 h-24 bg-neutral-100 rounded-[2.5rem] flex items-center justify-center mb-6 text-neutral-400">
                        <ChefHat size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-2">No Recipes Found</h3>
                    <p className="text-neutral-500 font-bold mb-8">Start your journey by creating your first culinary masterpiece.</p>
                </div>
            )}
        </div>
    );
}
