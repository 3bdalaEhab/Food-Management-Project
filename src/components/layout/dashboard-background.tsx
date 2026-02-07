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
            opacity: [0.01, 0.05, 0.01],
            y: [0, -30, 0],
            rotate: [rotate, rotate + 15, rotate],
            scale: [1, 1.1, 1]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{
            position: 'absolute',
            top,
            left,
            willChange: 'transform'
        }}
        className="text-primary-500/10 pointer-events-none"
    >
        <Icon size={size} strokeWidth={0.5} />
    </motion.div>
);

export function DashboardBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 120, top: '10%', left: '5%', delay: 0, duration: 35, rotate: 12 },
        { Icon: ChefHat, size: 90, top: '70%', left: '85%', delay: 5, duration: 32, rotate: -15 },
        { Icon: UtensilsCrossed, size: 70, top: '20%', left: '75%', delay: 2, duration: 28, rotate: 45 },
        { Icon: Sparkles, size: 40, top: '40%', left: '15%', delay: 8, duration: 25, rotate: 0 },
        { Icon: ChefHat, size: 60, top: '80%', left: '20%', delay: 10, duration: 40, rotate: 10 },
        { Icon: Pizza, size: 80, top: '5%', left: '50%', delay: 15, duration: 38, rotate: -20 },
        { Icon: UtensilsCrossed, size: 50, top: '60%', left: '45%', delay: 12, duration: 30, rotate: 90 },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
            {/* World-Class Optimized Mesh Engine (Surgical Efficiency) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div
                    className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,var(--color-primary-500)/0.03)_0%,transparent_70%)] blur-[80px]"
                />
                <div
                    className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,var(--color-success)/0.02)_0%,transparent_70%)] blur-[60px]"
                />
            </div>

            {/* Static Ambient Light Layer (Cheaper than animating blurs) */}
            <div className="absolute inset-0 z-5 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] opacity-60" />

            <div className="absolute inset-0 z-10 opacity-15">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Industrial Texture Layers */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/30 to-[var(--background)] opacity-80 z-20" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_200px_rgba(0,0,0,0.4)] z-20" />
        </div>
    );
}
