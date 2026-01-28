import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Sparkles,
    Utensils,
    DollarSign,
    Upload,
    Loader2,
    CheckCircle2,
    X,
    Zap,
    Activity,
    ChefHat
} from "lucide-react";
import * as z from "zod";

import { useTags, useCategories } from "../hooks";
import type { CreateRecipeData } from "../types";

const recipeSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.string().min(1, "Price is required"),
    tagId: z.number().min(1, "Tag is required"),
    categoriesIds: z.array(z.number()).min(1, "At least one category is required"),
    recipeImage: z.any().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
    initialData?: Partial<CreateRecipeData>;
    onSubmit: (data: CreateRecipeData) => void;
    onCancel: () => void;
    isPending?: boolean;
    title: string;
}

export function RecipeForm({
    initialData,
    onSubmit,
    onCancel,
    isPending,
    title
}: RecipeFormProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { data: tags } = useTags();
    const { data: categoriesData } = useCategories();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            tagId: initialData?.tagId ? Number(initialData.tagId) : undefined,
            categoriesIds: initialData?.categoriesIds || [],
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("recipeImage", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = (data: RecipeFormData) => {
        onSubmit(data as CreateRecipeData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="glass-card rounded-[4rem] p-10 md:p-16 border border-[var(--border)] shadow-2xl overflow-hidden relative bg-white/40 dark:bg-black/20 backdrop-blur-3xl">
                {/* Background Tactical Polish */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-neutral-900/10 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    {/* Header Protocol */}
                    <div className="flex items-center justify-between mb-16 border-b border-[var(--border)] pb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-1.5 rounded-full bg-neutral-900 border border-[var(--border)] flex items-center gap-2">
                                    <Sparkles size={12} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 text-white">Elite Protocol</span>
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                    <Activity size={12} className="text-primary-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">Tactical UI</span>
                                </div>
                            </div>
                            <h2 className="text-5xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase leading-none italic">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-16 h-16 rounded-[2rem] bg-neutral-900 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary-500 transition-all shadow-xl group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit as any)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Master Visual Port */}
                        <div className="lg:col-span-4 space-y-6">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <Zap size={14} className="text-primary-500" />
                                Asset Port
                            </label>

                            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-neutral-900 border-2 border-dashed border-[var(--border)] hover:border-primary-500 transition-all duration-700 group cursor-pointer shadow-2xl">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewImage(null);
                                                    setValue("recipeImage", null);
                                                }}
                                                className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                                            >
                                                <X size={32} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group-hover:bg-white/5 transition-colors">
                                        <div className="w-24 h-24 rounded-[3rem] bg-white shadow-2xl flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform duration-700">
                                            <Upload size={40} />
                                        </div>
                                        <span className="text-[var(--muted-foreground)] font-black uppercase tracking-[0.2em] text-xs">Transmit Content</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Tactical Specifications */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Input */}
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">Identity Hub</label>
                                    <div className="group relative">
                                        <Utensils className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("name")} className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] h-16 pl-16 font-bold uppercase tracking-tight" placeholder="Ex: PROTOCOL_SALMON" />
                                    </div>
                                    {errors.name && <p className="text-[10px] text-primary-500 font-black ml-2 uppercase tracking-tighter">{errors.name.message}</p>}
                                </div>

                                {/* Price Input */}
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">Value Exchange</label>
                                    <div className="group relative">
                                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                        <input {...register("price")} className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] h-16 pl-16 font-black italic text-xl" placeholder="0.00" />
                                    </div>
                                    {errors.price && <p className="text-[10px] text-primary-500 font-black ml-2 uppercase tracking-tighter">{errors.price.message}</p>}
                                </div>

                                {/* Tag Selection */}
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">Classification</label>
                                    <div className="group relative">
                                        <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                                        <select
                                            {...register("tagId", { valueAsNumber: true })}
                                            className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] h-16 pl-16 font-black uppercase text-xs tracking-widest appearance-none"
                                        >
                                            <option value="">Select Class</option>
                                            {tags?.map(t => <option key={t.id} value={t.id} className="bg-neutral-900 text-white">{t.name}</option>)}
                                        </select>
                                    </div>
                                    {errors.tagId && <p className="text-[10px] text-primary-500 font-black ml-2 uppercase">{errors.tagId.message}</p>}
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">Taxonomy Core</label>
                                    <div className="group relative">
                                        <ChefHat className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                                        <select
                                            multiple
                                            className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] h-32 pl-16 font-black uppercase text-xs tracking-widest pt-5"
                                            onChange={(e) => {
                                                const options = Array.from(e.target.selectedOptions, option => Number(option.value));
                                                setValue("categoriesIds", options);
                                            }}
                                        >
                                            {categoriesData?.data?.map(c => <option key={c.id} value={c.id} className="bg-neutral-900 text-white p-2 mb-1 rounded-lg">{c.name}</option>)}
                                        </select>
                                    </div>
                                    {errors.categoriesIds && <p className="text-[10px] text-primary-500 font-black ml-2 uppercase">{errors.categoriesIds.message}</p>}
                                </div>
                            </div>

                            {/* Description Terminal */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">Data Stream (Description)</label>
                                <textarea
                                    {...register("description")}
                                    className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] min-h-[160px] py-6 px-6 font-bold leading-relaxed text-sm"
                                    placeholder="INITIATING NARRATIVE STREAM..."
                                />
                                {errors.description && <p className="text-[10px] text-primary-500 font-black ml-2 uppercase">{errors.description.message}</p>}
                            </div>

                            {/* Execution Controls */}
                            <div className="flex gap-6 pt-10 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="h-18 px-10 rounded-[2rem] bg-neutral-900 text-white/50 font-black uppercase tracking-widest text-xs hover:text-white hover:bg-neutral-800 transition-all shadow-xl"
                                >
                                    ABORT
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending || !isValid}
                                    className="premium-button premium-button-primary flex-1 h-18 text-lg font-black uppercase tracking-[0.2em] relative overflow-hidden group shadow-[0_32px_64px_-12px_rgba(255,107,38,0.5)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    {isPending ? <Loader2 className="animate-spin w-8 h-8" /> : (
                                        <div className="flex items-center gap-4">
                                            <span>INITIALIZE MASTERPIECE</span>
                                            <CheckCircle2 size={24} className="group-hover:rotate-12 transition-transform" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
