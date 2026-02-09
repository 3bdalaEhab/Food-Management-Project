import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    UtensilsCrossed,
    ChefHat,
    Sparkles
} from "lucide-react";

import { LucideIcon } from "lucide-react";

/**
 * HIGH-PERFORMANCE GLOBAL BACKGROUND
 * Optimized for GPU efficiency while maintaining cinematic aesthetic.
 */

interface FloatingAssetProps {
    Icon: LucideIcon;
    size: number;
    top: string;
    left: string;
    delay: number;
    duration: number;
    rotate?: number;
}

const FloatingAsset = ({ Icon, size, top, left, delay, duration, rotate = 0 }: FloatingAssetProps) => (
    <motion.div
        initial={{ opacity: 0, rotate }}
        animate={{
            opacity: [0.01, 0.04, 0.01], // Lower max opacity for subtlety
            y: [0, -20, 0], // Reduced movement range
            rotate: [rotate, rotate + 10, rotate], // Reduced rotation
            // Removed scale animation to save performance
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear" // Linear is cheaper than easeInOut
        }}
        style={{
            top,
            left,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
        }}
        className="text-primary-500/10 pointer-events-none"
    >
        <Icon size={size} strokeWidth={0.5} />
    </motion.div>
);

export function DashboardBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 100, top: '10%', left: '5%', delay: 0, duration: 45, rotate: 12 }, // Slower duration
        { Icon: ChefHat, size: 80, top: '70%', left: '85%', delay: 5, duration: 40, rotate: -15 },
        // Removed UtensilsCrossed to reduce DOM node count and overlapping
        { Icon: Sparkles, size: 30, top: '40%', left: '15%', delay: 8, duration: 35, rotate: 0 },
        { Icon: ChefHat, size: 50, top: '80%', left: '20%', delay: 10, duration: 50, rotate: 10 },
        // Removed central Pizza to clear main content area
        { Icon: UtensilsCrossed, size: 40, top: '60%', left: '45%', delay: 12, duration: 38, rotate: 90 },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
            {/* World-Class Optimized Mesh Engine (Surgical Efficiency) */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
                <div
                    className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,var(--color-primary-500)/0.05)_0%,transparent_70%)] blur-[100px]"
                />
                <div
                    className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,var(--color-success)/0.04)_0%,transparent_70%)] blur-[80px]"
                />
            </div>

            {/* Static Ambient Light Layer (Cheaper than animating blurs) */}
            <div className="absolute inset-0 z-5 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] opacity-60 dark:opacity-80" />

            <div className="absolute inset-0 z-10 opacity-15 dark:opacity-25">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Industrial Texture Layers */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/30 to-[var(--background)] opacity-80 z-20" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_300px_rgba(0,0,0,0.6)] z-20" />

        </div>
    );
}
