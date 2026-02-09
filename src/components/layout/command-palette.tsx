import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Search,
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    Users,
    UserCircle,
    Zap,
    ArrowRight,
    Sparkles
} from "lucide-react";

import { useAuthStore, selectIsAdmin } from "@/stores";
import { useRecipes } from "@/features/recipes/hooks";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Plus, Heart } from "lucide-react";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface CommandItemProps {
    icon: React.ElementType;
    label: string;
    description: string;
    category: string;
    shortcut?: string;
    onSelect: () => void;
    active: boolean;
}

const CommandItem = memo(({
    icon: Icon,
    label,
    description,
    category,
    shortcut,
    onSelect,
    active
}: CommandItemProps) => (
    <motion.button
        layout
        onClick={onSelect}
        className={cn(
            "w-full p-5 rounded-3xl flex items-center gap-6 transition-all relative overflow-hidden group text-left",
            active ? "bg-primary-500 text-white shadow-[0_20px_40px_rgba(255,107,38,0.2)]" : "hover:bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        )}
    >
        <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl",
            active ? "bg-white/20" : "bg-[var(--background)] group-hover:bg-[var(--sidebar-background)] border border-[var(--border)]"
        )}>
            <Icon size={20} className={cn(active ? "text-white" : "text-primary-500")} />
        </div>

        <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{category}</span>
                {shortcut && <span className="text-[9px] font-black opacity-30 tracking-widest">{shortcut}</span>}
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest leading-none">{label}</h4>
            <p className={cn("text-[10px] font-bold tracking-tight opacity-50", active ? "text-white" : "text-neutral-500")}>{description}</p>
        </div>

        <ArrowRight
            size={18}
            className={cn(
                "transition-all",
                active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:translate-x-0"
            )}
        />
    </motion.button>
));

CommandItem.displayName = "CommandItem";

export function CommandPalette() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const debouncedSearch = useDebounce(search, 300);
    const navigate = useNavigate();
    const isAdmin = useAuthStore(selectIsAdmin);

    const { data: recipesData } = useRecipes({
        name: debouncedSearch
    });

    interface NavItem {
        icon: React.ElementType;
        label: string;
        description: string;
        category: string;
        path: string;
        keywords: string;
        isAdmin?: boolean;
    }

    const navigationItems: NavItem[] = [
        {
            icon: LayoutDashboard,
            label: t('command_palette.mission_center'),
            description: t('dashboard.description'),
            category: "NAVIGATION",
            path: "/dashboard",
            keywords: "dashboard, home, main, stats"
        },
        {
            icon: UtensilsCrossed,
            label: t('command_palette.recipe_vault'),
            description: t('recipes.description'),
            category: "NAVIGATION",
            path: "/dashboard/recipes",
            keywords: "recipes, food, meals"
        },
        {
            icon: FolderOpen,
            label: t('command_palette.taxonomy_hub'),
            description: t('categories.description'),
            category: "NAVIGATION",
            path: "/dashboard/categories",
            keywords: "categories, tags"
        },
        {
            icon: Users,
            label: t('command_palette.agent_fleet'),
            description: t('users.fleet_desc'),
            category: "SYSTEM",
            path: "/dashboard/users",
            isAdmin: true,
            keywords: "users, employees, staff"
        },
        {
            icon: UserCircle,
            label: t('command_palette.identity_port'),
            description: t('profile.description'),
            category: "ACCOUNT",
            path: "/dashboard/profile",
            keywords: "profile, settings, account, password"
        }
    ].filter((item: NavItem) => !item.isAdmin || isAdmin);

    const quickActions: NavItem[] = [
        {
            icon: Plus,
            label: t('command_palette.initiate_protocol'),
            description: t('recipes.new_recipe'),
            category: "ACTION",
            path: "/dashboard/recipes/new",
            keywords: "create, add, new, recipe"
        },
        {
            icon: Heart,
            label: t('command_palette.curated_vault'),
            description: t('favorites.description'),
            category: "ACTION",
            path: "/dashboard/favorites",
            keywords: "favorites, likes, heart"
        }
    ].filter((item: NavItem) => !item.isAdmin || isAdmin);

    const recipeResults = (recipesData?.data || []).slice(0, 5).map((recipe) => ({
        icon: UtensilsCrossed,
        label: recipe.name,
        description: `SYSC_UID_${recipe.id} | ${recipe.price} EGP`,
        category: "RECIPE",
        path: `/dashboard/recipes?id=${recipe.id}`, // Navigate to recipes page with filter or details
        keywords: recipe.name + " " + recipe.description
    }));

    const allItems = [...navigationItems, ...quickActions, ...recipeResults];

    const filteredItems = allItems.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.keywords.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(open => !open);
            }
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setSearch("");
            setActiveIndex(0);
        }
    }, [open]);

    const handleSelect = useCallback((path: string) => {
        navigate(path);
        setOpen(false);
    }, [navigate]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter" && filteredItems[activeIndex]) {
            handleSelect(filteredItems[activeIndex].path);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 md:px-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl glass-card rounded-[3.5rem] bg-[var(--sidebar-background)] border border-[var(--border)] shadow-2xl overflow-hidden"
                    >
                        {/* Search Input Section */}
                        <div className="p-8 border-b border-[var(--border)] space-y-6">
                            <div className="flex items-center justify-between opacity-40">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={14} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('command_palette.system_terminal')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <kbd className="px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[9px] font-black">ESC</kbd>
                                    <span className="text-[9px] font-black">{t('command_palette.abort')}</span>
                                </div>
                            </div>

                            <div className="relative group">
                                <Search className="absolute start-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary-500 transition-colors" size={24} />
                                <input
                                    autoFocus
                                    placeholder={t('command_palette.type_parameters')}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setActiveIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-[2rem] h-20 pl-16 pr-8 text-xl font-black uppercase tracking-widest focus:outline-none focus:border-primary-500/50 focus:bg-[var(--background)]/80 transition-all text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/30"
                                />
                            </div>
                        </div>

                        {/* Results Ecosystem */}
                        <div className="max-h-[50vh] overflow-y-auto p-6 space-y-2 custom-scrollbar">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <CommandItem
                                        key={item.path}
                                        {...item}
                                        active={index === activeIndex}
                                        onSelect={() => handleSelect(item.path)}
                                    />
                                ))
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-[var(--background)] flex items-center justify-center border border-[var(--border)]">
                                        <Zap size={32} className="text-[var(--muted-foreground)]/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-white italic">{t('command_palette.no_results')}</h3>
                                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{t('command_palette.no_results_desc')}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Action Rail */}
                        <div className="p-6 bg-[var(--background)] border-t border-[var(--border)] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                                    {t('command_palette.terminal_online')}
                                </div>
                                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                    <kbd className="px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[9px] font-black text-[var(--foreground)]">↑↓</kbd>
                                    <span className="text-[9px] font-black">{t('command_palette.navigate')}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                    <kbd className="px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[9px] font-black text-[var(--foreground)]">ENTER</kbd>
                                    <span className="text-[9px] font-black">{t('command_palette.execute')}</span>
                                </div>
                            </div>
                            <Sparkles size={14} className="text-primary-500/30" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
