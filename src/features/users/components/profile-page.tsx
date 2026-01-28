import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Camera,
    Lock,
    Sparkles,
    BadgeCheck,
    ChefHat,
    Loader2,
    Zap,
    Activity,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

import { useAuthStore } from "@/stores";
import { ChangePasswordForm } from "./change-password-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "@/components/ui";

export function ProfilePage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (!user) return (
        <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-primary-500" size={60} />
        </div>
    );

    return (
        <div className="space-y-12 pb-24">
            {/* World Class Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[4rem] bg-[var(--sidebar-background)] p-12 md:p-16 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.65_0.3_45/0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_120%,oklch(0.58_0.17_145/0.1)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <BadgeCheck size={220} strokeWidth={0.5} className="text-[var(--foreground)]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-8 flex-1">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="px-5 py-2 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                <Sparkles size={14} className="text-primary-500" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('profile.identity_port')}</span>
                            </div>
                            <div className="px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Activity size={14} className="text-primary-500 animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-primary-400">{t('profile.security_active')}</span>
                            </div>
                            <div className="px-5 py-2 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center gap-2">
                                <ShieldCheck size={14} className="text-green-500" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--muted-foreground)]/40">ELITE_SYSCALL_OK</span>
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
                            Culinary <span className="text-primary-500 italic">{t('profile.core')}</span>
                        </h1>
                        <p className="text-[var(--muted-foreground)] font-bold max-w-2xl tracking-tight text-xl leading-relaxed">
                            {t('profile.description')}
                        </p>
                    </div>

                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative flex flex-col items-center gap-6 bg-[var(--background)]/80 border border-[var(--border)] p-10 rounded-[4rem] backdrop-blur-3xl shadow-2xl">
                            <div className="w-40 h-40 rounded-[3rem] bg-[var(--sidebar-background)] overflow-hidden border-4 border-[var(--border)] shadow-2xl relative group/avatar">
                                {user.imagePath ? (
                                    <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--sidebar-background)]">
                                        <ChefHat className="text-[var(--muted-foreground)]/10" size={60} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary-500/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[var(--foreground)]">{user.userName}</h2>
                                <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em]">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
                {/* Management Column */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="glass-card rounded-[3.5rem] p-10 border border-[var(--border)] shadow-2xl space-y-8 relative overflow-hidden bg-[var(--sidebar-background)]/80 backdrop-blur-3xl">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] flex items-center gap-2">
                                <Zap size={14} className="text-primary-500" />
                                {t('profile.execution_hub')}
                            </h3>
                            <div className="h-px bg-[var(--border)]" />
                        </div>

                        <div className="space-y-4">
                            <button
                                className="w-full premium-button premium-button-primary h-18 text-sm group overflow-hidden relative"
                                onClick={() => { }}
                            >
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <Camera size={20} />
                                <span className="font-black uppercase tracking-widest text-xs">{t('profile.update_asset')}</span>
                            </button>
                            <button
                                className="w-full h-18 rounded-[2rem] font-black uppercase tracking-widest text-[10px] border-2 border-[var(--border)] flex items-center justify-center gap-3 hover:bg-neutral-900 hover:text-white transition-all group shadow-xl"
                                onClick={() => setIsChangePassOpen(true)}
                            >
                                <Lock size={18} className="group-hover:rotate-12 transition-transform" />
                                <span>{t('profile.security_protocol')}</span>
                            </button>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-[var(--sidebar-background)] text-[var(--foreground)] relative overflow-hidden group border border-[var(--border)] shadow-xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.65_0.3_45/0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 space-y-4">
                                <ShieldCheck className="text-primary-500" size={32} />
                                <h4 className="text-xl font-black italic tracking-tighter leading-none">{t('profile.verified')}</h4>
                                <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest leading-relaxed">{t('profile.verified_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Ecosystem */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[4rem] p-12 md:p-16 border border-[var(--border)] shadow-2xl space-y-12 relative overflow-hidden bg-[var(--sidebar-background)]/80 backdrop-blur-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Email */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] ml-2">{t('profile.archive_address')}</label>
                                <span className="font-black text-[var(--foreground)] uppercase tracking-tight text-lg">{user.email}</span>
                            </motion.div>

                            {/* Phone */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] ml-2">{t('profile.comm_freq')}</label>
                                <span className="font-black text-[var(--foreground)] uppercase tracking-tight text-lg">{user.phoneNumber || "UNMAPPED"}</span>
                            </motion.div>

                            {/* Region */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] ml-2">{t('profile.geospatial')}</label>
                                <span className="font-black text-[var(--foreground)] uppercase tracking-tight text-lg">{user.country || "GLOBAL_UNIT"}</span>
                            </motion.div>

                            {/* Status */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] ml-2">{t('profile.auth_level')}</label>
                                <div className="flex items-center gap-5 bg-primary-500/5 dark:bg-primary-500/10 h-20 px-8 rounded-[2rem] border border-primary-500/20 shadow-xl group hover:bg-primary-500/20 transition-all">
                                    <Zap className="text-primary-500 fill-primary-500" size={24} />
                                    <span className="font-black text-primary-500 uppercase tracking-[0.2em] text-sm">ELITE_CONTRIBUTOR</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="pt-10 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--foreground)]">{t('profile.master_identity')}</h4>
                                <p className="text-sm font-bold text-[var(--muted-foreground)] max-w-md">{t('profile.master_desc')}</p>
                            </div>
                            <Button className="premium-button premium-button-primary h-18 px-12 group">
                                <span className="font-black uppercase tracking-widest text-xs">{t('profile.edit_portfolio')}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Elite Change Password Modal */}
            <Dialog open={isChangePassOpen} onOpenChange={setIsChangePassOpen} >
                <DialogContent className="max-w-2xl bg-transparent border-none p-0 overflow-visible shadow-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Security Protocol Refinement</DialogTitle>
                    </DialogHeader>
                    <ChangePasswordForm
                        onSuccess={() => setIsChangePassOpen(false)}
                        onCancel={() => setIsChangePassOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
