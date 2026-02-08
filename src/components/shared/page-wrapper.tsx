import { motion, Easing } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 30, // Increased movement for dramatic entry
        scale: 0.96, // Subtle depth
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as Easing, // Industrial-grade quint ease
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.5,
            ease: [0.7, 0, 0.84, 0] as Easing // Sharp exit
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
