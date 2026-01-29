import { Toaster as Sonner } from "sonner";
import { useAppStore } from "@/stores";
import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
    const theme = useAppStore((state) => state.theme);

    return (
        <Sonner
            theme={theme as any}
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
                        "toast group bg-[var(--sidebar-background)] text-[var(--foreground)] border border-[var(--border)] shadow-2xl rounded-2xl p-4 backdrop-blur-xl",
                    title: "font-bold text-sm",
                    description: "text-xs font-medium text-[var(--muted-foreground)]",
                    actionButton:
                        "bg-primary-500 text-white rounded-xl font-bold text-xs px-4 py-2 hover:bg-primary-600 transition-colors",
                    cancelButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] rounded-xl font-bold text-xs px-4 py-2 hover:bg-[var(--sidebar-accent-foreground)]/10 transition-colors",
                    closeButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-accent-foreground)]/10 transition-colors",
                    success: "!border-green-500/30 !bg-green-500/5",
                    error: "!border-red-500/30 !bg-red-500/5",
                    warning: "!border-yellow-500/30 !bg-yellow-500/5",
                    info: "!border-blue-500/30 !bg-blue-500/5",
                },
            }}
            icons={{
                success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
                error: <XCircle className="w-5 h-5 text-red-500" />,
                warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
                info: <Info className="w-5 h-5 text-blue-500" />,
                loading: <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />,
            }}
            {...props}
        />
    );
}

export { toast } from "sonner";
