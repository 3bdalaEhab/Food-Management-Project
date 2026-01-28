import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Utensils,
    DollarSign,
    Upload,
    Loader2,
    CheckCircle2,
    X,
    Activity,
    ArrowRight,
    ArrowLeft,
    Zap,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import * as z from "zod";

import { useTags } from "../hooks";
import type { CreateRecipeData } from "../types";

// Schema - Taxonomy Core (Categories) Removed
const recipeSchema = z.object({
    name: z.string().min(3, "IDENTITY REQUIRED"),
    description: z.string().min(10, "DATA STREAM TOO SHORT"),
    price: z.string().min(1, "VALUE REQUIRED"),
    tagId: z.number().min(1, "CLASSIFICATION REQUIRED"),
    // categoriesIds removed as per Protocol Update
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

type Step = 1 | 2;

export function RecipeForm({
    initialData,
    onSubmit,
    onCancel,
    isPending,
    title
}: RecipeFormProps) {
    const [step, setStep] = useState<Step>(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { data: tags } = useTags();

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isValid },
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            tagId: initialData?.tagId ? Number(initialData.tagId) : undefined,
            // categoriesIds ignored
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

    const nextStep = async () => {
        const fields: (keyof RecipeFormData)[] = step === 1 ? ["name", "tagId", "price"] : [];
        const isStepValid = await trigger(fields);
        if (isStepValid) setStep(2);
    };

    const prevStep = () => setStep(1);

    const onFormSubmit = (data: RecipeFormData) => {
        // Ensure legacy fields are handled if API expects them
        const submissionData = {
            ...data,
            categoriesIds: [] // Explicitly sending empty array for Taxonomy Core
        };
        onSubmit(submissionData as CreateRecipeData);
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="glass-card rounded-[3rem] p-6 md:p-10 border border-[var(--border)] shadow-2xl overflow-hidden relative bg-[var(--sidebar-background)]/90 backdrop-blur-3xl">

                {/* Protocol Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-1.5">
                                <Activity size={10} className="text-primary-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary-400">New Protocol</span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Step {step} / 2</span>
                        </div>
                        <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none italic">{title}</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-white hover:bg-primary-500 hover:border-primary-500 transition-all shadow-lg group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
                    {/* Progress Line */}
                    <div className="w-full h-1 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
                        <motion.div
                            animate={{ width: step === 1 ? "50%" : "100%" }}
                            className="h-full bg-primary-500 shadow-[0_0_10px_rgba(255,107,38,0.5)]"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                {/* Grid Layout for Compactness */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Image Upload - Compact */}
                                    <div className="md:col-span-2 flex justify-center mb-2">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-28 h-28 rounded-[2rem] bg-[var(--background)] border-2 border-dashed border-[var(--border)] flex items-center justify-center overflow-hidden transition-all group-hover:border-primary-500/50 shadow-inner">
                                                {previewImage ? (
                                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <ImageIcon className="text-[var(--muted-foreground)]/30 w-8 h-8" />
                                                        <span className="text-[8px] font-black uppercase text-[var(--muted-foreground)]/50">Upload</span>
                                                    </div>
                                                )}
                                            </div>
                                            <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg ring-4 ring-[var(--sidebar-background)]">
                                                <Upload size={16} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                            <Utensils size={10} className="text-primary-500" />
                                            Identity Hub
                                        </label>
                                        <input
                                            {...register("name")}
                                            className="premium-input bg-[var(--background)]/50 border-[var(--border)] h-14 pl-6 font-bold uppercase tracking-tight text-sm w-full rounded-2xl focus:border-primary-500 transition-all outline-none"
                                            placeholder="PROTOCOL_NAME"
                                        />
                                        {errors.name && <p className="text-[9px] text-primary-500 font-bold ml-2 uppercase tracking-tighter">{errors.name.message}</p>}
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                            <DollarSign size={10} className="text-primary-500" />
                                            Value
                                        </label>
                                        <input
                                            {...register("price")}
                                            className="premium-input bg-[var(--background)]/50 border-[var(--border)] h-14 pl-6 font-black italic text-lg w-full rounded-2xl focus:border-primary-500 transition-all outline-none"
                                            placeholder="0.00"
                                        />
                                        {errors.price && <p className="text-[9px] text-primary-500 font-bold ml-2 uppercase tracking-tighter">{errors.price.message}</p>}
                                    </div>

                                    {/* Classification (Tags) */}
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                            <Zap size={10} className="text-primary-500" />
                                            Class
                                        </label>
                                        <select
                                            {...register("tagId", { valueAsNumber: true })}
                                            className="premium-input bg-[var(--background)]/50 border-[var(--border)] h-14 pl-6 font-black uppercase text-xs tracking-widest w-full rounded-2xl focus:border-primary-500 transition-all outline-none appearance-none"
                                        >
                                            <option value="">SELECT CLASS</option>
                                            {tags?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                        </select>
                                        {errors.tagId && <p className="text-[9px] text-primary-500 font-bold ml-2 uppercase tracking-tighter">{errors.tagId.message}</p>}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full h-14 mt-4 rounded-2xl bg-primary-500 text-white font-black uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-[0_20px_40px_-10px_rgba(255,107,38,0.4)]"
                                >
                                    <span>Proceed to Data</span>
                                    <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                {/* Description Terminal */}
                                <div className="space-y-2 h-[300px]">
                                    <label className="text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <FileText size={10} className="text-primary-500" />
                                        Data Stream
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        className="premium-input w-full h-full bg-[var(--background)]/50 border-[var(--border)] rounded-3xl p-6 font-bold leading-relaxed text-sm resize-none focus:border-primary-500 transition-all outline-none"
                                        placeholder="INITIATING NARRATIVE STREAM..."
                                    />
                                    {errors.description && <p className="text-[9px] text-primary-500 font-bold ml-2 uppercase tracking-tighter">{errors.description.message}</p>}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="h-14 w-16 rounded-2xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background)] transition-all"
                                    >
                                        <ArrowLeft size={20} className="text-[var(--muted-foreground)]" />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending || !isValid}
                                        className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                            <>
                                                <span className="font-black uppercase tracking-widest text-sm">Initialize Masterpiece</span>
                                                <CheckCircle2 size={20} className="group-hover:rotate-12 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </motion.div>
    );
}
