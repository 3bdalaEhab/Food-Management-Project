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

import { useRecipes, useDeleteRecipe, useCreateRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { RecipeForm } from "./recipe-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

export function RecipesPage() {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const toggleViewMode = useCallback((mode: "grid" | "list") => {
        setViewMode(mode);
    }, []);

    const { data: recipesData, isLoading } = useRecipes({
        name: search,
        pageSize: 12,
        pageNumber: 1
    });

    const { mutate: deleteRecipe } = useDeleteRecipe();
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
            {/* Elite Header Concept */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-neutral-950 p-10 md:p-14 text-white border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <UtensilsCrossed size={180} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Culinary Studio</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Zap size={12} className="text-primary-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">Creation Mode</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                            Recipes <span className="text-primary-500 italic">Vault</span>
                        </h1>
                        <p className="text-white/40 font-bold max-w-xl tracking-tight text-lg">
                            Manage your high-performance culinary assets. <br className="hidden md:block" />
                            Add, refine, and orchestrate with scientific precision.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary h-16 px-10 group shadow-[0_20px_50px_rgba(255,107,38,0.3)]"
                    >
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-sm">Initialize Recipe</span>
                    </motion.button>
                </div>
            </motion.div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-5xl bg-transparent border-none p-0 overflow-visible shadow-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Create New Recipe</DialogTitle>
                    </DialogHeader>
                    <RecipeForm
                        title="New Protocol"
                        onCancel={() => setIsCreateOpen(false)}
                        onSubmit={(data) => {
                            createRecipe(data, {
                                onSuccess: () => setIsCreateOpen(false)
                            });
                        }}
                        isPending={isCreating}
                    />
                </DialogContent>
            </Dialog>

            {/* Tactical Toolbar */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-0 bg-white/5 blur-xl group-focus-within:bg-primary-500/5 transition-all rounded-3xl" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="SEARCH ARCHIVES..."
                        value={search}
                        onChange={handleSearchChange}
                        className="premium-input pl-16 h-18 bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/5 backdrop-blur-3xl font-black uppercase tracking-widest text-sm"
                        aria-label="Search recipes"
                    />
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <button className="h-18 px-8 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-3xl rounded-[1.5rem] flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:border-primary-500 hover:text-primary-500 transition-all shadow-xl shadow-neutral-200/20">
                        <Filter size={18} />
                        Refinement
                    </button>

                    <div className="h-18 bg-neutral-950 p-2 rounded-[1.5rem] flex shadow-2xl" role="tablist" aria-label="View mode">
                        <button
                            onClick={() => toggleViewMode("grid")}
                            role="tab"
                            aria-selected={viewMode === "grid"}
                            className={cn(
                                "w-14 rounded-xl flex items-center justify-center transition-all",
                                viewMode === 'grid' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'text-white/40 hover:text-white'
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
                                viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'text-white/40 hover:text-white'
                            )}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Viewport Ecosystem */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="glass-card rounded-[3rem] overflow-hidden p-6 border-white/20 bg-white/30 backdrop-blur-3xl animate-pulse">
                            <div className="w-full h-56 rounded-[2.5rem] bg-neutral-200" />
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
                                onDelete={(id) => deleteRecipe(id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02]">
                    <div className="w-32 h-32 bg-neutral-900 rounded-[3rem] shadow-2xl flex items-center justify-center mb-8 group overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ChefHat size={48} className="text-white relative z-10" />
                    </div>
                    <h3 className="text-3xl font-black text-neutral-900 tracking-tighter mb-2">VAULT IS EMPTY</h3>
                    <p className="text-neutral-400 font-bold mb-10 uppercase tracking-widest text-[11px]">System awaiting new culinary protocol initialization</p>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="premium-button premium-button-primary px-10 h-16 group"
                    >
                        <span>Start First Protocol</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
}

