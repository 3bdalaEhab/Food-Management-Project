import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    Coffee,
    ChefHat,
    Flame,
    Sparkles,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

// Simplified floating asset - reduced animations for better performance
interface FloatingAssetProps {
    Icon: LucideIcon;
    size: number;
    top: string;
    left: string;
    delay: number;
    duration: number;
    color?: string;
    rotate?: number;
}

const FloatingAsset = ({ Icon, size, top, left, delay, duration, color, rotate = 0 }: FloatingAssetProps) => (
    <motion.div
        initial={{ opacity: 0, rotate }}
        animate={{
            opacity: [0.3, 0.6, 0.3], // Increased opacity for better visibility
            y: [0, -50, 0],
            x: [0, 15, 0],
            rotate: [rotate, rotate + 45, rotate],
            scale: [1, 1.1, 1]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left, willChange: 'transform, opacity' }}
        className={color || "text-primary-500/40"}
    >
        <Icon size={size} strokeWidth={1.5} />
    </motion.div>
);

export function AuthBackground() {
    // Increased density and visibility of assets
    const assets = useMemo(() => [
        { Icon: Pizza, size: 90, top: '10%', left: '8%', delay: 0, duration: 25, color: "text-orange-500/40", rotate: 15 },
        { Icon: Coffee, size: 70, top: '85%', left: '5%', delay: 2, duration: 22, color: "text-amber-600/40", rotate: -10 },
        { Icon: ChefHat, size: 110, top: '25%', left: '85%', delay: 1, duration: 28, color: "text-primary-500/30", rotate: 20 }, // Increased size
        { Icon: Flame, size: 60, top: '65%', left: '92%', delay: 3, duration: 20, color: "text-red-500/40", rotate: -5 },
        { Icon: Sparkles, size: 55, top: '15%', left: '75%', delay: 4, duration: 18, color: "text-yellow-400/40", rotate: 45 },
        { Icon: ChefHat, size: 80, top: '60%', left: '12%', delay: 6, duration: 30, color: "text-primary-500/30", rotate: -15 },
        { Icon: Pizza, size: 75, top: '30%', left: '45%', delay: 8, duration: 24, color: "text-orange-500/40", rotate: 30 },
        { Icon: Sparkles, size: 45, top: '45%', left: '55%', delay: 5, duration: 26, color: "text-primary-500/30", rotate: 0 },
        { Icon: Flame, size: 85, top: '10%', left: '90%', delay: 7, duration: 29, color: "text-red-400/30", rotate: 10 },
        { Icon: Coffee, size: 50, top: '80%', left: '40%', delay: 9, duration: 21, color: "text-amber-700/30", rotate: -25 },
        { Icon: Sparkles, size: 30, top: '15%', left: '30%', delay: 2, duration: 15, color: "text-primary-400/40", rotate: 0 },

        // New Added Assets for density
        { Icon: Pizza, size: 100, top: '50%', left: '5%', delay: 5, duration: 32, color: "text-orange-500/30", rotate: 45 },
        { Icon: ChefHat, size: 120, top: '75%', left: '80%', delay: 3, duration: 35, color: "text-primary-500/20", rotate: -20 },
        { Icon: Flame, size: 70, top: '40%', left: '20%', delay: 4, duration: 27, color: "text-red-500/30", rotate: 10 },
        { Icon: Coffee, size: 65, top: '5%', left: '50%', delay: 6, duration: 23, color: "text-amber-600/30", rotate: 5 },
    ], []);

    return (
        <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden pointer-events-none z-0 bg-[var(--background)] touch-none">
            {/* Enhanced Tactical Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,107,38,1) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(255,107,38,1) 1px, transparent 1px),
                        radial-gradient(circle at 50% 50%, rgba(255,107,38,0.2) 0%, transparent 80%)
                    `,
                    backgroundSize: '80px 80px, 80px 80px, 100% 100%'
                }}
            />



            {/* Floating Assets Rail */}
            <div className="absolute inset-0 z-10">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Final Depth Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        </div>
    );
}
