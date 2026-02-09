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
                        "toast group bg-[var(--sidebar-background)]/70 text-[var(--foreground)] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-5 backdrop-blur-3xl ring-1 ring-white/10 w-[calc(100vw-2.5rem)] sm:w-auto mt-4 transition-all duration-500",
                    title: "font-black text-base sm:text-lg uppercase tracking-tight italic text-white drop-shadow-lg",
                    description: "text-[10px] sm:text-[11px] font-bold text-[var(--foreground)] uppercase tracking-[0.2em] opacity-60 mt-1",
                    actionButton:
                        "bg-primary-500 text-white rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-5 sm:px-7 py-2.5 sm:py-3.5 hover:bg-primary-600 transition-all shadow-[0_10px_25px_rgba(255,107,38,0.4)] active:scale-95",
                    cancelButton:
                        "bg-white/5 text-[var(--muted-foreground)] rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-5 sm:px-7 py-2.5 sm:py-3.5 hover:bg-white/10 transition-all active:scale-95",
                    closeButton:
                        "bg-[var(--background)] text-[var(--muted-foreground)] border border-white/10 hover:text-white hover:bg-white/5 transition-all rounded-full p-2 translate-x-2 -translate-y-2 shadow-xl",
                    success: "!border-green-500/40 !bg-green-500/10 !text-green-400",
                    error: "!border-red-500/40 !bg-red-500/10 !text-red-400",
                    warning: "!border-yellow-500/40 !bg-yellow-500/10 !text-yellow-400",
                    info: "!border-blue-500/40 !bg-blue-500/10 !text-blue-400",
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
