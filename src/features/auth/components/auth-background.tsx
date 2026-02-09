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
            opacity: [0.1, 0.3, 0.1],
            y: [0, -40, 0],
            rotate: [rotate, rotate + 20, rotate],
            scale: [1, 1.15, 1]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left, willChange: 'transform, opacity' }}
        className={color || "text-primary-500/20"}
    >
        <Icon size={size} strokeWidth={0.5} />
    </motion.div>
);

export function AuthBackground() {
    // Reduced number of assets for performance
    const assets = useMemo(() => [
        { Icon: Pizza, size: 80, top: '5%', left: '10%', delay: 0, duration: 25, color: "text-orange-500/20", rotate: 15 },
        { Icon: Coffee, size: 60, top: '85%', left: '5%', delay: 2, duration: 22, color: "text-amber-600/20", rotate: -10 },
        { Icon: ChefHat, size: 90, top: '35%', left: '85%', delay: 1, duration: 28, color: "text-white/10", rotate: 20 },
        { Icon: Flame, size: 55, top: '75%', left: '90%', delay: 3, duration: 20, color: "text-red-500/20", rotate: -5 },
        { Icon: Sparkles, size: 50, top: '15%', left: '80%', delay: 4, duration: 18, color: "text-yellow-400/20", rotate: 45 },
        { Icon: ChefHat, size: 70, top: '60%', left: '15%', delay: 6, duration: 30, color: "text-white/10", rotate: -15 },
        { Icon: Pizza, size: 65, top: '25%', left: '45%', delay: 8, duration: 24, color: "text-orange-500/20", rotate: 30 },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
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

            {/* Dynamic Scanning Line */}
            <motion.div
                animate={{
                    y: ["0%", "100%", "0%"],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent pointer-events-none z-10"
            />

            {/* Cinematic Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary-500/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

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
