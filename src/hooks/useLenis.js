import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export default function useLenis() {
    const rafIdRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisInstance = lenis;

        function raf(time) {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        }

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            // Cancel the animation frame to stop the loop
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    return lenisInstance;
}

export { lenisInstance };
