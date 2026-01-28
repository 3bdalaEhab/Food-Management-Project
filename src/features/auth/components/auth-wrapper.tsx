import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Sparkles,
    Sun,
    Moon,
    ShieldCheck,
    LucideIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { AuthBackground } from "./auth-background";
import { SEO } from "@/components/shared/seo";

interface AuthWrapperProps {
    children: ReactNode;
    title: string;
    suffix?: string;
    subtitle: string;
    headerIcon: ReactNode;
    seoTitle: string;
    seoDescription: string;
    footerLink?: {
        text: string;
        linkText: string;
        to: string;
        icon?: LucideIcon;
    };
    maxWidth?: string;
}

export function AuthWrapper({
    children,
    title,
    suffix,
    subtitle,
    headerIcon,
    seoTitle,
    seoDescription,
    footerLink,
    maxWidth = "max-w-[420px]"
}: AuthWrapperProps) {
    const { t } = useTranslation();
    const { theme, setTheme, language, setLanguage } = useAppStore();

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-primary-500/30">
            <SEO title={seoTitle} description={seoDescription} />
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn("relative z-30 w-full px-4", maxWidth)}
            >
                {/* Security Badge - Floating */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-[var(--background)]/60 backdrop-blur-2xl rounded-full border border-[var(--border)] shadow-xl z-10">
                    <ShieldCheck size={12} className="text-primary-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{t('auth.login.security_badge') || "SECURE_CORE"}</span>
                </div>

                <div className="glass-card rounded-[3rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border border-[var(--border)] backdrop-blur-[50px] bg-[var(--sidebar-background)]/70 relative overflow-hidden flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <div className="flex flex-col items-center text-center space-y-4 mb-8 shrink-0">
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3"
                            >
                                {headerIcon}
                            </motion.div>
                            <div className="absolute inset-0 bg-primary-500/30 blur-xl -z-10" />
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                                {title} <span className="text-primary-500">{suffix}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-xs font-bold tracking-wide flex items-center gap-1.5 justify-center opacity-80">
                                <Sparkles size={12} className="text-primary-500" />
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full">
                        {children}
                    </div>

                    {/* Footer Controls */}
                    <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col items-center gap-4 shrink-0">
                        {footerLink && (
                            <Link to={footerLink.to} className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium flex items-center gap-1 group">
                                {footerLink.icon && <footerLink.icon size={14} className="ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />}
                                {footerLink.text} <span className="text-primary-500 font-bold ms-1">{footerLink.linkText}</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-3 bg-[var(--background)]/50 p-1.5 rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-primary-500 transition-all"
                            >
                                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            </button>
                            <div className="w-px h-4 bg-[var(--border)]" />
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={cn(
                                        "px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all",
                                        language === 'en' ? "bg-primary-500 text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage('ar')}
                                    className={cn(
                                        "px-2 py-1 rounded-md text-[9px] font-black uppercase transition-all",
                                        language === 'ar' ? "bg-primary-500 text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    AR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
