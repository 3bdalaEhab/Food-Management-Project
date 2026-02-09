import { motion, Easing } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20, // Reduced from 30 for subtleties
        scale: 0.98, // Reduced scale change
        filter: "blur(4px)" // Add slight blur on enter for smoothness
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.5, // Reduced from 0.9s
            ease: [0.25, 1, 0.5, 1] as Easing, // Snappier cubic-bezier
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        y: -10, // Reduced movement
        scale: 0.99,
        filter: "blur(2px)",
        transition: {
            duration: 0.3, // Reduced from 0.5s for quick exit
            ease: [0.7, 0, 0.84, 0] as Easing
        }
    }
};

export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full h-full perspective-[1000px]" // 3D Context
        >
            {children}
        </motion.div>
    );
}

export const staggeredItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as Easing
        }
    }
};
