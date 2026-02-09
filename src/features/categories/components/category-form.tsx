import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Loader2,
    CheckCircle2,
    X,
    Sparkles,
    FolderTree
} from "lucide-react";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { TacticalInput } from "@/components/shared/tactical-input";
import type { CreateCategoryData } from "../types";

const categorySchema = z.object({
    name: z.string().min(3, "IDENTITY_NODE_TOO_SHORT"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    initialData?: { name: string };
    onSubmit: (data: CreateCategoryData) => void;
    onCancel: () => void;
    isPending?: boolean;
    title: string;
}

/**
 * CategoryForm - Professional Category Management
 * Fully compatible with Light and Dark modes using theme variables.
 */
export function CategoryForm({
    initialData,
    onSubmit,
    onCancel,
    isPending,
    title
}: CategoryFormProps) {
    const { t } = useTranslation();
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
            className="w-full max-w-xl mx-auto"
        >
            <div className="bg-[var(--sidebar-background)] rounded-[2rem] p-8 md:p-10 border border-[var(--border)] shadow-2xl overflow-hidden relative">
                {/* Professional Accents */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 opacity-[0.03] pointer-events-none">
                    <FolderTree size={200} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-primary-500/20">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500 animate-[pulse_1s_infinite]" />
                                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-primary-500/60 italic">{t('categories.form_protocol')}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-[0.85] italic px-1 drop-shadow-2xl">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--background)]/60 backdrop-blur-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-white hover:bg-red-500 hover:border-red-500 transition-all duration-500 group overflow-hidden"
                        >
                            <X size={22} className="group-hover:rotate-90 transition-transform duration-500 relative z-10" />
                            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-12">
                        <div className="space-y-4 group">
                            <div className="flex items-center justify-between px-2">
                                <span className="text-[8px] font-black text-primary-500/40 uppercase tracking-[0.3em]">{t('categories.input_indicator')}</span>
                                <FolderTree size={12} className="text-primary-500/20 group-hover:text-primary-500 transition-colors" />
                            </div>
                            <TacticalInput
                                label={t('categories.category_name_label')}
                                placeholder={t('categories.category_placeholder')}
                                icon={FolderTree}
                                error={errors.name?.message}
                                {...register("name")}
                                maxLength={30}
                                className="selection:bg-primary-500/30 text-lg md:text-xl font-black italic tracking-tighter"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="h-16 px-10 rounded-2xl bg-[var(--background)]/40 border border-[var(--border)] text-[var(--muted-foreground)] font-black uppercase tracking-[0.3em] text-[11px] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500 italic"
                            >
                                {t('categories.cancel_button')}
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="flex-1 h-16 rounded-2xl bg-primary-500 text-white font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_20px_40px_-10px_rgba(255,107,38,0.4)] hover:bg-primary-600 transition-all duration-500 disabled:opacity-30 flex items-center justify-center gap-4 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10 flex items-center gap-4">
                                    {isPending ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>{t('common.saving')}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                            <span>{t('categories.create_category_button')}</span>
                                            <CheckCircle2 size={20} className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
