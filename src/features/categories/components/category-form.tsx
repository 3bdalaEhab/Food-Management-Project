import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Tag,
    Loader2,
    CheckCircle2,
    X,
    Sparkles,
    Zap
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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="glass-card rounded-[4rem] p-10 md:p-14 border border-[var(--border)] shadow-xl overflow-hidden relative bg-[var(--sidebar-background)]">
                {/* Tactical Polish */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12 border-b border-[var(--border)] pb-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                    <Sparkles size={10} className="text-primary-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Elite Node</span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                    <Zap size={10} className="text-primary-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary-400">Tactical Hub</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none italic">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-14 h-14 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-white hover:bg-primary-500 hover:border-primary-500 transition-all shadow-xl group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <Zap size={14} className="text-primary-500" />
                                Taxonomy Identity
                            </label>
                            <div className="group relative">
                                <Tag className="absolute start-6 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/50 group-focus-within:text-primary-500 transition-colors" size={20} />
                                <input
                                    {...register("name")}
                                    className="premium-input bg-white/50 dark:bg-white/5 border-[var(--border)] h-20 pl-16 font-black uppercase tracking-tight text-xl"
                                    placeholder="INITIATING_CORE_NAME"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-[10px] text-primary-500 font-black ml-2 uppercase tracking-tighter animate-pulse">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-6 pt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="h-18 px-10 rounded-[2rem] bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] font-black uppercase tracking-widest text-xs hover:text-[var(--foreground)] hover:bg-[var(--background)]/80 transition-all shadow-xl"
                            >
                                ABORT
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="premium-button premium-button-primary flex-1 h-18 text-lg font-black uppercase tracking-[0.2em] relative overflow-hidden group shadow-2xl shadow-primary-500/20"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : (
                                    <div className="flex items-center gap-4">
                                        <span>Sync Protocol</span>
                                        <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
