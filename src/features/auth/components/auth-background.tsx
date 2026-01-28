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
            opacity: [0.1, 0.4, 0.1],
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left }}
        className="text-primary-500/20 drop-shadow-[0_0_15px_rgba(255,107,38,0.2)]"
    >
        <Icon size={size} strokeWidth={1} />
    </motion.div>
);

export function AuthBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 64, top: '15%', left: '10%', delay: 0, duration: 12 },
        { Icon: Coffee, size: 48, top: '75%', left: '15%', delay: 2, duration: 10 },
        { Icon: IceCream, size: 56, top: '30%', left: '80%', delay: 4, duration: 14 },
        { Icon: Soup, size: 52, top: '85%', left: '70%', delay: 1, duration: 11 },
        { Icon: ChefHat, size: 72, top: '40%', left: '5%', delay: 3, duration: 15 },
        { Icon: UtensilsCrossed, size: 44, top: '20%', left: '70%', delay: 5, duration: 13 },
        { Icon: Flame, size: 40, top: '65%', left: '85%', delay: 2.5, duration: 9 },
        { Icon: Sparkles, size: 32, top: '50%', left: '12%', delay: 1.5, duration: 8 },
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0a0a0a]">
            {/* Liquid Mesh Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 90, 0],
                    x: ['-20%', '20%', '-20%'],
                    y: ['-20%', '20%', '-20%'],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,107,38,0.15)_0%,transparent_50%)] blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1.4, 1, 1.4],
                    rotate: [0, -90, 0],
                    x: ['20%', '-20%', '20%'],
                    y: ['20%', '-20%', '20%'],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,107,38,0.1)_0%,transparent_50%)] blur-[100px]"
            />

            {/* Floating Assets Layer */}
            <div className="absolute inset-0 z-10">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Cinematic Noise & Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>
    );
}
