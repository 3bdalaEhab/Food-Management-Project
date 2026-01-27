import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            position="top-center"
            expand={true}
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl dark:group-[.toaster]:bg-neutral-900 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-neutral-800",
                    title: "group-[.toast]:font-semibold",
                    description: "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400",
                    actionButton:
                        "group-[.toast]:bg-primary-500 group-[.toast]:text-white group-[.toast]:rounded-lg",
                    cancelButton:
                        "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 group-[.toast]:rounded-lg",
                    closeButton:
                        "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 group-[.toast]:border-neutral-200 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400 dark:group-[.toast]:border-neutral-700",
                },
            }}
            {...props}
        />
    );
}

export { toast } from "sonner";
