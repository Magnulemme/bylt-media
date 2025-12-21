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
  const [isAtStart, setIsAtStart] = useState(!isMobile); // Desktop inizia a sinistra, mobile a destra
  const [isAtEnd, setIsAtEnd] = useState(isMobile);

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
    const visibleWidth = wrapperRef.current.clientWidth;
    const distance = cardsWidth - visibleWidth;

    setScrollableDistance(distance);

    // Posizione iniziale
    if (isMobile) {
      // Mobile: inizia dall'ultima card (destra)
      x.set(-distance);
    } else {
      // Desktop: inizia dalla prima card (sinistra)
      x.set(0);
    }
  }, [isMobile, x]);

  // Inizializzazione
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateScrollableDistance();
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [calculateScrollableDistance]);

  // Ricalcola su resize
  useEffect(() => {
    window.addEventListener('resize', calculateScrollableDistance);
    return () => window.removeEventListener('resize', calculateScrollableDistance);
  }, [calculateScrollableDistance]);

  // Sincronizza scroll con movimento
  useEffect(() => {
    if (!isReady || scrollableDistance === 0) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      let newX;

      if (isMobile) {
        // Mobile: scroll verso sinistra (da destra a sinistra)
        // progress 0 = ultima card (-distance)
        // progress 1 = prima card (0)
        newX = -scrollableDistance * (1 - progress);
      } else {
        // Desktop: scroll verso destra (da sinistra a destra)
        // progress 0 = prima card (0)
        // progress 1 = ultima card (-distance)
        newX = -scrollableDistance * progress;
      }

      x.set(newX);

      // Aggiorna stati posizione
      if (isMobile) {
        setIsAtStart(progress > 0.98);
        setIsAtEnd(progress < 0.02);
      } else {
        setIsAtStart(progress < 0.02);
        setIsAtEnd(progress > 0.98);
      }
    });

    return unsubscribe;
  }, [isReady, scrollableDistance, scrollYProgress, x, isMobile]);

  return {
    containerRef,
    cardsRef,
    wrapperRef,
    x,
    isReady,
    isAtStart,
    isAtEnd
  };
};
