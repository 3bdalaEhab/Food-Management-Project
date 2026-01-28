import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { DashboardBackground } from "./dashboard-background";
import { CommandPalette } from "./command-palette";
import { MobileDrawer } from "./mobile-drawer";
import { PageWrapper } from "../shared/page-wrapper";

export function DashboardLayout() {
    const location = useLocation();
    const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);

    return (
        <div className="relative min-h-screen bg-neutral-50 dark:bg-[#050505] selection:bg-primary-500/30">
            {/* Cinematic Layer */}
            <DashboardBackground />

            {/* Sidebar Control Layer */}
            <Sidebar />

            {/* Master Content Orchestrator */}
            <motion.main
                initial={false}
                animate={{
                    paddingInlineStart: sidebarCollapsed ? "80px" : "280px",
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className="relative min-h-screen z-10"
            >
                {/* Fixed Top Interface */}
                <div className="sticky top-0 z-30 px-6 py-4">
                    <Navbar />
                </div>

                {/* Scoping the Viewport for Content */}
                <div className="px-6 pb-12 pt-4">
                    <AnimatePresence mode="wait">
                        <PageWrapper key={location.pathname}>
                            <Outlet />
                        </PageWrapper>
                    </AnimatePresence>
                </div>
            </motion.main>

            {/* Subtle Vignette for Cinema Experience */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] z-40" />

            {/* Global Command Center */}
            <CommandPalette />

            {/* Mobile Navigation Console */}
            <MobileDrawer />
        </div>
    );
}
