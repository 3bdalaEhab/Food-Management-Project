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
    seoTitle?: string;
    seoDescription?: string;
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
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans selection:bg-primary-500/30 py-8 sm:py-12 px-3 sm:px-4">
            {seoTitle && <SEO title={seoTitle} description={seoDescription || ""} />}
            <AuthBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn("relative z-30 w-full", maxWidth)}
            >
                {/* Security Badge - Floating - Responsive */}
                <div className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--background)]/60 backdrop-blur-2xl rounded-full border border-[var(--border)] shadow-xl z-10">
                    <ShieldCheck size={10} className="sm:w-3 sm:h-3 text-primary-500 animate-pulse" />
                    <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--muted-foreground)]">{t('auth.login.security_badge') || "SECURE_CORE"}</span>
                </div>

                <div className="glass-card rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] p-4 sm:p-6 md:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border border-[var(--border)] backdrop-blur-[50px] bg-[var(--sidebar-background)]/70 relative overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]">

                    {/* Header - Responsive */}
                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8 shrink-0">
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform rotate-3"
                            >
                                {headerIcon}
                            </motion.div>
                            <div className="absolute inset-0 bg-primary-500/30 blur-xl -z-10" />
                        </div>

                        <div className="space-y-0.5 sm:space-y-1">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                                {title} <span className="text-primary-500">{suffix}</span>
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-[10px] sm:text-xs font-bold tracking-wide flex items-center gap-1 sm:gap-1.5 justify-center opacity-80">
                                <Sparkles size={10} className="sm:w-3 sm:h-3 text-primary-500" />
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Main Content Area - Scrollable */}
                    <div className="w-full overflow-y-auto flex-1 scrollbar-hide">
                        {children}
                    </div>

                    {/* Footer Controls - Responsive */}
                    <div className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-[var(--border)] flex flex-col items-center gap-3 sm:gap-4 shrink-0">
                        {footerLink && (
                            <Link to={footerLink.to} className="text-[10px] sm:text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium flex items-center gap-1 group">
                                {footerLink.icon && <footerLink.icon size={12} className="sm:w-3.5 sm:h-3.5 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />}
                                {footerLink.text} <span className="text-primary-500 font-bold ms-1">{footerLink.linkText}</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-2 sm:gap-3 bg-[var(--background)]/50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md sm:rounded-lg hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-primary-500 transition-all"
                            >
                                {theme === 'dark' ? <Sun size={12} className="sm:w-3.5 sm:h-3.5" /> : <Moon size={12} className="sm:w-3.5 sm:h-3.5" />}
                            </button>
                            <div className="w-px h-3 sm:h-4 bg-[var(--border)]" />
                            <div className="flex gap-0.5 sm:gap-1">
                                <button
                                    onClick={() => setLanguage('en')}
                                    aria-label="Switch to English"
                                    className={cn(
                                        "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-black uppercase transition-all",
                                        language === 'en' ? "bg-primary-500 text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage('ar')}
                                    aria-label="التحويل للغة العربية"
                                    className={cn(
                                        "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-black uppercase transition-all",
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

