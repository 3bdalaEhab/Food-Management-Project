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
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc] dark:bg-[#050505]">
            {/* Soft Ambient Mesh */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: ['-10%', '10%', '-10%'],
                    y: ['-10%', '10%', '-10%'],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,107,38,0.03)_0%,transparent_50%)] blur-[100px]"
            />

            <div className="absolute inset-0 z-10 opacity-40">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Subtle Grain */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        </div>
    );
}
