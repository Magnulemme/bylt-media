import { useRef, useEffect } from 'react';

// Optimized Custom Hook for Advanced Scroll Animations with debouncing
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleIntersection = ([entry]) => {
            if (entry.isIntersecting) {
                // Cancel any pending animation frame
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }

                // Use requestAnimationFrame for smooth animations
                animationFrameRef.current = requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (element) {
                            element.classList.add('quantum-visible');
                        }
                    }, delay);
                });
                observer.unobserve(element);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin: '10px' // Preload animations slightly before they're visible
        });

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [ref, threshold, delay]);

    return ref;
};

export default useQuantumScrollAnim;
