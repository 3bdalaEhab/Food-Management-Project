import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Tag,
    Loader2,
    CheckCircle2,
    X,
    Sparkles
} from "lucide-react";
import * as z from "zod";

import type { CreateCategoryData } from "../types";

const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    initialData?: { name: string };
    onSubmit: (data: CreateCategoryData) => void;
    onCancel: () => void;
    isPending?: boolean;
    title: string;
}

export function CategoryForm({
    initialData,
    onSubmit,
    onCancel,
    isPending,
    title
}: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name || "",
        },
    });

    const onFormSubmit = (data: CategoryFormData) => {
        onSubmit(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-primary-500/10 rounded-full blur-[60px]" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[10px]">
                                <Sparkles size={12} />
                                Category Studio
                            </div>
                            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">
                                Category Name
                            </label>
                            <div className="relative group">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    {...register("name")}
                                    className="premium-input pl-12 h-14"
                                    placeholder="Ex: Main Courses"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-[10px] text-error font-black ml-1 animate-in fade-in slide-in-from-left-2">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="premium-button flex-1 py-4 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary flex-[1.5] py-4"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        <span>Save Category</span>
                                        <CheckCircle2 size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
