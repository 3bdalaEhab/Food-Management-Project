import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
    const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <motion.main
                initial={false}
                animate={{
                    marginLeft: sidebarCollapsed ? 80 : 280,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "min-h-screen",
                    "transition-all duration-300"
                )}
            >
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <div className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </motion.main>
        </div>
    );
}
