import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Search, X, Check, ChevronDown } from "lucide-react";

export interface TacticalMultiSelectProps {
    options: { id: number; name: string }[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
    label?: string;
    placeholder?: string;
    icon?: LucideIcon;
    error?: string;
    className?: string;
}

export function TacticalMultiSelect({
    options,
    selectedIds,
    onChange,
    label,
    placeholder = "Search...",
    icon: Icon,
    error,
    className
}: TacticalMultiSelectProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOptions = options.filter(opt => selectedIds.includes(opt.id));

    const toggleOption = (id: number) => {
        const newIds = selectedIds.includes(id)
            ? selectedIds.filter(i => i !== id)
            : [...selectedIds, id];
        onChange(newIds);
    };

    // Close when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("w-full space-y-3 group", className)} ref={containerRef}>
            {label && (
                <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] group-focus-within:text-primary-500 transition-colors duration-300">
                        {label}
                    </label>
                    <span className="text-[8px] font-bold text-[var(--muted-foreground)] opacity-40 uppercase">
                        {selectedIds.length} Selected
                    </span>
                </div>
            )}

            <div className="relative group/input">
                {/* Tactical Glow Effect */}
                <AnimatePresence>
                    {(isFocused || isOpen) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="absolute -inset-[2px] bg-gradient-to-r from-primary-500/20 via-primary-500/5 to-primary-500/20 rounded-[1.3rem] lg:rounded-[1.6rem] blur-md z-0 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                <div
                    className={cn(
                        "relative z-10 flex flex-col bg-[var(--background)]/60 backdrop-blur-md transition-all duration-300 overflow-hidden min-h-[4rem] lg:min-h-[4.5rem] rounded-[1.3rem] lg:rounded-[2rem]",
                        (isFocused || isOpen)
                            ? "ring-2 ring-primary-500/40 shadow-[0_4px_24px_rgba(255,107,38,0.15)]"
                            : "ring-1 ring-[var(--border)] hover:ring-[var(--muted-foreground)]/30",
                        error && "ring-2 ring-red-500/50"
                    )}
                    onClick={() => {
                        setIsOpen(true);
                        setIsFocused(true);
                    }}
                >
                    <div className="flex items-center min-h-[4rem] lg:min-h-[4.5rem] px-4">
                        {/* Icon Slot */}
                        {Icon && (
                            <div className={cn(
                                "flex items-center justify-center shrink-0 transition-colors duration-300 w-12 lg:w-16 px-4",
                                (isFocused || isOpen) ? "text-primary-500" : "text-[var(--muted-foreground)]/40"
                            )}>
                                <Icon size={20} className={cn((isFocused || isOpen) && "animate-pulse")} />
                            </div>
                        )}

                        <div className="flex-1 flex flex-wrap gap-2 py-3 px-2">
                            {selectedOptions.length > 0 ? (
                                selectedOptions.map(opt => (
                                    <motion.span
                                        layout
                                        key={opt.id}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary-500/20"
                                    >
                                        {opt.name}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleOption(opt.id);
                                            }}
                                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                        >
                                            <X size={10} />
                                        </button>
                                    </motion.span>
                                ))
                            ) : (
                                !isOpen && !search && <span className="text-[var(--muted-foreground)]/40 font-bold text-sm lg:text-base">{placeholder}</span>
                            )}
                            {(isOpen || selectedOptions.length === 0) && (
                                <input
                                    type="text"
                                    className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm lg:text-base font-bold text-[var(--foreground)] min-w-[120px] placeholder:text-[var(--muted-foreground)]/30"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={selectedOptions.length > 0 ? "" : placeholder}
                                    onFocus={() => setIsOpen(true)}
                                />
                            )}
                        </div>

                        <div className="px-5 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                            <ChevronDown size={16} className="text-[var(--muted-foreground)]/40" />
                        </div>
                    </div>

                    {/* Status Indicator Bar */}
                    <div className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-primary-500 transition-all duration-500 ease-out z-20 rounded-full",
                        (isFocused || isOpen) ? "w-full opacity-100" : "w-0 opacity-0"
                    )} />
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 right-0 z-50 mt-2 bg-[var(--sidebar-background)]/95 backdrop-blur-xl tactical-border rounded-[1.5rem] lg:rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden max-h-[300px] flex flex-col"
                        >
                            <div className="p-2 border-b border-[var(--border)] flex items-center gap-3 px-6 bg-primary-500/5">
                                <Search size={14} className="text-primary-500/60" />
                                <input
                                    autoFocus
                                    className="w-full bg-transparent border-none focus:ring-0 py-4 text-xs font-black uppercase tracking-widest text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/30"
                                    placeholder="Filter nodes..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="overflow-y-auto no-scrollbar flex-1">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleOption(opt.id);
                                            }}
                                            className={cn(
                                                "w-full px-6 py-4 flex items-center justify-between group/opt hover:bg-primary-500/10 transition-colors",
                                                selectedIds.includes(opt.id) && "bg-primary-500/5"
                                            )}
                                        >
                                            <span className={cn(
                                                "text-xs font-black uppercase tracking-wider transition-colors",
                                                selectedIds.includes(opt.id) ? "text-primary-500" : "text-[var(--muted-foreground)] group-hover/opt:text-[var(--foreground)]"
                                            )}>
                                                {opt.name}
                                            </span>
                                            {selectedIds.includes(opt.id) && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white"
                                                >
                                                    <Check size={12} strokeWidth={4} />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center space-y-2">
                                        <X size={24} className="mx-auto text-[var(--muted-foreground)] opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-[var(--muted-foreground)] opacity-40">Zero Results Detected</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-500 font-bold px-1 flex items-center gap-1 mt-1 italic uppercase tracking-wider"
                >
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {error}
                </motion.p>
            )}
        </div>
    );
}
