import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Utensils,
    DollarSign,
    Upload,
    Loader2,
    X,
    ArrowRight,
    FileText,
    Image as ImageIcon,
    Save,
    ShieldCheck,
    Boxes,
    Palette
} from "lucide-react";
import * as z from "zod";
import { useTags } from "../hooks";
import { useCategories } from "@/features/categories/hooks";
import { useTranslation } from "react-i18next";
import { TacticalInput } from "@/components/shared/tactical-input";
import { cn } from "@/lib/utils";
import type { CreateRecipeData } from "../types";

const recipeSchema = z.object({
    name: z.string()
        .min(3, "IDENTITY TOO SHORT")
        .max(50, "IDENTITY TOO LONG (50 MAX)"),
    description: z.string()
        .min(10, "DATA STREAM TOO SHORT")
        .max(500, "DATA STREAM TOO LONG (500 MAX)"),
    price: z.string()
        .min(1, "VALUE REQUIRED")
        .max(10, "VALUE TOO LONG"),
    tagId: z.number().min(1, "CLASSIFICATION REQUIRED"),
    categoriesIds: z.array(z.number()).default([]),
    recipeImage: z.any().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
    initialData?: Partial<CreateRecipeData> & { imagePath?: string };
    onSubmit: (data: CreateRecipeData) => void;
    onCancel: () => void;
    isPending?: boolean;
    title: string;
}

/**
 * RecipeForm - "Masterpiece Creator" Aesthetic
 * Focused on orange/culinary vibrant vibes.
 * Fully optimized for Light and Dark modes.
 */
export function RecipeForm({ initialData, onSubmit, onCancel, isPending, title }: RecipeFormProps) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const { data: tags } = useTags();
    const { data: categoriesData } = useCategories();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema) as any,
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            tagId: initialData?.tagId || 0,
            categoriesIds: initialData?.categoriesIds || [],
        },
        mode: "onChange",
    });

    const categoriesIds = watch("categoriesIds");
    const tagId = watch("tagId");
    const recipeImage = watch("recipeImage");

    const toggleCategory = (id: number) => {
        const current = [...categoriesIds];
        const index = current.indexOf(id);
        if (index > -1) current.splice(index, 1);
        else current.push(id);
        setValue("categoriesIds", current, { shouldValidate: true });
    };

    const handleFormSubmit = (data: RecipeFormData) => {
        onSubmit(data as unknown as CreateRecipeData);
    };

    return (
        <div className="flex flex-col h-full max-h-[85vh] bg-[var(--sidebar-background)] rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-2xl relative">
            {/* Masterpiece Progress Header */}
            <div className="p-6 pb-2 border-b border-[var(--border)] bg-gradient-to-b from-primary-500/[0.03] to-transparent">
                <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary-500 mb-1">
                            <Palette size={12} className="animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-80">MASTERPIECE_CREATOR_ACTIVE</span>
                        </div>
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none">
                            {title}
                        </h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-1 h-1 relative overflow-hidden bg-[var(--muted)] rounded-full">
                            <motion.div
                                initial={false}
                                animate={{ x: step >= i ? "0%" : "-100%" }}
                                className="absolute inset-0 bg-primary-500 shadow-[0_0_10px_rgba(255,107,38,0.4)]"
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <form id="recipe-form" onSubmit={handleSubmit(handleFormSubmit) as any} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <TacticalInput
                                    label="Artistic Identity"
                                    placeholder="ENTER_RECIPE_NAME"
                                    icon={Utensils}
                                    error={errors.name?.message}
                                    {...register("name")}
                                    maxLength={50}
                                />
                                <TacticalInput
                                    label="Venture Valuation"
                                    placeholder="0.00"
                                    icon={DollarSign}
                                    error={errors.price?.message}
                                    {...register("price")}
                                    maxLength={10}
                                    type="text"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] ml-1">{t('recipes.classification_nodes')}</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {tags?.map((tag: any) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => setValue("tagId", tag.id)}
                                            className={cn(
                                                "p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all text-center",
                                                tagId === tag.id
                                                    ? "bg-primary-500 border-primary-400 text-white shadow-xl shadow-primary-500/20"
                                                    : "bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)] hover:border-primary-500/40"
                                            )}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                                {errors.tagId && <p className="text-[9px] text-red-500 font-bold italic uppercase tracking-wider">{errors.tagId.message}</p>}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <TacticalInput
                                label="Culinary Narrative"
                                placeholder="ENTER_TECHNICAL_SPECIFICATIONS..."
                                icon={FileText}
                                error={errors.description?.message}
                                {...register("description")}
                                maxLength={500}
                                className="min-h-[120px] pt-4"
                            />

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 px-1">
                                    <Boxes size={12} className="text-primary-500" />
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{t('recipes.taxonomy_mapping')}</label>
                                </div>
                                <div className="flex flex-wrap gap-2 p-6 rounded-[2rem] bg-[var(--background)]/40 border border-[var(--border)]">
                                    {categoriesData?.data?.map((cat: any) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => toggleCategory(cat.id)}
                                            className={cn(
                                                "px-5 py-2.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all",
                                                categoriesIds.includes(cat.id)
                                                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xl"
                                                    : "bg-[var(--background)]/30 border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                                            )}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 px-1">
                                    <ImageIcon size={16} className="text-primary-500" />
                                    <h3 className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]">{t('recipes.visual_encoding')}</h3>
                                </div>

                                <label className="block group cursor-pointer">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setValue("recipeImage", file);
                                        }}
                                    />
                                    <div className={cn(
                                        "w-full aspect-square max-h-72 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all overflow-hidden relative",
                                        recipeImage || initialData?.imagePath
                                            ? "border-primary-500/50"
                                            : "border-[var(--border)] bg-[var(--background)]/60 hover:border-primary-500/50 hover:bg-primary-500/[0.03]"
                                    )}>
                                        {(recipeImage || initialData?.imagePath) ? (
                                            <div className="absolute inset-0 group">
                                                <img
                                                    src={recipeImage instanceof File
                                                        ? URL.createObjectURL(recipeImage)
                                                        : `${import.meta.env.VITE_API_BASE_URL.split('/api/v1')[0]}/${initialData?.imagePath}`}
                                                    className="w-full h-full object-cover"
                                                    alt="Recipe Image"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                                    <Upload className="text-white" size={24} />
                                                    <p className="text-white text-xs font-bold uppercase">{t('recipes.replace_image')}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                                                    <Upload className="text-primary-500" size={28} />
                                                </div>
                                                <div className="space-y-2 px-6 text-center">
                                                    <p className="text-sm font-black uppercase tracking-wide text-[var(--foreground)]">📸 {t('recipes.upload_instruction')}</p>
                                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)]">PNG, JPG, WEBP</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            <div className="p-6 border-t border-[var(--border)] bg-[var(--background)]/30 flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => step === 1 ? onCancel() : setStep(s => s - 1)}
                    className="h-12 px-8 rounded-xl border border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all flex items-center gap-3"
                >
                    <X size={14} />
                    {step === 1 ? t('common.cancel') : "Back Protocol"}
                </button>

                {step < 3 ? (
                    <button
                        type="button"
                        onClick={() => setStep(s => s + 1)}
                        className="h-12 px-10 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-primary-500 hover:text-white transition-all shadow-xl group"
                    >
                        Forward Module
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        form="recipe-form"
                        disabled={isPending}
                        className="h-12 px-10 rounded-xl bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-primary-600 transition-all shadow-[0_10px_25px_-5px_rgba(255,107,38,0.4)] disabled:opacity-50 group font-mono"
                    >
                        {isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <>
                                <Save size={16} />
                                Commit Masterpiece
                                <ShieldCheck size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
