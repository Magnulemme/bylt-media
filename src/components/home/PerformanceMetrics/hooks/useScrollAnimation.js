import { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionValue, useScroll } from 'framer-motion';

/**
 * Hook per gestire l'animazione scroll delle card
 * Gestisce sia desktop che mobile con logiche separate
 */
export const useScrollAnimation = (isMobile = false) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [scrollableDistance, setScrollableDistance] = useState(0);
  const scrollableDistanceRef = useRef(0); // Ref per mantenere il valore aggiornato senza ricreare il listener
  const [isAtStart, setIsAtStart] = useState(true); // Sempre inizia a sinistra
  const [isAtEnd, setIsAtEnd] = useState(false);

  const x = useMotionValue(0);

  // Progress dello scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calcola quanto possiamo scrollare
  const calculateScrollableDistance = useCallback(() => {
    if (!cardsRef.current || !wrapperRef.current) return;

    const cardsWidth = cardsRef.current.scrollWidth;
    // Usa sempre il wrapper width per avere lo spazio reale disponibile
    const visibleWidth = wrapperRef.current.clientWidth;
    const distance = cardsWidth - visibleWidth;

    setScrollableDistance(distance);
    scrollableDistanceRef.current = distance;
    x.set(0);
  }, [isMobile, x]);

  // Inizializzazione con delay più lungo per schermi piccoli
  useEffect(() => {
    const delay = isMobile ? 300 : 200;

    const timer = setTimeout(() => {
      calculateScrollableDistance();
      setIsReady(true);

      // Forza un micro-scroll per attivare i calcoli di Framer Motion
      setTimeout(() => {
        if (containerRef.current) {
          const currentScroll = window.scrollY;
          window.scrollTo({ top: currentScroll + 1, behavior: 'instant' });
          window.scrollTo({ top: currentScroll, behavior: 'instant' });
        }
      }, 50);
    }, delay);

    return () => clearTimeout(timer);
  }, [calculateScrollableDistance, isMobile, containerRef]);

  // Forza un secondo ricalcolo dopo l'inizializzazione
  useEffect(() => {
    if (!isReady) return;

    const recalcTimer = setTimeout(() => {
      calculateScrollableDistance();
    }, 200);

    return () => clearTimeout(recalcTimer);
  }, [isReady, calculateScrollableDistance]);

  // Ricalcola su resize
  useEffect(() => {
    window.addEventListener('resize', calculateScrollableDistance);
    return () => window.removeEventListener('resize', calculateScrollableDistance);
  }, [calculateScrollableDistance]);

  // ResizeObserver per rilevare cambiamenti nel DOM
  useEffect(() => {
    if (!cardsRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateScrollableDistance();
    });

    resizeObserver.observe(cardsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateScrollableDistance, isReady]);

  // Sincronizza scroll con movimento
  useEffect(() => {
    if (!isReady || scrollableDistanceRef.current === 0) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const currentDistance = scrollableDistanceRef.current;
      const newX = -currentDistance * progress;
      x.set(newX);
      setIsAtStart(progress < 0.02);
      setIsAtEnd(progress > 0.98);
    });

    return () => unsubscribe();
  }, [isReady, scrollYProgress, x, isMobile, scrollableDistance]);

  return {
    containerRef,
    cardsRef,
    wrapperRef,
    x,
    isReady,
    isAtStart,
    isAtEnd,
    scrollYProgress  // ← AGGIUNTO: espone il progress per i componenti figli
  };
};