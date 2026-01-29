import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    Coffee,
    ChefHat,
    Flame,
    Sparkles,
} from "lucide-react";

// Simplified floating asset - reduced animations for better performance
const FloatingAsset = ({ Icon, size, top, left, delay, duration, color }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left, willChange: 'transform, opacity' }}
        className={color || "text-primary-500/30"}
    >
        <Icon size={size} strokeWidth={1} />
    </motion.div>
);

export function AuthBackground() {
    // Reduced number of assets for performance
    const assets = useMemo(() => [
        { Icon: Pizza, size: 60, top: '10%', left: '5%', delay: 0, duration: 20, color: "text-orange-500/30" },
        { Icon: Coffee, size: 50, top: '80%', left: '8%', delay: 2, duration: 18, color: "text-amber-600/30" },
        { Icon: ChefHat, size: 70, top: '40%', left: '90%', delay: 1, duration: 22, color: "text-white/20" },
        { Icon: Flame, size: 45, top: '70%', left: '88%', delay: 3, duration: 16, color: "text-red-500/30" },
        { Icon: Sparkles, size: 40, top: '20%', left: '85%', delay: 4, duration: 15, color: "text-yellow-400/30" },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
            {/* Simple Grid Pattern - No animation */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,107,38,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,38,1) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Static gradient - no animation for performance */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[80px]" />

            {/* Reduced floating assets */}
            <div className="absolute inset-0">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Simple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        </div>
    );
}
