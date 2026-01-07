import { useRef, useEffect } from 'react';

// Optimized Custom Hook for Advanced Scroll Animations with debouncing
const useQuantumScrollAnim = (threshold = 0.01, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleIntersection = ([entry]) => {
            console.log('🔍 IntersectionObserver trigger:', {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
                boundingClientRect: {
                    top: entry.boundingClientRect.top,
                    bottom: entry.boundingClientRect.bottom,
                    height: entry.boundingClientRect.height
                },
                target: entry.target.className,
                viewportHeight: window.innerHeight
            });

            if (entry.isIntersecting) {
                console.log('✅ Adding quantum-visible class to:', entry.target.className);
                // Cancel any pending animation frame
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }

                // Use requestAnimationFrame for smooth animations
                animationFrameRef.current = requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (element) {
                            element.classList.add('quantum-visible');
                            console.log('✨ quantum-visible added!');
                        }
                    }, delay);
                });
                observer.unobserve(element);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin: '200px 0px' // Trigger animation 200px before element enters viewport
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
