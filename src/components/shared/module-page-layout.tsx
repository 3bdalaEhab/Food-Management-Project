import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    LayoutGrid,
    List,
    Sparkles,
    Zap,
    ArrowRight,
    LucideIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { TacticalInput } from "@/components/shared/tactical-input";
import { SEO } from "@/components/shared/seo";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

interface ModulePageLayoutProps {
    title: string;
    description: string;
    titlePrefix?: string;
    titleSuffix?: string;
    subtitle?: string;
    badgeLabel?: string;
    HeaderIcon: LucideIcon;
    primaryAction?: {
        label: string;
        onClick: () => void;
        icon?: LucideIcon;
    };
    secondaryNode?: ReactNode;
    toolbarNode?: ReactNode; // New prop for custom toolbar content
    searchQuery: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    viewMode?: "grid" | "list";
    onViewModeChange?: (mode: "grid" | "list") => void;
    isLoading: boolean;
    isEmpty: boolean;
    emptyState?: ReactNode;
    children: ReactNode;
    seoTitle?: string;
}

export function ModulePageLayout({
    title,
    description,
    titlePrefix,
    titleSuffix,
    subtitle,
    badgeLabel,
    HeaderIcon,
    primaryAction,
    secondaryNode,
    toolbarNode,
    searchQuery,
    onSearchChange,
    searchPlaceholder,
    viewMode = "grid",
    onViewModeChange,
    isLoading,
    isEmpty,
    emptyState,
    children,
    seoTitle
}: ModulePageLayoutProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-12 pb-24">
            <SEO
                title={seoTitle || title}
                description={description}
            />

            {/* Elite Tactical Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[var(--sidebar-background)] p-6 md:p-8 lg:p-10 text-[var(--foreground)] border border-[var(--border)] shadow-2xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,107,38,0.15)_0%,transparent_50%)]" />
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                    <HeaderIcon size={280} strokeWidth={0.5} className="text-[var(--foreground)]" />
                </div>

                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            {subtitle && (
                                <div className="px-4 py-1.5 rounded-full bg-[var(--background)]/60 border border-[var(--border)] flex items-center gap-2">
                                    <Sparkles size={12} className="text-primary-500 shadow-[0_0_10px_rgba(255,107,38,0.3)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{subtitle}</span>
                                </div>
                            )}
                            {badgeLabel && (
                                <div className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center gap-2">
                                    <Zap size={12} className="text-primary-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">{badgeLabel}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase italic px-1">
                                {titlePrefix && <span>{titlePrefix} </span>}
                                {titleSuffix ? (
                                    <span className="text-primary-500 italic block md:inline-block">{titleSuffix}</span>
                                ) : (
                                    <span className="text-primary-500">{title}</span>
                                )}
                            </h1>
                            <p className="text-[var(--muted-foreground)] font-bold tracking-tight text-lg opacity-80 max-w-xl">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 shrink-0">
                        {secondaryNode}

                        {primaryAction && (
                            <motion.button
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={primaryAction.onClick}
                                className="premium-button premium-button-primary h-14 md:h-16 px-6 md:px-10 group shadow-[0_20px_40px_-15px_rgba(255,107,38,0.3)] w-full sm:w-auto"
                            >
                                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                                    {primaryAction.icon ? <primaryAction.icon size={20} /> : <Plus size={20} />}
                                </div>
                                <span className="font-black uppercase tracking-[0.2em] text-sm">{primaryAction.label}</span>
                                <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Unified Tactical Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center p-4 md:p-6 bg-[var(--sidebar-background)]/40 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-[var(--border)] shadow-xl">
                <div className="flex-1 w-full relative">
                    <TacticalInput
                        placeholder={searchPlaceholder || t('common.search')}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        icon={Search}
                        className="h-14 lg:h-16"
                    />
                </div>

                {toolbarNode && (
                    <div className="flex gap-4 w-full lg:w-auto">
                        {toolbarNode}
                    </div>
                )}

                <div className="flex gap-4 w-full lg:w-auto shrink-0">
                    {onViewModeChange && (
                        <div className="h-14 lg:h-16 bg-[var(--background)]/80 border border-[var(--border)] p-1.5 rounded-[1.5rem] flex shadow-sm">
                            <button
                                onClick={() => onViewModeChange("grid")}
                                className={cn(
                                    "w-12 rounded-xl flex items-center justify-center transition-all",
                                    viewMode === 'grid' ? 'bg-primary-500 text-white shadow-lg' : 'text-[var(--muted-foreground)] hover:text-primary-500'
                                )}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => onViewModeChange("list")}
                                className={cn(
                                    "w-12 rounded-xl flex items-center justify-center transition-all",
                                    viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg' : 'text-[var(--muted-foreground)] hover:text-primary-500'
                                )}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    )}

                    <div className="h-14 lg:h-16 px-4 bg-[var(--background)]/80 border border-[var(--border)] rounded-[1.5rem] flex items-center justify-center text-primary-500/40">
                        <Sparkles size={16} />
                    </div>
                </div>
            </div>

            {/* Professional Content Layer */}
            {isLoading ? (
                <div className={cn(
                    "grid gap-8",
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "grid-cols-1"
                )}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="glass-card rounded-[2.5rem] p-10 h-56 animate-pulse bg-[var(--sidebar-background)]/60 border border-[var(--border)]" />
                    ))}
                </div>
            ) : isEmpty ? (
                emptyState
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={cn(
                        "grid gap-6 md:gap-8 lg:gap-10",
                        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "grid-cols-1"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {children}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
