import { memo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
    delay: number;
}

export const StatCard = memo(({
    icon: Icon,
    label,
    value,
    trend,
    color,
    delay,
}: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="group relative"
            role="status"
            aria-label={`${label}: ${value}`}
        >
            <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-[2.5rem] blur-2xl`} />

            <div className="relative glass-card rounded-[2.5rem] p-8 border border-[var(--border)] bg-[var(--sidebar-background)]/80 backdrop-blur-3xl shadow-xl transition-all duration-500 group-hover:border-primary-500/30 group-hover:-translate-y-1 overflow-hidden">
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${color.replace('bg-', 'bg-gradient-to-br from-').replace('/5', '/10')} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />

                <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                    <div className="flex justify-between items-start">
                        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 border border-white/5`}>
                            <Icon size={24} className={`text-${color.split('-')[1]}-500`} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted-foreground)]">{label}</p>
                        <div className="flex items-end gap-3">
                            <p className="text-4xl font-black text-[var(--foreground)] tracking-tighter">{value}</p>
                            {trend && (
                                <div className="flex items-center gap-1 text-green-500 mb-1.5" aria-label={`Trend: up by ${trend}`}>
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-[10px] font-bold">{trend}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

StatCard.displayName = "StatCard";
