import { motion } from "framer-motion";
import { Trash2, X, ShieldAlert, Zap, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CustomDialog } from "./custom-dialog";

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    isDeleting?: boolean;
}

export function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    isDeleting
}: DeleteConfirmationProps) {
    const { t } = useTranslation();

    return (
        <CustomDialog open={isOpen} onOpenChange={onClose} maxWidth="xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full overflow-hidden rounded-[3rem] border border-[var(--border)] bg-[var(--sidebar-background)] shadow-xl"
            >
                <div className="relative p-10 md:p-14">
                    {/* Status Light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-500 rounded-b-full shadow-[0_0_20px_rgba(239,68,68,0.5)]" />

                    {/* Abort Action */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-red-500 hover:border-red-500/50 transition-all shadow-lg z-10"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
                            <div className="relative w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center border border-red-500/30 shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
                                <ShieldAlert className="w-12 h-12 text-red-500" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none">
                                {t('delete_confirmation.title')}
                            </h2>
                            <div className="flex items-center gap-2 justify-center">
                                <Zap size={14} className="text-red-500" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted-foreground)]">System_Critical_Destruction</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10 space-y-4">
                            <p className="text-sm font-bold text-[var(--foreground)] leading-relaxed italic">
                                {t('delete_confirmation.message')}
                            </p>
                            {itemName && (
                                <div className="px-5 py-2 rounded-xl bg-red-500 text-white text-[11px] font-black uppercase tracking-widest inline-block shadow-lg">
                                    {itemName}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full pt-4">
                            <button
                                onClick={onClose}
                                className="h-16 rounded-[1.5rem] border border-[var(--border)] font-black uppercase tracking-widest text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-all shadow-xl"
                            >
                                {t('delete_confirmation.cancel')}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="h-16 rounded-[1.5rem] bg-red-500 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-[0_20px_40px_rgba(239,68,68,0.3)] group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isDeleting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        <Trash2 size={18} />
                                        <span>{t('delete_confirmation.confirm')}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </CustomDialog>
    );
}
