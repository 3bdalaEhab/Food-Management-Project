import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Search,
    ArrowRight,
    Sparkles
} from "lucide-react";

import { useRecipes, useDeleteRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { useAppStore } from "@/stores";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";

export function FavoritesPage() {
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { favorites } = useAppStore();

    // Fetch all recipes (we'll filter them locally to find favorites)
    const { data: recipesData, isLoading } = useRecipes({
        pageSize: 100, // Load enough to cover most favorites
        pageNumber: 1
    });

    const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();

    const favoriteRecipes = useMemo(() => {
        if (!recipesData?.data) return [];
        return recipesData.data.filter(recipe => favorites.includes(recipe.id))
            .filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));
    }, [recipesData, favorites, search]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <PageWrapper>
            <div className="space-y-12 pb-24">
                {/* Vault Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-[4rem] bg-[var(--sidebar-background)] p-12 md:p-16 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(239,68,68,0.15)_0%,transparent_50%)]" />
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Heart size={200} strokeWidth={0.5} className="fill-red-500" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                                    <Heart size={12} className="text-red-500 fill-red-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Curated Vault</span>
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                    <Sparkles size={12} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">NODE_SYNC_ACTIVE</span>
                                </div>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
                                Favorites <span className="text-red-500 italic">Vault</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold max-w-xl tracking-tight text-xl">
                                Your elite collection of high-performance culinary missions. <br />
                                Secured, synchronized, and ready for immediate execution.
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="text-5xl font-black text-[var(--foreground)] italic tracking-tighter leading-none">
                                {favoriteRecipes.length}
                            </div>
                            <div className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em]">
                                ASSETS_CATALOGED
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tactical Search */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute inset-0 bg-red-500/5 blur-2xl group-focus-within:bg-red-500/10 transition-all rounded-3xl" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-red-500 transition-colors" size={24} />
                    <input
                        type="text"
                        placeholder="SCAN VAULT ARCHIVES..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-16 h-20 bg-[var(--background)]/80 border-[var(--border)] font-black uppercase tracking-widest text-lg"
                    />
                </div>

                {/* Vault Ecosystem */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-card rounded-[3rem] h-[28rem] animate-pulse bg-[var(--sidebar-background)]/30 border border-[var(--border)]" />
                        ))}
                    </div>
                ) : favoriteRecipes.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {favoriteRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onDelete={(id) => setDeleteId(id)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-red-500/20 bg-red-500/[0.02]">
                        <div className="w-32 h-32 bg-[var(--sidebar-background)] rounded-[3rem] shadow-2xl border border-[var(--border)] flex items-center justify-center mb-8 group overflow-hidden relative">
                            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Heart size={48} className="text-red-500 fill-red-500 relative z-10" />
                        </div>
                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tighter mb-2">VAULT IS SECURED</h3>
                        <p className="text-[var(--muted-foreground)] font-bold mb-10 uppercase tracking-widest text-[11px]">Deploy new favorites to synchronize this node</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/dashboard/recipes'}
                            className="premium-button bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:bg-red-500 hover:text-white hover:border-red-400 px-10 h-16 group"
                        >
                            <span>Return to Archives</span>
                            <ArrowRight size={20} className="text-red-500 group-hover:translate-x-2 transition-transform group-hover:text-white" />
                        </motion.button>
                    </div>
                )}
            </div>

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
                itemName={`FAVORITE_RECIPE_${deleteId}`}
            />
        </PageWrapper>
    );
}
