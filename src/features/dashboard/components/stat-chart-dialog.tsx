import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { AreaChart as AreaIcon, BarChart3, LineChart as LineIcon, LucideIcon } from "lucide-react";

export type ChartType = "line" | "bar" | "area" | "pie";

interface StatChartDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    type: ChartType;
    data: { name: string; value: number }[];
    color: string;
    unit?: string;
    trend?: string;
}

const CustomTooltip = ({ active, payload, label, unit = "unit", color = "var(--primary-500)" }: {
    active?: boolean;
    payload?: { value: number; payload: { name: string; value: number } }[];
    label?: string;
    unit?: string;
    color?: string;
}) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="glass-card p-4 shadow-2xl backdrop-blur-xl bg-[var(--sidebar-background)]/90 rounded-2xl animate-in fade-in zoom-in duration-300"
                style={{ borderColor: `${color}4D`, borderStyle: 'solid', borderWidth: '1px' }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">{label}</p>
                </div>
                <p className="text-xl font-black text-[var(--foreground)] italic tracking-tighter">
                    {payload[0].value.toLocaleString()}
                    <span className="text-[10px] ml-1 opacity-50 not-italic uppercase tracking-widest">{unit}</span>
                </p>
            </div>
        );
    }
    return null;
};

export function StatChartDialog({
    open,
    onOpenChange,
    title,
    description,
    type: initialType,
    data,
    color,
    unit = "unit",
    trend = "0%",
}: StatChartDialogProps) {
    const { t } = useTranslation();
    const [currentType, setCurrentType] = useState<ChartType>(initialType);

    const primaryColor = useMemo(() => {
        return color.includes("#") ? color : "var(--primary-500)";
    }, [color]);

    const chartContent = useMemo(() => {
        switch (currentType) {
            case "area":
                return (
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                            dy={15}
                        />
                        <YAxis
                            hide
                        />
                        <Tooltip content={<CustomTooltip unit={unit} color={primaryColor} />} cursor={{ stroke: primaryColor, strokeWidth: 1, strokeDasharray: '5 5' }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={primaryColor}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={4}
                            animationDuration={2000}
                        />
                    </AreaChart>
                );
            case "bar":
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                            dy={15}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip unit={unit} color={primaryColor} />} cursor={{ fill: primaryColor, opacity: 0.05 }} />
                        <Bar
                            dataKey="value"
                            fill={primaryColor}
                            radius={[12, 12, 0, 0]}
                            animationDuration={2000}
                        />
                    </BarChart>
                );
            case "line":
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                            dy={15}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip unit={unit} color={primaryColor} />} />
                        <Line
                            type="stepAfter"
                            dataKey="value"
                            stroke={primaryColor}
                            strokeWidth={5}
                            dot={{ r: 6, fill: primaryColor, strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 10, strokeWidth: 4, stroke: "#fff", fill: primaryColor }}
                            animationDuration={2000}
                        />
                    </LineChart>
                );
            case "pie": {
                const COLORS = [primaryColor, '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={140}
                            paddingAngle={8}
                            dataKey="value"
                            animationDuration={2000}
                            stroke="none"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip unit={unit} color={primaryColor} />} />
                    </PieChart>
                );
            }
            default:
                return null;
        }
    }, [currentType, data, primaryColor, unit]);

    const chartTypes: { type: ChartType; icon: LucideIcon; label: string }[] = [
        { type: 'area', icon: AreaIcon, label: 'Area' },
        { type: 'bar', icon: BarChart3, label: 'Bar' },
        { type: 'line', icon: LineIcon, label: 'Line' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[750px] bg-[var(--sidebar-background)] border-[var(--border)] rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none opacity-10"
                    style={{ backgroundColor: primaryColor }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sm:mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 sm:w-2 h-7 sm:h-9 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                        <div className="flex flex-col">
                            <h2
                                className="text-xl sm:text-2xl font-black tracking-tighter text-black dark:text-white uppercase leading-none"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {title}
                            </h2>
                            <p
                                className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mt-1.5 block text-black/70 dark:text-white/70"
                                style={{ color: 'var(--foreground)', opacity: 0.7 }}
                            >
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Chart Type Selector */}
                    <div className="flex bg-[var(--background)] p-1 rounded-2xl border border-[var(--border)] shadow-inner overflow-x-auto no-scrollbar">
                        {chartTypes.map((ct) => (
                            <button
                                key={ct.type}
                                onClick={() => setCurrentType(ct.type)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${currentType === ct.type
                                    ? 'bg-[var(--sidebar-background)] shadow-lg border border-[var(--border)]'
                                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                                    }`}
                                style={currentType === ct.type ? { color: primaryColor } : {}}
                            >
                                <ct.icon size={14} />
                                <span>{ct.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-[250px] sm:h-[400px] w-full mt-4 flex items-center justify-center relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartContent}
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 sm:mt-12 flex items-center justify-center relative z-10 bg-[var(--background)]/40 backdrop-blur-md p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-[var(--border)] shadow-inner">
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                        <div className="flex flex-col items-center">
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-1">
                                {t('charts.total')}
                            </span>
                            <span className="text-2xl sm:text-4xl font-black text-[var(--foreground)] tracking-tighter italic leading-none">
                                {data.reduce((acc, curr) => acc + (curr.value || 0), 0).toLocaleString()}
                                <span className="text-xs sm:text-sm ml-2 not-italic opacity-40 uppercase tracking-widest">{unit}</span>
                            </span>
                        </div>
                        <div className="hidden sm:block h-12 w-px bg-[var(--border)]" />
                        <div className="flex flex-col items-center">
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70" style={{ color: primaryColor }}>
                                {t('charts.growth')}
                            </span>
                            <span className="text-2xl sm:text-4xl font-black tracking-tighter italic leading-none" style={{ color: primaryColor }}>
                                {trend}
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
