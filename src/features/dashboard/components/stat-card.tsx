import { memo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";
import { StatChartDialog, ChartType } from "./stat-chart-dialog";
import { cn } from "@/lib/utils";

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
    iconColor?: string;
    iconBg?: string;
    delay: number;
    chartType?: ChartType;
    chartData?: { name: string; value: number }[];
    chartDescription?: string;
    chartUnit?: string;
}

export const StatCard = memo(({
    icon: Icon,
    label,
    value,
    trend,
    color,
    iconColor,
    iconBg,
    delay,
    chartType = "area",
    chartData = [],
    chartDescription = "",
    chartUnit = "unit",
}: StatCardProps) => {
    const [isChartOpen, setIsChartOpen] = useState(false);

    const getHexColor = () => {
        if (color.includes('primary-500')) return '#f97316'; // Orange primary
        if (color.includes('blue-500')) return '#3b82f6';
        if (color.includes('green-500')) return '#22c55e';
        if (color.includes('red-500')) return '#ef4444';
        return '#f97316'; // default
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: 0.5, ease: "easeOut" }}
                className="group relative h-full"
                role="status"
                aria-label={`${label}: ${value}`}
            >
                {/* Subtle Ambient Glow */}
                <div className={cn(
                    "absolute -inset-1 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 rounded-[3rem]",
                    color.includes('primary-500') ? "bg-primary-500" : "bg-neutral-500"
                )} />

                <div
                    onClick={() => setIsChartOpen(true)}
                    className="relative h-full glass-card rounded-[2.5rem] p-8 border border-[var(--border)] bg-[var(--sidebar-background)]/40 backdrop-blur-xl shadow-xl transition-all duration-700 group-hover:border-primary-500/30 group-hover:-translate-y-2 overflow-hidden cursor-pointer active:scale-95"
                >
                    {/* Background Soft Glow */}
                    <div className={cn(
                        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-1000 group-hover:opacity-20",
                        color.includes('primary-500') ? "bg-primary-500" : "bg-neutral-500"
                    )} />

                    <div className="relative z-10 flex flex-col justify-between h-full gap-8">
                        <div className="flex justify-between items-start">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                                iconBg || "bg-[var(--muted)]/50"
                            )}>
                                <Icon size={24} className={iconColor || "text-primary-500"} />
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsChartOpen(true);
                                }}
                                className="p-2.5 rounded-xl bg-[var(--background)]/40 text-[var(--muted-foreground)] border border-[var(--border)] hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-300 shadow-sm"
                            >
                                <BarChart3 size={16} />
                            </button>
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="text-[10px] font-black tracking-[0.25em] text-[var(--foreground)] uppercase group-hover:text-primary-500 transition-colors duration-500">
                                {label}
                            </h3>
                            <div className="flex items-end justify-between">
                                <p className="text-4xl font-black text-[var(--foreground)] tracking-tighter tabular-nums leading-none">
                                    {value}
                                </p>
                                {trend && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500" aria-label={`Trend: up by ${trend}`}>
                                        <TrendingUp size={12} className="shrink-0" />
                                        <span className="text-[10px] font-black">{trend}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <StatChartDialog
                open={isChartOpen}
                onOpenChange={setIsChartOpen}
                title={label}
                description={chartDescription}
                type={chartType}
                data={chartData}
                color={getHexColor()}
                unit={chartUnit}
                trend={trend}
            />
        </>
    );
});

StatCard.displayName = "StatCard";
