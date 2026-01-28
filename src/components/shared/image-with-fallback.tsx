import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export const ImageWithFallback = ({
    src,
    alt,
    className,
    fallbackSrc = "/assets/images/placeholder-industrial.png",
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
        setIsLoading(true);
    }, [src]);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className={cn("relative overflow-hidden bg-[var(--muted)]", className)}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--sidebar-background)]"
                    >
                        <div className="w-full h-full animate-pulse bg-white/5" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={imgSrc}
                alt={alt}
                onError={handleError}
                onLoad={handleLoad}
                className={cn("w-full h-full object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
                {...props as any}
            />

            {hasError && fallbackSrc === imgSrc && (
                <div className="absolute bottom-2 end-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold tracking-widest text-white/50 pointer-events-none">
                    NO_SIGNAL
                </div>
            )}
        </div>
    );
};
