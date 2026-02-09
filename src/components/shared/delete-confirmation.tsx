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
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-[var(--sidebar-background)]/95 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden tactical-border shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
            >
                <div className="relative p-10 md:p-14">
                    {/* Status Light: Elite Pulse */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-b-full shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse" />

                    {/* Abort Action */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-11 h-11 rounded-2xl bg-[var(--background)]/60 border border-white/5 flex items-center justify-center text-[var(--muted-foreground)] hover:text-red-500 hover:border-red-500/50 hover:scale-110 active:scale-95 transition-all shadow-2xl z-10 backdrop-blur-md"
                        aria-label={t('common.close')}
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
                            <div className="relative w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center border border-red-500/30 shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
                                <ShieldAlert className="w-12 h-12 text-red-500" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
                                {t('delete_confirmation.title')}
                            </h2>
                            <div className="flex items-center gap-3 justify-center opacity-70">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-500" />
                                <Zap size={14} className="text-red-500 animate-bounce" />
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500/80">Protocol_Breach</p>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-500" />
                            </div>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-red-500/[0.07] to-transparent border border-red-500/20 space-y-5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-red-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700" />
                            <p className="relative z-10 text-base font-bold text-[var(--foreground)] leading-relaxed italic opacity-90">
                                {t('delete_confirmation.message')}
                            </p>
                            {itemName && (
                                <div className="relative z-10 px-8 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white text-[12px] font-black uppercase tracking-[0.2em] inline-block shadow-2xl shadow-red-500/40 transform -rotate-1 hover:rotate-0 transition-transform">
                                    {itemName}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-6 w-full pt-6">
                            <button
                                onClick={onClose}
                                className="h-20 rounded-[2rem] border border-white/10 bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] text-[var(--muted-foreground)] hover:text-white hover:bg-white/10 transition-all shadow-2xl active:scale-95"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="h-20 rounded-[2rem] bg-gradient-to-br from-red-500 to-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:from-red-600 hover:to-red-700 transition-all shadow-[0_25px_50px_rgba(239,68,68,0.4)] group relative overflow-hidden active:scale-95"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isDeleting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        <Trash2 size={22} className="group-hover:rotate-12 transition-transform" />
                                        <span>{t('common.delete')}</span>
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
