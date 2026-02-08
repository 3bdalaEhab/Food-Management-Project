import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface TacticalInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    label?: string;
    error?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    highDensity?: boolean;
}

const TacticalInput = React.forwardRef<HTMLInputElement, TacticalInputProps>(
    ({ className, icon: Icon, label, error, leftElement, rightElement, highDensity = false, type, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);

        return (
            <div className="w-full space-y-3 group">
                {label && (
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] group-focus-within:text-primary-500 transition-colors duration-300">
                            {label}
                        </label>
                        {props.maxLength && (
                            <span className="text-[8px] font-bold text-[var(--muted-foreground)] opacity-40 uppercase">
                                Limit {props.maxLength}
                            </span>
                        )}
                    </div>
                )}

                <div className="relative group/input">
                    {/* Tactical Glow Effect */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="absolute -inset-[2px] bg-gradient-to-r from-primary-500/20 via-primary-500/5 to-primary-500/20 rounded-[1.3rem] lg:rounded-[1.6rem] blur-md z-0 pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    <div className={cn(
                        "relative z-10 flex items-center bg-[var(--background)]/60 backdrop-blur-md transition-all duration-300 overflow-hidden",
                        highDensity ? "h-11 rounded-xl lg:rounded-2xl" : "h-16 lg:h-[4.5rem] rounded-[1.3rem] lg:rounded-[2rem]",
                        isFocused
                            ? "ring-2 ring-primary-500/40 shadow-[0_4px_24px_rgba(255,107,38,0.15)]"
                            : "ring-1 ring-[var(--border)] hover:ring-[var(--muted-foreground)]/30",
                        error && "ring-2 ring-red-500/50"
                    )}>
                        {/* Icon Slot */}
                        {(Icon || leftElement) && (
                            <div className={cn(
                                "flex items-center justify-center shrink-0 transition-colors duration-300",
                                highDensity ? "w-11 px-3" : "w-16 lg:w-20 px-4",
                                isFocused ? "text-primary-500" : "text-[var(--muted-foreground)]/40"
                            )}>
                                {leftElement || (Icon && <Icon size={highDensity ? 16 : 20} className={cn(isFocused && "animate-pulse")} />)}
                            </div>
                        )}

                        <input
                            type={type}
                            className={cn(
                                "flex-1 w-full bg-transparent outline-none focus:outline-none border-none focus:ring-0 px-4 text-sm lg:text-base font-bold placeholder:text-[var(--muted-foreground)]/30 text-[var(--foreground)] selection:bg-primary-500/30",
                                !Icon && !leftElement && "px-6 lg:px-8",
                                className
                            )}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }}
                            ref={ref}
                            {...props}
                        />

                        {rightElement && (
                            <div className="px-5 flex items-center justify-center">
                                {rightElement}
                            </div>
                        )}

                        {/* Status Indicator */}
                        <div className={cn(
                            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-primary-500 transition-all duration-500 ease-out z-20 rounded-full",
                            isFocused ? "w-full opacity-100" : "w-0 opacity-0"
                        )} />
                    </div>
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
);

TacticalInput.displayName = "TacticalInput";

export { TacticalInput };
