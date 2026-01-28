import { motion, Easing } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: "blur(10px)"
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as Easing, // Industrial-grade quint ease
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        filter: "blur(5px)",
        transition: {
            duration: 0.4,
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
            className="w-full h-full"
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
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as Easing
        }
    }
};
