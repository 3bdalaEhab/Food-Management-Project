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
    X
} from "lucide-react";
import * as z from "zod";

import { useTags, useCategories } from "../hooks";
import type { CreateRecipeData } from "../types";

const recipeSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.string().min(1, "Price is required"),
    tagId: z.coerce.number().min(1, "Tag is required"),
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
            tagId: initialData?.tagId,
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="glass-card rounded-[3.5rem] p-8 md:p-14 border border-white/40 shadow-2xl overflow-hidden relative">
                {/* Background Polish */}
                <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary-500/10 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[11px]">
                                <Sparkles size={14} />
                                Culinary Studio
                            </div>
                            <h2 className="text-4xl font-black text-neutral-900 tracking-tight">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left Column: Image Upload */}
                        <div className="space-y-6">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">
                                Recipe Visuals
                            </label>

                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-neutral-100 group border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-all duration-500">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewImage(null);
                                                    setValue("recipeImage", null);
                                                }}
                                                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                                            <Upload size={32} />
                                        </div>
                                        <span className="text-neutral-600 font-black uppercase tracking-wider text-xs">Drop your dish here</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Recipe Name</label>
                                <div className="relative group">
                                    <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input {...register("name")} className="premium-input pl-12" placeholder="Ex: Mediterranean Salmon" />
                                </div>
                                {errors.name && <p className="text-[10px] text-error font-black ml-1">{errors.name.message}</p>}
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Price ($)</label>
                                <div className="relative group">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                                    <input {...register("price")} className="premium-input pl-12" placeholder="0.00" />
                                </div>
                                {errors.price && <p className="text-[10px] text-error font-black ml-1">{errors.price.message}</p>}
                            </div>

                            {/* Tag & Category Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Tag</label>
                                    <select
                                        {...register("tagId")}
                                        className="premium-input text-sm"
                                    >
                                        <option value="">Select Tag</option>
                                        {tags?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                    {errors.tagId && <p className="text-[10px] text-error font-black ml-1">{errors.tagId.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Category</label>
                                    <select
                                        multiple
                                        className="premium-input text-sm h-12"
                                        onChange={(e) => {
                                            const options = Array.from(e.target.selectedOptions, option => Number(option.value));
                                            setValue("categoriesIds", options);
                                        }}
                                    >
                                        {categoriesData?.data?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    {errors.categoriesIds && <p className="text-[10px] text-error font-black ml-1">{errors.categoriesIds.message}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Description</label>
                                <textarea
                                    {...register("description")}
                                    className="premium-input min-h-[120px] py-4"
                                    placeholder="Tell the story of this dish..."
                                />
                                {errors.description && <p className="text-[10px] text-error font-black ml-1">{errors.description.message}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="premium-button flex-1 py-4 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending || !isValid}
                                    className="premium-button premium-button-primary flex-[2] py-4"
                                >
                                    {isPending ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            <span>Save Masterpiece</span>
                                            <CheckCircle2 size={18} />
                                        </>
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
