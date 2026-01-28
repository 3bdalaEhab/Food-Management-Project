import { Toaster as Sonner } from "sonner";
import { useAppStore } from "@/stores";

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
            toastOptions={{
                classNames: {
                    toast:
                        "toast group bg-[var(--sidebar-background)] text-[var(--foreground)] border-[var(--border)] shadow-2xl rounded-2xl p-4",
                    title: "font-black uppercase tracking-tight text-sm italic",
                    description: "text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest",
                    actionButton:
                        "bg-primary-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] px-4",
                    cancelButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] rounded-xl font-black uppercase tracking-widest text-[10px] px-4",
                    closeButton:
                        "bg-[var(--sidebar-accent)] text-[var(--muted-foreground)] border-[var(--border)]",
                },
            }}
            {...props}
        />
    );
}

export { toast } from "sonner";
