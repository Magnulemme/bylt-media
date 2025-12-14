import { useState, useEffect } from 'react';

/**
 * Hook to detect viewport size and conditionally render components
 * Prevents mounting heavy components on mobile
 */
export default function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if window is defined (client-side)
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Create listener
        const listener = (e) => setMatches(e.matches);

        // Modern browsers
        if (media.addEventListener) {
            media.addEventListener('change', listener);
        } else {
            // Fallback for older browsers
            media.addListener(listener);
        }

        // Cleanup
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', listener);
            } else {
                media.removeListener(listener);
            }
        };
    }, [query]);

    // Return false on server-side and before mount to prevent hydration mismatch
    return mounted ? matches : false;
}
