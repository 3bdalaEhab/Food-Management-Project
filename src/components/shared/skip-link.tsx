import { useState } from 'react';

/**
 * Skip to main content link for keyboard accessibility
 * This link becomes visible when focused, allowing keyboard users to skip navigation
 */
export function SkipLink() {
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = () => {
        const main = document.querySelector('main') || document.getElementById('main-content');
        if (main) {
            main.setAttribute('tabindex', '-1');
            main.focus();
            main.removeAttribute('tabindex');
        }
    };

    return (
        <a
            href="#main-content"
            onClick={(e) => {
                e.preventDefault();
                handleClick();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
                fixed top-4 left-4 z-[9999] px-6 py-3 
                bg-primary-500 text-white font-bold rounded-xl 
                shadow-lg shadow-primary-500/30 
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
                ${isFocused
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0 pointer-events-none'
                }
            `}
        >
            Skip to main content
        </a>
    );
}

/**
 * Visually hidden component for screen readers
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span className="sr-only">
            {children}
        </span>
    );
}
