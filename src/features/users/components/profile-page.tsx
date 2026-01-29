import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    KeyRound,
    BadgeCheck,
    ChefHat,
    Loader2,
    Zap,
    Activity,
    ShieldCheck,
    ArrowRight,
    ChevronRight,
    UserCircle,
    Settings2,
    Palette,
    Globe,
    Moon,
    Sun,
    Terminal
} from "lucide-react";

import { useAuthStore, useAppStore } from "@/stores";
import { ChangePasswordForm } from "./change-password-form";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { cn } from "@/lib/utils";
import { IconBadge } from "@/components/shared/icon-badge";
import { SEO } from "@/components/shared/seo";

type Tab = "identity" | "security" | "preferences";

export function ProfilePage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { theme, setTheme, language, setLanguage } = useAppStore();
    const [activeTab, setActiveTab] = useState<Tab>("identity");
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);

    if (!user) return (
        <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-primary-500" size={60} />
        </div>
    );

    const tabs = [
        { id: "identity" as const, label: t('profile.tabs.identity'), icon: UserCircle },
        { id: "security" as const, label: t('profile.tabs.security'), icon: ShieldCheck },
        { id: "preferences" as const, label: t('profile.tabs.preferences'), icon: Settings2 },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="space-y-12 pb-24 font-sans selection:bg-primary-500/30">
            <SEO title={`${user.userName} | Account Hub`} />

            {/* Elite Header Protcol */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-[3.5rem] bg-[var(--sidebar-background)] border border-[var(--border)] shadow-xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.6_0.28_45/0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                    <BadgeCheck size={280} strokeWidth={0.5} className="text-[var(--foreground)]" />
                </div>

                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div className="space-y-8 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Activity size={12} className="text-primary-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-400">{t('profile.security_active')}</span>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-[var(--background)]/50 border border-[var(--border)] flex items-center gap-2">
                                <Terminal size={12} className="text-[var(--muted-foreground)]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">{t('profile.syscall_mapped')}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
                                {t('profile.culinary')} <span className="text-primary-500">{t('profile.core')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold max-w-xl tracking-tight text-lg italic opacity-80">
                                {t('profile.description')}
                            </p>
                        </div>
                    </div>

                    {/* Operator Avatar Module */}
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
                        <div className="relative flex flex-col items-center gap-6 bg-[var(--background)]/60 border border-[var(--border)] p-8 rounded-[3.5rem] shadow-xl">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-[var(--sidebar-background)] overflow-hidden border-2 border-[var(--border)] shadow-2xl">
                                {user.imagePath ? (
                                    <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover object-center" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--sidebar-background)]">
                                        <ChefHat className="text-[var(--muted-foreground)]/20" size={50} />
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none mb-1">{user.userName}</h2>
                                <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] opacity-80">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Tab Navigation */}
                <div className="relative z-10 px-10 md:px-16 border-t border-[var(--border)] bg-[var(--background)]/20 backdrop-blur-md">
                    <div className="flex overflow-x-auto no-scrollbar gap-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative py-8 flex items-center gap-3 transition-all group shrink-0",
                                        isActive ? "text-primary-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <Icon size={18} className={cn("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] italic">{tab.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="profile-tab-active"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-t-full shadow-[0_-4px_12px_rgba(255,107,38,0.5)]"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Dynamic Content Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                    {activeTab === "identity" && (
                        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Identity Intel Card */}
                            <div className="lg:col-span-2 glass-card rounded-[3.5rem] p-10 md:p-14 border border-[var(--border)] shadow-xl space-y-12 bg-[var(--sidebar-background)]/95">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] flex items-center gap-2">
                                            <Globe size={12} className="text-primary-500" />
                                            {t('profile.geospatial')}
                                        </label>
                                        <div className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)] h-16 flex items-center px-6 bg-[var(--background)]/50 rounded-2xl border border-[var(--border)]">
                                            {user.country || t('profile.global_node')}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] flex items-center gap-2">
                                            <Zap size={12} className="text-primary-500" />
                                            {t('profile.auth_level')}
                                        </label>
                                        <div className="text-2xl font-black italic uppercase tracking-tighter text-primary-500 h-16 flex items-center px-6 bg-primary-500/5 rounded-2xl border border-primary-500/20">
                                            {user.role}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                        <label className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.3em] flex items-center gap-2">
                                            <UserCircle size={12} className="text-primary-500" />
                                            {t('profile.archive_address')}
                                        </label>
                                        <div className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)] h-16 flex items-center px-6 bg-[var(--background)]/50 rounded-2xl border border-[var(--border)]">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-10 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em]">{t('profile.master_identity')}</h4>
                                        <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">{t('profile.master_desc')}</p>
                                    </div>
                                    <button className="premium-button premium-button-primary h-16 px-10 group">
                                        <span className="font-black italic uppercase tracking-widest text-[10px]">{t('profile.edit_portfolio')}</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Tactical Status Card */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary-500 to-primary-600 border border-primary-400 text-white shadow-[0_32px_64px_-16px_oklch(0.6_0.28_45/0.4)] relative overflow-hidden group hover:scale-105 transition-all duration-500">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white/20_0%,transparent_50%)]" />
                                    <div className="relative z-10 space-y-6">
                                        <BadgeCheck size={48} className="drop-shadow-lg" />
                                        <div className="space-y-2">
                                            <h4 className="text-2xl font-black italic uppercase tracking-tighter">{t('profile.verified')}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-relaxed">{t('profile.verified_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 rounded-[3rem] bg-[var(--sidebar-background)] border border-[var(--border)] text-[var(--foreground)] shadow-xl relative overflow-hidden group">
                                    <div className="space-y-4">
                                        <Activity size={32} className="text-primary-500" />
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">{t('profile.operational_status')}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('profile.syscall_mapped_ok')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="lg:col-span-12">
                            <div className="glass-card rounded-[3.5rem] p-12 md:p-16 border border-[var(--border)] shadow-xl bg-[var(--sidebar-background)]/95 flex flex-col items-center text-center space-y-10">
                                <IconBadge
                                    icon={KeyRound}
                                    size="xl"
                                    variant="primary"
                                    className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2"
                                />
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-[var(--foreground)]">{t('profile.change_password')}</h3>
                                    <p className="text-sm font-medium text-[var(--muted-foreground)] leading-relaxed">
                                        {t('profile.change_password_desc')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsChangePassOpen(true)}
                                    className="premium-button premium-button-primary h-16 px-12 text-sm group"
                                >
                                    <KeyRound size={20} />
                                    <span className="font-bold">{t('profile.change_password')}</span>
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "preferences" && (
                        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Theme Control Hub */}
                            <div className="glass-card rounded-[3.5rem] p-10 md:p-12 border border-[var(--border)] shadow-xl bg-[var(--sidebar-background)]/95 space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/20">
                                            <Palette size={24} className="text-primary-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none mb-1">{t('profile.preferences.theme_protocol')}</h4>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('profile.aesthetic_controller')}</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-2xl p-1 shadow-lg">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                                theme === 'light' ? "bg-primary-500 text-white shadow-xl" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                            )}
                                        >
                                            <Sun size={20} />
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                                theme === 'dark' ? "bg-primary-500 text-white shadow-xl" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                            )}
                                        >
                                            <Moon size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] border-2 border-dashed border-[var(--border)] text-center space-y-4 group hover:border-primary-500/30 transition-all">
                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest leading-relaxed italic">
                                        {t('profile.theme_desc')} <span className="text-primary-500">{theme.toUpperCase()}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Language Control Hub */}
                            <div className="glass-card rounded-[3.5rem] p-10 md:p-12 border border-[var(--border)] shadow-xl bg-[var(--sidebar-background)]/95 space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/20">
                                            <Globe size={24} className="text-primary-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none mb-1">{t('profile.preferences.lang_protocol')}</h4>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('profile.linguistic_controller')}</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-2xl p-1 shadow-lg overflow-hidden">
                                        <button
                                            onClick={() => setLanguage('en')}
                                            className={cn(
                                                "px-4 h-12 font-black uppercase text-[10px] tracking-widest transition-all",
                                                language === 'en' ? "bg-primary-500 text-white" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                            )}
                                        >
                                            EN_US
                                        </button>
                                        <button
                                            onClick={() => setLanguage('ar')}
                                            className={cn(
                                                "px-4 h-12 font-black uppercase text-[10px] tracking-widest transition-all",
                                                language === 'ar' ? "bg-primary-500 text-white" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                            )}
                                        >
                                            AR_ME
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] border-2 border-dashed border-[var(--border)] text-center space-y-4 group hover:border-primary-500/30 transition-all">
                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest leading-relaxed italic">
                                        {t('profile.lang_desc')} <span className="text-primary-500">{language.toUpperCase()}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Change Password Modal Integration */}
            <CustomDialog open={isChangePassOpen} onOpenChange={setIsChangePassOpen} maxWidth="xl">
                <ChangePasswordForm
                    onSuccess={() => setIsChangePassOpen(false)}
                    onCancel={() => setIsChangePassOpen(false)}
                />
            </CustomDialog>
        </div>
    );
}
