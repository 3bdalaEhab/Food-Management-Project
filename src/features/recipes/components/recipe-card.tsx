```typescript
import { motion } from "framer-motion";
import { Utensils, Clock, Edit2, Trash2, Heart } from "lucide-react";
import type { Recipe } from "../types";
import { Badge } from "@/components/ui";

interface RecipeCardProps {
    recipe: Recipe;
    onEdit?: (recipe: Recipe) => void;
    onDelete?: (id: number) => void;
    onToggleFavorite?: (id: number) => void;
    isFavorite?: boolean;
}

export function RecipeCard({
    recipe,
    onEdit,
    onDelete,
    onToggleFavorite,
    isFavorite
}: RecipeCardProps) {
    const imageUrl = recipe.imagePath
        ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
        : "/placeholder-recipe.jpg";

return (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="group relative h-full"
    >
        <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-white/40 shadow-xl shadow-neutral-200/40 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick Labels */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="outline" className="backdrop-blur-md bg-white/20 text-white border-white/30">
                        {recipe.tag.name}
                    </Badge>
                </div>

                {/* actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <button
                        onClick={() => onToggleFavorite?.(recipe.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={() => onEdit?.(recipe)}
                        className="w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-neutral-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {recipe.name}
                    </h3>
                    <span className="text-lg font-black text-primary-600">
                        ${recipe.price}
                    </span>
                </div>

                <p className="text-neutral-500 text-sm font-medium line-clamp-2 mb-6 flex-1">
                    {recipe.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-neutral-400">
                            <Utensils size={14} className="text-secondary-500" />
                            <span className="text-[11px] font-black uppercase tracking-wider">
                                {recipe.category?.[0]?.name || "General"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                            <Clock size={14} />
                            <span className="text-[11px] font-black uppercase tracking-wider">
                                25 Mins
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => onDelete?.(recipe.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);
}
