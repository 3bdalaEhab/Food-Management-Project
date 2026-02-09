import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, ArrowRight, MousePointerClick, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface DemoCredentialsProps {
    onFill: (email: string, pass: string) => void;
}

export function DemoCredentials({ onFill }: DemoCredentialsProps) {
    const { t } = useTranslation();
    const [activeRole, setActiveRole] = useState<string | null>(null);

    const credentials = [
        {
            role: t('auth.login.admin_role'),
            email: "abdalaehab3@gmail.com",
            pass: "Ae123***",
            icon: ShieldAlert,
            color: "red",
            desc: t('auth.login.admin_desc'),
            borderColor: "group-hover:border-red-500/50",
            bgGradient: "from-red-500/5 to-red-600/5",
            textColor: "text-red-500",
            shadow: "group-hover:shadow-red-500/20"
        },
        {
            role: t('auth.login.user_role'),
            email: "panace9556@azeriom.com",
            pass: "123Ae***",
            icon: Zap,
            color: "primary",
            desc: t('auth.login.user_desc'),
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
        <div className="w-full space-y-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                        <Terminal size={14} className="text-primary-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)] underline decoration-primary-500/30 underline-offset-4">{t('auth.login.protocols')}</span>
                        <span className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider opacity-40 italic">{t('auth.login.system_core')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 group/tip self-end sm:self-auto">
                    <span className="text-[10px] sm:text-[11px] font-black text-primary-500/80 uppercase tracking-wider flex items-center gap-2 bg-primary-500/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary-500/20 shadow-sm shadow-primary-500/10 whitespace-nowrap">
                        <MousePointerClick size={12} className="animate-pulse" />
                        {t('auth.login.direct_link')}
                    </span>
                </div>
            </div>

            <div className="grid gap-5 relative z-10">
                {credentials.map((cred) => (
                    <motion.button
                        key={cred.role}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFill(cred.email, cred.pass, cred.role)}
                        className={cn(
                            "relative w-full text-left overflow-hidden rounded-[2rem] border p-5 group transition-all duration-500",
                            "bg-white/[0.02] border-white/5 backdrop-blur-md",
                            "hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                            cred.textColor.replace("text-", "group-hover:shadow-") // Dynamic shadow color
                        )}
                        type="button"
                    >
                        {/* Elite Scanline Overlay */}
                        <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />

                        {/* Active Flash Effect */}
                        {activeRole === cred.role && (
                            <motion.div
                                layoutId="flash"
                                className={cn("absolute inset-0 opacity-15 z-0 outline-none ring-2 ring-inset", cred.textColor.replace("text-", "ring-"))}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        <div className="flex items-center gap-5 relative z-10">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-500 shadow-lg",
                                "bg-[var(--background)]/80 border-white/10 group-hover:scale-110",
                                isActiveRoleAdmin(cred.role) ? "group-hover:border-red-500/50 group-hover:text-red-500 shadow-red-500/10" : "group-hover:border-primary-500/50 group-hover:text-primary-500 shadow-primary-500/10",
                                cred.textColor
                            )}>
                                <cred.icon size={24} className="transition-transform duration-700" />
                            </div>

                            <div className="flex-1 min-w-0 space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <h4 className={cn("text-xs font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2", cred.textColor)}>
                                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", cred.textColor.replace("text-", "bg-"))} />
                                        {cred.role.replace("_", " ")}
                                    </h4>
                                    <div className={cn(
                                        "opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0",
                                        cred.textColor
                                    )}>
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-[var(--muted-foreground)] leading-relaxed group-hover:text-[var(--foreground)] group-hover:opacity-100 transition-colors uppercase tracking-widest opacity-60">
                                    {cred.desc}
                                </p>
                            </div>
                        </div>

                        {/* HUD Corners */}
                        <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-0 group-hover:opacity-40 transition-all duration-500 rounded-tr-xl", isActiveRoleAdmin(cred.role) ? "border-red-500" : "border-primary-500")} />
                        <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-0 group-hover:opacity-40 transition-all duration-500 rounded-bl-xl", isActiveRoleAdmin(cred.role) ? "border-red-500" : "border-primary-500")} />
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

// Utility to check admin role
function isActiveRoleAdmin(role: string) {
    return role.toLowerCase().includes('admin');
}

export default DemoCredentials;
