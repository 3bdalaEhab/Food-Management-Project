import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Search,
    ArrowRight
} from "lucide-react";

import { useDeleteRecipe } from "../hooks";
import { RecipeCard } from "./recipe-card";
import { useFavorites } from "@/features/favorites";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";

export function FavoritesPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Fetch favorites from API
    const { data: favorites = [], isLoading } = useFavorites();
    const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();

    // Filter favorites by search term
    const filteredFavorites = useMemo(() => {
        if (!favorites.length) return [];
        return favorites.filter(fav =>
            fav.recipe?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [favorites, search]);

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
                    className="relative overflow-hidden rounded-[3rem] bg-[var(--sidebar-background)]/60 backdrop-blur-2xl p-8 md:p-12 text-[var(--foreground)] border border-[var(--border)] shadow-2xl group"
                >
                    {/* Technical Mesh & Glow */}
                    <div className="absolute inset-0 bg-mesh-gradient-1 opacity-[0.05] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(239,68,68,0.15)_0%,transparent_50%)]" />
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Heart size={160} strokeWidth={0.5} className="text-red-500 fill-red-500" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 flex items-center gap-2 shadow-inner">
                                    <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-red-500 rtl:not-italic">ELITE_VAULT</span>
                                </div>
                                <div className="px-5 py-2 rounded-full bg-[var(--background)]/80 border border-[var(--border)] flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-primary-500 rtl:not-italic">TECH_SYNC_OK</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none italic uppercase px-1">
                                Favorites <span className="text-red-500 italic block md:inline-block">Vault</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold max-w-xl tracking-tight text-lg leading-relaxed opacity-80 border-s-2 border-red-500/20 ps-6">
                                Your elite collection of high-performance culinary missions. Secured, synchronized, and ready for immediate execution.
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="text-5xl font-black text-[var(--foreground)] italic tracking-tighter leading-none">
                                {filteredFavorites.length}
                            </div>
                            <div className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em]">
                                ASSETS_CATALOGED
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tactical Search */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl group-focus-within:bg-red-500/10 transition-all rounded-3xl" />
                    <Search className="absolute start-6 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-red-500 transition-colors" size={24} />
                    <input
                        type="text"
                        placeholder="SCAN_VAULT_ARCHIVES..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-16 h-20 bg-[var(--background)]/80 backdrop-blur-md border-[var(--border)] font-black uppercase tracking-[0.2em] text-lg placeholder:opacity-30"
                    />
                    <div className="absolute end-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 rounded bg-black/10 border border-white/5 opacity-0 group-focus-within:opacity-100 transition-opacity">
                        <span className="text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">FILTER_ACTIVE</span>
                    </div>
                </div>

                {/* Vault Ecosystem */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-card rounded-[3rem] h-[28rem] animate-pulse bg-[var(--sidebar-background)]/30 border border-[var(--border)]" />
                        ))}
                    </div>
                ) : filteredFavorites.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredFavorites.map((fav) => fav.recipe && (
                                <RecipeCard
                                    key={fav.id}
                                    recipe={fav.recipe}
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
                            onClick={() => navigate('/dashboard/recipes')}
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
