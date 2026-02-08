import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    Loader2,
    CheckCircle2,
    X,
    Sparkles,
    FolderTree,
    Database
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
        resolver: zodResolver(categorySchema) as any,
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
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--border)]">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Database size={12} className="text-primary-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)] opacity-60">{t('categories.form_protocol')}</span>
                            </div>
                            <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none italic px-1">{title}</h2>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-11 h-11 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
                        >
                            <X size={18} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit((data) => onSubmit(data as any)) as any} className="space-y-10">
                        <div className="space-y-2">
                            <TacticalInput
                                label={t('categories.category_name_label')}
                                placeholder={t('categories.category_placeholder')}
                                icon={FolderTree}
                                error={errors.name?.message}
                                {...register("name")}
                                maxLength={30}
                                className="selection:bg-primary-500/30"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="h-14 px-10 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] font-black uppercase tracking-widest text-[10px] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
                            >
                                {t('categories.cancel_button')}
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !isValid}
                                className="flex-1 h-14 rounded-xl bg-primary-500 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_10px_20px_-5px_rgba(255,107,38,0.3)] hover:bg-primary-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {isPending ? <Loader2 className="animate-spin" size={16} /> : (
                                    <>
                                        <Sparkles size={16} />
                                        <span>{t('categories.create_category_button')}</span>
                                        <CheckCircle2 size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
