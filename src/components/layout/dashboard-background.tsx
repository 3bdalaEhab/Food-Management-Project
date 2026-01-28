import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Pizza,
    UtensilsCrossed,
    ChefHat,
    Sparkles
} from "lucide-react";

const FloatingAsset = ({ Icon, size, top, left, delay, duration }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.03, 0.1, 0.03],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear" // Linear is cheaper for continuous loops
        }}
        style={{
            position: 'absolute',
            top,
            left,
            willChange: 'transform, opacity' // Hardware acceleration
        }}
        className="text-primary-500/10 pointer-events-none"
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
            {/* World-Class Optimized Mesh Engine */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        x: ['-2%', '2%', '-2%'],
                        y: ['-2%', '2%', '-2%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: 'transform' }}
                    className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,oklch(0.65_0.3_45/0.05)_0%,transparent_70%)] blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: ['2%', '-2%', '2%'],
                        y: ['2%', '-2%', '2%'],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: 'transform' }}
                    className="absolute -bottom-[10%] -right-[10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,oklch(0.6_0.2_145/0.04)_0%,transparent_70%)] blur-[80px]"
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
