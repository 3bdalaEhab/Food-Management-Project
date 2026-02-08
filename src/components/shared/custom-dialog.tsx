import * as React from "react";
import { Dialog, DialogContent as RadixDialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
    showClose?: boolean;
    padding?: boolean;
}

const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    full: "max-w-[95vw]",
};

/**
 * CustomDialog - Reusable dialog wrapper with consistent styling
 * Automatically applies transparent background, removes borders, and centers content
 * Perfect for custom form dialogs with their own styling
 */
export function CustomDialog({
    children,
    open,
    onOpenChange,
    maxWidth = "xl",
    showClose = false,
}: CustomDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <RadixDialogContent
                showClose={showClose}
                className={cn(
                    maxWidthClasses[maxWidth],
                    "bg-transparent border-none p-0 overflow-visible shadow-none"
                )}
            >
                {children}
            </RadixDialogContent>
        </Dialog>
    );
}
