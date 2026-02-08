import { memo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Activity } from "lucide-react";
import { StatChartDialog, ChartType } from "./stat-chart-dialog";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

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
                    "absolute -inset-1 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 rounded-[2.5rem]",
                    color.includes('primary-500') ? "bg-primary-500" : "bg-neutral-500"
                )} />

                <div
                    onClick={() => setIsChartOpen(true)}
                    className="relative h-full glass-card rounded-[2rem] p-5 md:p-6 border border-[var(--border)] bg-[var(--sidebar-background)]/60 backdrop-blur-md shadow-xl transition-all duration-700 group-hover:border-primary-500/30 group-hover:-translate-y-1.5 overflow-hidden cursor-pointer active:scale-95"
                >
                    {/* Background Soft Glow */}
                    <div className={cn(
                        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-1000 group-hover:opacity-20",
                        color.includes('primary-500') ? "bg-primary-500" : "bg-neutral-500"
                    )} />

                    <div className="relative z-10 flex flex-col justify-between h-full gap-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className={cn(
                                    "w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                                    iconBg || "bg-[var(--muted)]/50"
                                )}>
                                    <Icon size={20} className={iconColor || "text-primary-500"} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[9px] font-black tracking-[0.25em] rtl:tracking-normal text-[var(--muted-foreground)] uppercase group-hover:text-primary-500 transition-colors duration-500 rtl:not-italic flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                                        {label}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-black text-[var(--foreground)] tracking-tighter tabular-nums leading-none">
                                            {value}
                                        </p>
                                        <span className="text-[8px] font-bold text-[var(--muted-foreground)] opacity-40 uppercase tracking-widest rtl:not-italic">{chartUnit}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsChartOpen(true);
                                    }}
                                    className="p-2 rounded-xl bg-[var(--background)]/40 text-[var(--muted-foreground)] border border-[var(--border)] hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-300 shadow-sm"
                                >
                                    <BarChart3 size={14} />
                                </button>
                                {trend && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500" aria-label={`Trend: up by ${trend}`}>
                                        <TrendingUp size={10} className="shrink-0" />
                                        <span className="text-[9px] font-black rtl:not-italic">{trend}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mini Sparkline - High Performance */}
                        <div className="h-12 w-full mt-2 -mb-2 relative opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'bar' ? (
                                    <LineChart data={chartData}>
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke={getHexColor()}
                                            strokeWidth={2}
                                            dot={false}
                                            isAnimationActive={true}
                                        />
                                    </LineChart>
                                ) : (
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={getHexColor()} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={getHexColor()} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke={getHexColor()}
                                            fill={`url(#gradient-${label})`}
                                            strokeWidth={1.5}
                                            isAnimationActive={true}
                                        />
                                    </AreaChart>
                                )}
                            </ResponsiveContainer>
                        </div>

                        {/* Technical Intel Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                            <div className="flex items-center gap-2">
                                <Activity size={8} className="text-primary-500" />
                                <span className="text-[7px] font-bold text-[var(--muted-foreground)] uppercase tracking-tighter">Live_Intel_Stream</span>
                            </div>
                            <span className="text-[7px] font-bold text-[var(--muted-foreground)] uppercase tracking-tighter">SEC_LVL_04</span>
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
