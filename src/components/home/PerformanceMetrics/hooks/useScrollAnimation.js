import { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionValue, useScroll } from 'framer-motion';

const DEBUG = true;
const log = (...args) => DEBUG && console.log('🔄 [useScrollAnimation]', ...args);

/**
 * Hook per gestire l'animazione scroll delle card
 * Gestisce sia desktop che mobile con logiche separate
 * @param {boolean} isMobile - Se true, usa delay più lungo per inizializzazione
 * @param {boolean} reversed - Se true, inverte la direzione dello scroll (da destra a sinistra)
 */
export const useScrollAnimation = (isMobile = false, reversed = false) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const scrollableDistanceRef = useRef(0); // Ref per mantenere il valore aggiornato senza ricreare il listener
  const [scrollableDistance, setScrollableDistance] = useState(0); // State per triggerare re-render quando cambia
  const [isAtStart, setIsAtStart] = useState(true); // Sempre inizia a sinistra
  const [isAtEnd, setIsAtEnd] = useState(false);

  const x = useMotionValue(0);

  // Refs per valori stabili - evita ricreare callback/observers
  const xRef = useRef(x);
  const reversedRef = useRef(reversed);
  xRef.current = x;
  reversedRef.current = reversed;

  // Progress dello scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calcola quanto possiamo scrollare - callback stabile
  const calculateScrollableDistance = useCallback(() => {
    if (!cardsRef.current || !wrapperRef.current) {
      log('calculateScrollableDistance: refs mancanti', {
        cardsRef: !!cardsRef.current,
        wrapperRef: !!wrapperRef.current
      });
      return;
    }

    const cardsWidth = cardsRef.current.scrollWidth;
    // Usa sempre il wrapper width per avere lo spazio reale disponibile
    const visibleWidth = wrapperRef.current.clientWidth;
    const distance = cardsWidth - visibleWidth;

    log('Distanza scrollabile:', { cardsWidth, visibleWidth, distance, reversed: reversedRef.current });
    scrollableDistanceRef.current = distance;
    setScrollableDistance(distance); // Trigger re-render per riattivare il listener

    // Posizione iniziale: reversed inizia a destra, normale a sinistra
    const initialX = reversedRef.current ? -distance : 0;
    xRef.current.set(initialX);
  }, []); // Stabile - usa refs

  // Inizializzazione con delay più lungo per schermi piccoli
  useEffect(() => {
    const delay = isMobile ? 300 : 200;
    log('Inizializzazione...', { isMobile, delay });

    const timer = setTimeout(() => {
      // Verifica container
      if (containerRef.current) {
        const style = window.getComputedStyle(containerRef.current);
        log('Container trovato:', {
          position: style.position,
          height: containerRef.current.offsetHeight,
          rect: containerRef.current.getBoundingClientRect()
        });

        if (style.position === 'static') {
          console.warn('⚠️ [useScrollAnimation] Container ha position:static!');
        }
      } else {
        console.error('❌ [useScrollAnimation] containerRef.current è null!');
      }

      calculateScrollableDistance();
      setIsReady(true);
      log('isReady = true, scrollableDistance =', scrollableDistanceRef.current);

      // Forza un micro-scroll per attivare i calcoli di Framer Motion
      setTimeout(() => {
        if (containerRef.current) {
          const currentScroll = window.scrollY;
          log('Micro-scroll forzato da', currentScroll);
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
    if (!cardsRef.current || !isReady) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateScrollableDistance();
    });

    resizeObserver.observe(cardsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isReady, calculateScrollableDistance]);

  // Refs per tracciare lo stato senza causare re-render
  const isAtStartRef = useRef(true);
  const isAtEndRef = useRef(false);

  // Sincronizza scroll con movimento
  useEffect(() => {
    if (!isReady || scrollableDistance === 0) {
      log('Listener non attivato:', { isReady, distance: scrollableDistance });
      return;
    }

    log('Listener scrollYProgress attivato, distance:', scrollableDistance);

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const currentDistance = scrollableDistanceRef.current;

      // Calcola posizione in base alla direzione
      // Normale: progress 0 → x=0 (sinistra), progress 1 → x=-distance (destra)
      // Reversed: progress 0 → x=-distance (destra), progress 1 → x=0 (sinistra)
      const newX = reversed
        ? -currentDistance * (1 - progress)
        : -currentDistance * progress;
      x.set(newX);

      // Log ogni 10%
      if (Math.round(progress * 100) % 10 === 0) {
        log('scrollYProgress:', progress.toFixed(2), 'x:', newX.toFixed(0), reversed ? '(reversed)' : '');
      }

      // Aggiorna lo stato - invertito per reversed
      const newIsAtStart = reversed ? progress > 0.98 : progress < 0.02;
      const newIsAtEnd = reversed ? progress < 0.02 : progress > 0.98;

      if (isAtStartRef.current !== newIsAtStart) {
        isAtStartRef.current = newIsAtStart;
        setIsAtStart(newIsAtStart);
      }
      if (isAtEndRef.current !== newIsAtEnd) {
        isAtEndRef.current = newIsAtEnd;
        setIsAtEnd(newIsAtEnd);
      }
    });

    return () => unsubscribe();
  }, [isReady, scrollYProgress, x, reversed, scrollableDistance]);

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