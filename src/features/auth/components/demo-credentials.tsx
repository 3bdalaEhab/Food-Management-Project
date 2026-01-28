import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, ArrowRight, MousePointerClick, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoCredentialsProps {
    onFill: (email: string, pass: string) => void;
}

export function DemoCredentials({ onFill }: DemoCredentialsProps) {
    const [activeRole, setActiveRole] = useState<string | null>(null);

    const credentials = [
        {
            role: "ADMIN_STRATEGIST",
            email: "admin@culinary.io",
            pass: "123123",
            icon: ShieldAlert,
            color: "red",
            desc: "Full System Control • User Management • Protocol Override",
            borderColor: "group-hover:border-red-500/50",
            bgGradient: "from-red-500/5 to-red-600/5",
            textColor: "text-red-500",
            shadow: "group-hover:shadow-red-500/20"
        },
        {
            role: "FIELD_OPERATOR",
            email: "user@culinary.io",
            pass: "123123",
            icon: Zap,
            color: "primary",
            desc: "Standard Access • Recipe Execution • Dashboard View",
            borderColor: "group-hover:border-primary-500/50",
            bgGradient: "from-primary-500/5 to-primary-600/5",
            textColor: "text-primary-500",
            shadow: "group-hover:shadow-primary-500/20"
        }
    ];

    const handleFill = (email: string, pass: string, role: string) => {
        onFill(email, pass);
        setActiveRole(role);
        setTimeout(() => setActiveRole(null), 1500);
    };

    return (
        <div className="space-y-6 mt-8 pt-8 border-t border-[var(--border)] border-dashed">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[var(--muted-foreground)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Demo Access Protocols</span>
                </div>
                <span className="text-[9px] font-bold text-[var(--muted-foreground)]/50 uppercase tracking-wider flex items-center gap-1">
                    <MousePointerClick size={10} />
                    Click to Auto-Fill
                </span>
            </div>

            <div className="grid gap-4">
                {credentials.map((cred) => (
                    <motion.button
                        key={cred.role}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFill(cred.email, cred.pass, cred.role)}
                        className={cn(
                            "relative w-full text-left overflow-hidden rounded-2xl border border-[var(--border)] p-4 group transition-all duration-300",
                            `bg-gradient-to-br ${cred.bgGradient}`,
                            cred.borderColor,
                            cred.shadow,
                            "hover:bg-[var(--sidebar-background)]"
                        )}
                        type="button"
                    >
                        {/* Active Flash Effect */}
                        {activeRole === cred.role && (
                            <motion.div
                                layoutId="flash"
                                className={cn("absolute inset-0 opacity-20 z-0", cred.textColor.replace("text-", "bg-"))}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                                exit={{ opacity: 0 }}
                            />
                        )}

                        <div className="flex items-center gap-4 relative z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300",
                                "bg-[var(--background)] border-[var(--border)]",
                                `group-hover:border-${cred.color}-500/50`,
                                cred.textColor
                            )}>
                                <cred.icon size={20} className={cn("transition-transform duration-500 group-hover:scale-110")} />
                            </div>

                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className={cn("text-[11px] font-black uppercase tracking-widest transition-colors", cred.textColor)}>
                                        {cred.role}
                                    </h4>
                                    <div className={cn(
                                        "opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0",
                                        cred.textColor
                                    )}>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-[var(--muted-foreground)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
                                    {cred.desc}
                                </p>
                            </div>
                        </div>

                        {/* Tactical Corners */}
                        <div className={cn("absolute top-0 right-0 w-2 h-2 border-t border-r opacity-0 group-hover:opacity-100 transition-all duration-500", `border-${cred.color}-500`)} />
                        <div className={cn("absolute bottom-0 left-0 w-2 h-2 border-b border-l opacity-0 group-hover:opacity-100 transition-all duration-500", `border-${cred.color}-500`)} />
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

export default DemoCredentials;
