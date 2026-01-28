import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    Coffee,
    IceCream,
    Soup,
    UtensilsCrossed,
    Flame,
    ChefHat,
    Sparkles
} from "lucide-react";

const FloatingAsset = ({ Icon, size, top, left, delay, duration }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.05, 0.15, 0.05],
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left }}
        className="text-primary-500/20 pointer-events-none"
    >
        <Icon size={size} strokeWidth={1} />
    </motion.div>
);

export function DashboardBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 120, top: '10%', left: '5%', delay: 0, duration: 25 },
        { Icon: ChefHat, size: 100, top: '60%', left: '85%', delay: 5, duration: 22 },
        { Icon: UtensilsCrossed, size: 80, top: '20%', left: '75%', delay: 2, duration: 20 },
        { Icon: Sparkles, size: 40, top: '40%', left: '15%', delay: 8, duration: 18 },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc] dark:bg-[#020202]">
            {/* World-Class Chromatic Mesh Engine */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0],
                        x: ['-5%', '5%', '-5%'],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,oklch(0.65_0.3_45/0.08)_0%,transparent_70%)] blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [45, 0, 45],
                        y: ['-5%', '5%', '-5%'],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,oklch(0.6_0.2_145/0.06)_0%,transparent_70%)] blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,oklch(0.6_0.15_250/0.04)_0%,transparent_70%)] blur-[160px]"
                />
            </div>

            <div className="absolute inset-0 z-10 opacity-20">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Industrial Texture Layers */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 dark:via-transparent to-white dark:to-[#020202] opacity-90 z-20" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_200px_rgba(0,0,0,0.5)] z-20" />
        </div>
    );
}
