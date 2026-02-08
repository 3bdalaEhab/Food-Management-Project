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
    ChevronRight,
    UserCircle,
    Settings2,
    Palette,
    Globe,
    Moon,
    Sun
} from "lucide-react";

import { useAuthStore, useAppStore } from "@/stores";
import { ChangePasswordForm } from "./change-password-form";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { cn, getImageUrl } from "@/lib/utils";
import { IconBadge } from "@/components/shared/icon-badge";
import { SEO } from "@/components/shared/seo";
import { useCurrentUser } from "../hooks";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";

type Tab = "identity" | "security" | "preferences";

export function ProfilePage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { theme, setTheme, language, setLanguage } = useAppStore();
    const [activeTab, setActiveTab] = useState<Tab>("identity");
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);

    const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
    const displayUser = currentUser || user;

    if (!displayUser || isUserLoading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={40} />
        </div>
    );

    const tabs = [
        { id: "identity" as const, label: t('profile.tabs.identity'), icon: UserCircle },
        { id: "security" as const, label: t('profile.tabs.security'), icon: ShieldCheck },
        { id: "preferences" as const, label: t('profile.tabs.preferences'), icon: Settings2 },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        } as const,
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <div className="space-y-6 pb-12 font-sans selection:bg-primary-500/30 overflow-hidden">
            <SEO title={`${displayUser.userName} | Account Hub`} />

            {/* Elite Compact Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-[2rem] bg-[var(--sidebar-background)] border border-[var(--border)] shadow-lg"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.6_0.28_45/0.1)_0%,transparent_50%)]" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                <Activity size={10} className="text-primary-500 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary-400">{t('profile.security_active')}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase italic">
                                {t('profile.culinary')} <span className="text-primary-500">{t('profile.core')}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold max-w-lg tracking-tight text-sm italic opacity-80 leading-relaxed">
                                {t('profile.description')}
                            </p>
                        </div>
                    </div>

                    {/* Operator Avatar Module - Scaled Down */}
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                        <div className="relative flex items-center gap-4 bg-[var(--background)]/60 border border-[var(--border)] p-4 rounded-[2rem] shadow-lg">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--sidebar-background)] overflow-hidden border border-[var(--border)] shadow-xl">
                                {displayUser.imagePath ? (
                                    <ImageWithFallback src={getImageUrl(displayUser.imagePath)} alt={displayUser.userName} className="w-full h-full" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--sidebar-background)]">
                                        <ChefHat className="text-[var(--muted-foreground)]/20" size={30} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-[var(--foreground)] leading-none mb-1">{displayUser.userName}</h2>
                                <p className="text-[9px] font-black text-primary-500 uppercase tracking-[0.3em] opacity-80">
                                    {'group' in displayUser ? displayUser.group.name : displayUser.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Compact Tab Navigation */}
                <div className="relative z-10 px-6 md:px-10 border-t border-[var(--border)] bg-[var(--background)]/20 backdrop-blur-md">
                    <div className="flex overflow-x-auto no-scrollbar gap-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative py-4 flex items-center gap-2 transition-all group shrink-0",
                                        isActive ? "text-primary-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <Icon size={16} className={cn("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] italic">{tab.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="profile-tab-active"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-t-full"
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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    {activeTab === "identity" && (
                        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Identity Intel Card - Compact */}
                            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-6 md:p-8 border border-[var(--border)] shadow-lg bg-[var(--sidebar-background)]/95 flex flex-col justify-between">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Globe size={10} className="text-primary-500" />
                                            {t('profile.geospatial')}
                                        </label>
                                        <div className="text-lg font-black italic uppercase tracking-tighter text-[var(--foreground)] h-12 flex items-center px-4 bg-[var(--background)]/50 rounded-xl border border-[var(--border)]">
                                            {displayUser.country || t('profile.global_node')}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Zap size={10} className="text-primary-500" />
                                            {t('profile.auth_level')}
                                        </label>
                                        <div className="text-lg font-black italic uppercase tracking-tighter text-primary-500 h-12 flex items-center px-4 bg-primary-500/5 rounded-xl border border-primary-500/20">
                                            {'group' in displayUser ? displayUser.group.name : displayUser.role}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <UserCircle size={10} className="text-primary-500" />
                                            {t('profile.archive_address')}
                                        </label>
                                        <div className="text-lg font-black italic uppercase tracking-tighter text-[var(--foreground)] h-12 flex items-center px-4 bg-[var(--background)]/50 rounded-xl border border-[var(--border)]">
                                            {displayUser.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 mt-6 border-t border-[var(--border)]">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.1em]">{t('profile.master_identity')}</h4>
                                            <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest opacity-60">{t('profile.master_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tactical Status Card - Compact */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary-500 to-primary-600 border border-primary-400 text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white/20_0%,transparent_50%)]" />
                                    <div className="relative z-10 space-y-4">
                                        <BadgeCheck size={32} className="drop-shadow-lg" />
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-black italic uppercase tracking-tighter">{t('profile.verified')}</h4>
                                            <p className="text-[8px] font-black uppercase tracking-widest opacity-80 leading-relaxed max-w-[150px]">{t('profile.verified_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-[var(--sidebar-background)] border border-[var(--border)] text-[var(--foreground)] shadow flex items-center gap-4 relative overflow-hidden group">
                                    <Activity size={24} className="text-primary-500 shrink-0" />
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-black italic uppercase tracking-tighter">{t('profile.operational_status')}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{t('profile.syscall_mapped_ok')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="lg:col-span-12">
                            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-[var(--border)] shadow-lg bg-[var(--sidebar-background)]/95 flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.6_0.28_45/0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <IconBadge
                                    icon={KeyRound}
                                    size="lg"
                                    variant="primary"
                                    className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2 relative z-10"
                                />
                                <div className="space-y-2 relative z-10">
                                    <h3 className="text-2xl font-black text-[var(--foreground)] lowercase">{t('profile.change_password')}</h3>
                                    <p className="text-xs font-medium text-[var(--muted-foreground)] leading-relaxed max-w-sm opacity-70">
                                        {t('profile.change_password_desc')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsChangePassOpen(true)}
                                    className="premium-button premium-button-primary h-12 px-8 text-[10px] group relative z-10"
                                >
                                    <KeyRound size={14} />
                                    <span className="font-bold">{t('profile.change_password')}</span>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "preferences" && (
                        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Theme Control Hub - Compact */}
                            <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-[var(--border)] shadow-lg bg-[var(--sidebar-background)]/95 space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,oklch(0.6_0.28_45/0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/40 transition-colors">
                                            <Palette size={20} className="text-primary-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black italic uppercase tracking-tighter leading-none mb-1">{t('profile.preferences.theme_protocol')}</h4>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-[var(--muted-foreground)] opacity-60">{t('profile.aesthetic_controller')}</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-xl p-1 shadow-inner relative overflow-hidden">
                                        {(['light', 'dark'] as const).map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTheme(t)}
                                                className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 relative z-10",
                                                    theme === t ? "text-white" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                                )}
                                            >
                                                {theme === t && (
                                                    <motion.div
                                                        layoutId="theme-active-bg"
                                                        className="absolute inset-0 bg-primary-500 rounded-lg shadow-[0_0_15px_rgba(255,107,38,0.4)]"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <div className="relative z-20">
                                                    {t === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border-2 border-dashed border-[var(--border)] text-center group-hover:border-primary-500/20 transition-all relative z-10">
                                    <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest leading-relaxed italic">
                                        {t('profile.theme_desc')} <span className="text-primary-500 drop-shadow-[0_0_5px_rgba(255,107,38,0.2)]">{theme.toUpperCase()}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Language Control Hub - Compact */}
                            <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-[var(--border)] shadow-lg bg-[var(--sidebar-background)]/95 space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,oklch(0.6_0.28_45/0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/40 transition-colors">
                                            <Globe size={20} className="text-primary-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black italic uppercase tracking-tighter leading-none mb-1">{t('profile.preferences.lang_protocol')}</h4>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-[var(--muted-foreground)] opacity-60">{t('profile.linguistic_controller')}</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-xl p-1 shadow-inner relative overflow-hidden">
                                        {(['en', 'ar'] as const).map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLanguage(l)}
                                                className={cn(
                                                    "px-4 h-10 font-black uppercase text-[9px] tracking-widest transition-colors duration-300 relative z-10",
                                                    language === l ? "text-white" : "text-[var(--muted-foreground)] hover:text-primary-500"
                                                )}
                                            >
                                                {language === l && (
                                                    <motion.div
                                                        layoutId="lang-active-bg"
                                                        className="absolute inset-0 bg-primary-500 rounded-lg shadow-[0_0_15px_rgba(255,107,38,0.4)]"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span className="relative z-20">{l}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border-2 border-dashed border-[var(--border)] text-center group-hover:border-primary-500/20 transition-all relative z-10">
                                    <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest leading-relaxed italic">
                                        {t('profile.lang_desc')} <span className="text-primary-500 drop-shadow-[0_0_5px_rgba(255,107,38,0.2)]">{language.toUpperCase()}</span>
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
