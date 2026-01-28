import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Mail,
    Phone,
    Globe,
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
import { cn } from "@/lib/utils";

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
                className="relative overflow-hidden rounded-[4rem] bg-neutral-950 p-12 md:p-16 text-white border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.65_0.3_45/0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_120%,oklch(0.58_0.17_145/0.1)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <BadgeCheck size={220} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                <Sparkles size={14} className="text-primary-500" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{t('profile.identity_port')}</span>
                            </div>
                            <div className="px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Activity size={14} className="text-primary-500 animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-primary-400">{t('profile.security_active')}</span>
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none uppercase italic">
                            Culinary <span className="text-primary-500 italic">{t('profile.core')}</span>
                        </h1>
                        <p className="text-white/40 font-bold max-w-2xl tracking-tight text-xl">
                            {t('profile.description')}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6 bg-white/5 border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-neutral-900 overflow-hidden border-4 border-white/20 shadow-2xl relative group">
                            {user.imagePath ? (
                                <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                            ) : (
                                <ChefHat className="text-white/20" size={48} />
                            )}
                            <div className="absolute inset-0 bg-primary-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">{user.userName}</h2>
                            <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">{user.role}</p>
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
                    <div className="glass-card rounded-[3.5rem] p-10 border border-white/20 dark:border-white/5 shadow-2xl space-y-8 relative overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-3xl">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-2">
                                <Zap size={14} className="text-primary-500" />
                                {t('profile.execution_hub')}
                            </h3>
                            <div className="h-px bg-neutral-200 dark:bg-white/10" />
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
                                className="w-full h-18 rounded-[2rem] font-black uppercase tracking-widest text-[10px] border-2 border-neutral-200 dark:border-white/10 flex items-center justify-center gap-3 hover:bg-neutral-900 hover:text-white transition-all group shadow-xl"
                                onClick={() => setIsChangePassOpen(true)}
                            >
                                <Lock size={18} className="group-hover:rotate-12 transition-transform" />
                                <span>{t('profile.security_protocol')}</span>
                            </button>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-neutral-950 text-white relative overflow-hidden group border border-white/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.65_0.3_45/0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 space-y-4">
                                <ShieldCheck className="text-primary-500" size={32} />
                                <h4 className="text-xl font-black italic tracking-tighter leading-none">{t('profile.verified')}</h4>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">{t('profile.verified_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Ecosystem */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[4rem] p-12 md:p-16 border border-white/20 dark:border-white/5 shadow-2xl space-y-12 relative overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Email */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">{t('profile.archive_address')}</label>
                                <div className="flex items-center gap-5 bg-white/50 dark:bg-white/5 h-20 px-8 rounded-[2rem] border border-neutral-100 dark:border-white/10 shadow-xl group hover:border-primary-500 transition-all">
                                    <Mail className="text-primary-500" size={24} />
                                    <span className="font-black text-neutral-900 dark:text-white uppercase tracking-tight text-lg">{user.email}</span>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">{t('profile.comm_freq')}</label>
                                <div className="flex items-center gap-5 bg-white/50 dark:bg-white/5 h-20 px-8 rounded-[2rem] border border-neutral-100 dark:border-white/10 shadow-xl group hover:border-primary-500 transition-all">
                                    <Phone className="text-primary-500" size={24} />
                                    <span className="font-black text-neutral-900 dark:text-white uppercase tracking-tight text-lg">{user.phoneNumber || "UNMAPPED"}</span>
                                </div>
                            </motion.div>

                            {/* Region */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">{t('profile.geospatial')}</label>
                                <div className="flex items-center gap-5 bg-white/50 dark:bg-white/5 h-20 px-8 rounded-[2rem] border border-neutral-100 dark:border-white/10 shadow-xl group hover:border-primary-500 transition-all">
                                    <Globe className="text-primary-500" size={24} />
                                    <span className="font-black text-neutral-900 dark:text-white uppercase tracking-tight text-lg">{user.country || "GLOBAL_UNIT"}</span>
                                </div>
                            </motion.div>

                            {/* Status */}
                            <motion.div variants={itemVariant} className="space-y-3">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] ml-2">{t('profile.auth_level')}</label>
                                <div className="flex items-center gap-5 bg-primary-500/5 dark:bg-primary-500/10 h-20 px-8 rounded-[2rem] border border-primary-500/20 shadow-xl group hover:bg-primary-500/20 transition-all">
                                    <Zap className="text-primary-500 fill-primary-500" size={24} />
                                    <span className="font-black text-primary-500 uppercase tracking-[0.2em] text-sm">ELITE_CONTRIBUTOR</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="pt-10 border-t border-neutral-100 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-900 dark:text-white">{t('profile.master_identity')}</h4>
                                <p className="text-sm font-bold text-neutral-400 max-w-md">{t('profile.master_desc')}</p>
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
