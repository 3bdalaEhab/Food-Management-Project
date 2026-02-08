import { Toaster as Sonner } from "sonner";
import { useAppStore } from "@/stores";
import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
    const theme = useAppStore((state) => state.theme);

    return (
        <Sonner
            theme={theme as 'light' | 'dark' | 'system'}
            className="toaster group"
            position="top-center"
            expand={true}
            richColors
            closeButton
            gap={12}
            toastOptions={{
                duration: 4000,
                classNames: {
                    toast:
                        "toast group bg-[var(--sidebar-background)]/80 text-[var(--foreground)] border border-[var(--border)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] p-5 backdrop-blur-2xl ring-1 ring-white/5",
                    title: "font-black text-lg uppercase tracking-tight italic text-white drop-shadow-md",
                    description: "text-[11px] font-bold text-[var(--foreground)] uppercase tracking-widest opacity-80",
                    actionButton:
                        "bg-primary-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-primary-600 transition-all shadow-[0_8px_20px_rgba(255,107,38,0.3)]",
                    cancelButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] rounded-xl font-black text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[var(--sidebar-accent-foreground)]/10 transition-all",
                    closeButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-accent-foreground)]/10 transition-all rounded-full",
                    success: "!border-green-500/40 !bg-green-500/[0.03] !text-green-500",
                    error: "!border-red-500/40 !bg-red-500/[0.03] !text-red-500",
                    warning: "!border-yellow-500/40 !bg-yellow-500/[0.03] !text-yellow-500",
                    info: "!border-blue-500/40 !bg-blue-500/[0.03] !text-blue-500",
                },
            }}
            icons={{
                success: <div className="p-2 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] rounded-full text-white"><CheckCircle2 className="w-4 h-4" /></div>,
                error: <div className="p-2 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] rounded-full text-white"><XCircle className="w-4 h-4" /></div>,
                warning: <div className="p-2 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] rounded-full text-white"><AlertTriangle className="w-4 h-4" /></div>,
                info: <div className="p-2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full text-white"><Info className="w-4 h-4" /></div>,
                loading: <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />,
            }}
            {...props}
        />
    );
}

export { toast } from "sonner";
