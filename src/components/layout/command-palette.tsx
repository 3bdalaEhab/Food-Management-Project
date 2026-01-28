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
import { cn } from "@/lib/utils";

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
            active ? "bg-primary-500 text-white shadow-[0_20px_40px_rgba(255,107,38,0.2)]" : "hover:bg-white/5 text-neutral-400 hover:text-white"
        )}
    >
        <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl",
            active ? "bg-white/20" : "bg-neutral-900 group-hover:bg-white/10"
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
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const isAdmin = useAuthStore(selectIsAdmin);

    const navigationItems = [
        {
            icon: LayoutDashboard,
            label: "Mission Center",
            description: "OVERVIEW OF SYSTEM METRICS",
            category: "NAVIGATION",
            path: "/dashboard",
            keywords: "dashboard, home, main, stats"
        },
        {
            icon: UtensilsCrossed,
            label: "Recipe Vault",
            description: "CULINARY PROTOCOL MANAGEMENT",
            category: "NAVIGATION",
            path: "/dashboard/recipes",
            keywords: "recipes, food, meals"
        },
        {
            icon: FolderOpen,
            label: "Taxonomy Hub",
            description: "CATEGORY ARCHIVE & REFINEMENT",
            category: "NAVIGATION",
            path: "/dashboard/categories",
            keywords: "categories, tags"
        },
        {
            icon: Users,
            label: "Agent Fleet",
            description: "COLLABORATOR ACCESS CONTROL",
            category: "SYSTEM",
            path: "/dashboard/users",
            isAdmin: true,
            keywords: "users, employees, staff"
        },
        {
            icon: UserCircle,
            label: "Identity Port",
            description: "MANAGE SECURITY & PROFILE",
            category: "ACCOUNT",
            path: "/dashboard/profile",
            keywords: "profile, settings, account, password"
        }
    ].filter(item => !item.isAdmin || isAdmin);

    const filteredItems = navigationItems.filter(item =>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl glass-card rounded-[3.5rem] bg-[#0c0c0c]/90 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {/* Search Input Section */}
                        <div className="p-8 border-b border-white/5 space-y-6">
                            <div className="flex items-center justify-between opacity-40">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={14} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Command Terminal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <kbd className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black">ESC</kbd>
                                    <span className="text-[9px] font-black">TO ABORT</span>
                                </div>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary-500 transition-colors" size={24} />
                                <input
                                    autoFocus
                                    placeholder="TYPE MISSION PARAMETERS..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setActiveIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-white/5 border border-white/5 rounded-[2rem] h-20 pl-16 pr-8 text-xl font-black uppercase tracking-widest focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all text-white placeholder:text-neutral-700"
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
                                    <div className="w-20 h-20 rounded-[2rem] bg-neutral-900 flex items-center justify-center border border-white/5">
                                        <Zap size={32} className="text-neutral-700" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-white italic">Zero Results Found</h3>
                                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">NO MATCHING MISSION PROTOCOLS DETECTED</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Action Rail */}
                        <div className="p-6 bg-neutral-900/50 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                                    Terminal Online
                                </div>
                                <div className="flex items-center gap-3">
                                    <kbd className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black">↑↓</kbd>
                                    <span className="text-[9px] font-black text-neutral-600">NAVIGATE</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <kbd className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black">ENTER</kbd>
                                    <span className="text-[9px] font-black text-neutral-600">EXECUTE</span>
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
