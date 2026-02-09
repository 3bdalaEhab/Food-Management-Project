import { useState, useEffect } from "react";
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
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden bg-[var(--muted)]", className)}>
            <img
                src={error ? fallbackSrc : src}
                alt={alt}
                onError={() => setError(true)}
                className="w-full h-full object-cover object-center"
                {...props}
            />
        </div>
    );
};
