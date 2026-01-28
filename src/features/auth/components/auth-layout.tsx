import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

export function AuthLayout() {
    const location = useLocation();

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[var(--background)]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // Cinematic Quint ease
                    }}
                    className="w-full h-full"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
