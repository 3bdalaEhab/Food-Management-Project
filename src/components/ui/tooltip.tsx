import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
    delay?: number;
}

export const Tooltip = ({
    children,
    content,
    side = "top",
    className,
    delay = 0.2
}: TooltipProps) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay * 1000);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    const sideStyles: Record<string, string> = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
        left: "right-full top-1/2 -translate-y-1/2 mr-3",
        right: "left-full top-1/2 -translate-y-1/2 ml-3"
    };

    const arrowStyles: Record<string, string> = {
        top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-neutral-900 border-x-transparent border-t-[4px] border-x-[4px] border-b-0",
        bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-neutral-900 border-x-transparent border-b-[4px] border-x-[4px] border-t-0",
        left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-neutral-900 border-y-transparent border-l-[4px] border-y-[4px] border-r-0",
        right: "left-[-4px] top-1/2 -translate-y-1/2 border-r-neutral-900 border-y-transparent border-r-[4px] border-y-[4px] border-l-0"
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)", y: side === "top" ? 5 : side === "bottom" ? -5 : 0, x: side === "left" ? 5 : side === "right" ? -5 : 0 }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute z-[2000] whitespace-nowrap",
                            sideStyles[side]
                        )}
                    >
                        <div className={cn(
                            "bg-neutral-950 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden",
                            className
                        )}>
                            {/* Industrial Scanline Effect */}
                            <div className="absolute inset-0 bg-primary-500/5 animate-pulse pointer-events-none" />
                            <div className="relative z-10">{content}</div>

                            {/* Tooltip Arrow */}
                            <div className={cn("absolute w-0 h-0", arrowStyles[side])} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
