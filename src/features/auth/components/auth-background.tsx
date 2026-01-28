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
    Sparkles,
    Zap,
    Cherry,
    Croissant
} from "lucide-react";

const FloatingAsset = ({ Icon, size, top, left, delay, duration, color }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.3, 0.8, 0.3], // Much clearer (was 0.1-0.5)
            y: [0, -80, 0], // Increased float range (was -60)
            x: [0, 40, 0],
            rotate: [0, 45, -45, 0], // More rotation
            scale: [0.9, 1.3, 0.9] // Larger breathing effect
        }}
        transition={{
            duration: duration * 1.2, // Slower, more majestic
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', top, left }}
        className={`drop-shadow-[0_10px_35px_rgba(255,107,38,0.4)] ${color || "text-primary-500/40"}`}
    >
        <Icon size={size * 1.2} strokeWidth={1.5} /> {/* Thicker stroke, bigger size */}
    </motion.div>
);

export function AuthBackground() {
    const assets = useMemo(() => [
        { Icon: Pizza, size: 90, top: '8%', left: '4%', delay: 0, duration: 18, color: "text-orange-500/50" },
        { Icon: Coffee, size: 70, top: '82%', left: '10%', delay: 2, duration: 15, color: "text-amber-600/50" },
        { Icon: IceCream, size: 80, top: '22%', left: '88%', delay: 4, duration: 20, color: "text-pink-500/50" },
        { Icon: Soup, size: 75, top: '85%', left: '78%', delay: 1, duration: 16, color: "text-yellow-600/50" },
        { Icon: ChefHat, size: 110, top: '38%', left: '3%', delay: 3, duration: 22, color: "text-white/40" },
        { Icon: UtensilsCrossed, size: 68, top: '12%', left: '82%', delay: 5, duration: 19, color: "text-neutral-400/50" },
        { Icon: Flame, size: 65, top: '65%', left: '92%', delay: 2.5, duration: 14, color: "text-red-500/50" },
        { Icon: Sparkles, size: 55, top: '50%', left: '12%', delay: 1.5, duration: 12, color: "text-yellow-400/60" },
        { Icon: Zap, size: 45, top: '5%', left: '50%', delay: 4, duration: 13, color: "text-blue-400/50" },
        { Icon: Cherry, size: 60, top: '15%', left: '25%', delay: 6, duration: 17, color: "text-red-600/50" },
        { Icon: Croissant, size: 70, top: '75%', left: '20%', delay: 3.5, duration: 18, color: "text-orange-400/50" }
    ], []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
            {/* High-Definition Tactical Grid - Clearer lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,38,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,107,38,0.05)_1.5px,transparent_1.5px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

            {/* Brighter, More Vivid Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 60, 0],
                    x: ['-20%', '20%', '-20%'],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,107,38,0.25)_0%,transparent_50%)] blur-[90px]"
            />
            <motion.div
                animate={{
                    scale: [1.4, 1, 1.4],
                    rotate: [0, -60, 0],
                    x: ['20%', '-20%', '20%'],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,107,38,0.2)_0%,transparent_50%)] blur-[90px]"
            />

            {/* Assets Layer - Z-Index boosted */}
            <div className="absolute inset-0 z-20">
                {assets.map((asset, i) => (
                    <FloatingAsset key={i} {...asset} />
                ))}
            </div>

            {/* Overlay Layers - Adjusted for Clarity */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay z-10" />
            {/* Reduced opacity overlay for clearer view */}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)] z-10" />

            {/* Central Glow - Clearer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 blur-[100px] rounded-full z-0" />
        </div>
    );
}
