import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    UtensilsCrossed,
    ChefHat,
    Sparkles
} from "lucide-react";

/**
 * HIGH-PERFORMANCE GLOBAL BACKGROUND
 * Optimized for GPU efficiency while maintaining cinematic aesthetic.
 */

const FloatingAsset = ({ Icon, size, top, left, delay, duration }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.02, 0.08, 0.02],
            y: [0, -15, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        style={{
            position: 'absolute',
            top,
            left,
            willChange: 'transform' // Optimized hardware acceleration
        }}
        className="text-primary-500/10 pointer-events-none"
    >
        <Icon size={size} strokeWidth={1} />
    </motion.div>
);

export function DashboardBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 100, top: '15%', left: '8%', delay: 0, duration: 30 },
        { Icon: ChefHat, size: 80, top: '65%', left: '82%', delay: 5, duration: 28 },
        { Icon: UtensilsCrossed, size: 60, top: '25%', left: '72%', delay: 2, duration: 25 },
        { Icon: Sparkles, size: 30, top: '45%', left: '18%', delay: 8, duration: 22 },
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
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/30 to-[var(--background)] opacity-80 z-20" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_200px_rgba(0,0,0,0.4)] z-20" />
        </div>
    );
}
