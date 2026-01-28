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
                        "toast group bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl p-4",
                    title: "font-black uppercase tracking-tight text-sm italic",
                    description: "text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest",
                    actionButton:
                        "bg-primary-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] px-4",
                    cancelButton:
                        "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-xl font-black uppercase tracking-widest text-[10px] px-4",
                    closeButton:
                        "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700",
                },
            }}
            {...props}
        />
    );
}

export { toast } from "sonner";
