import { useState, useEffect, useRef } from 'react';

/**
 * Hook for animating numbers with count-up effect
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} start - Whether to start animation
 * @returns {number} Current animated value
 */
export const useCountUp = (end, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!start) {
            setCount(0);
            return;
        }

        startTimeRef.current = null;

        const animate = (currentTime) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(end * easeOutQuart));

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [end, duration, start]);

    return count;
};
