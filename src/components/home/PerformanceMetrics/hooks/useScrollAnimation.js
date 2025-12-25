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
    // Usa sempre il wrapper width per avere lo spazio reale disponibile
    const visibleWidth = wrapperRef.current.clientWidth;
    const distance = cardsWidth - visibleWidth;

    // DEBUG: Log dei calcoli
    console.log('🔧 [SCROLL DEBUG] Calcolo dimensioni:', {
      cardsWidth,
      visibleWidth,
      scrollableDistance: distance,
      windowWidth: window.innerWidth,
      isMobile,
      timestamp: new Date().toLocaleTimeString()
    });

    setScrollableDistance(distance);
    scrollableDistanceRef.current = distance; // Aggiorna il ref

    // Posizione iniziale
    if (isMobile) {
      // Mobile: inizia dall'ultima card (destra)
      x.set(-distance);
      console.log('📱 [MOBILE] Posizione iniziale:', -distance);
    } else {
      // Desktop: inizia dalla prima card (sinistra)
      x.set(0);
      console.log('💻 [DESKTOP] Posizione iniziale:', 0);
    }
  }, [isMobile, x]);

  // Inizializzazione con delay più lungo per schermi piccoli
  useEffect(() => {
    // Delay più lungo per dare tempo alle media queries CSS di applicarsi
    const delay = isMobile ? 300 : 200;

    console.log(`⏱️ [INIT] Inizializzazione con delay ${delay}ms (${isMobile ? 'MOBILE' : 'DESKTOP'})`);

    const timer = setTimeout(() => {
      console.log('✅ [INIT] Primo calcolo dimensioni');
      calculateScrollableDistance();
      setIsReady(true);

      // Forza un micro-scroll per attivare i calcoli di Framer Motion
      // Questo risolve il problema del primo render
      setTimeout(() => {
        if (containerRef.current) {
          const currentScroll = window.scrollY;
          window.scrollTo({ top: currentScroll + 1, behavior: 'instant' });
          window.scrollTo({ top: currentScroll, behavior: 'instant' });
          console.log('🔄 [INIT] Micro-scroll forzato per attivare Framer Motion');
        }
      }, 50);
    }, delay);

    return () => clearTimeout(timer);
  }, [calculateScrollableDistance, isMobile, containerRef]);

  // Forza un secondo ricalcolo dopo l'inizializzazione
  // Questo assicura che le card abbiano avuto tempo di renderizzarsi completamente
  useEffect(() => {
    if (!isReady) return;

    console.log('🔄 [RECALC] Secondo ricalcolo tra 200ms...');

    const recalcTimer = setTimeout(() => {
      console.log('✅ [RECALC] Eseguo secondo calcolo dimensioni');
      calculateScrollableDistance();
    }, 200);

    return () => clearTimeout(recalcTimer);
  }, [isReady, calculateScrollableDistance]);

  // Ricalcola su resize
  useEffect(() => {
    window.addEventListener('resize', calculateScrollableDistance);
    return () => window.removeEventListener('resize', calculateScrollableDistance);
  }, [calculateScrollableDistance]);

  // ResizeObserver per rilevare cambiamenti nel DOM (es. card nascoste da media queries)
  useEffect(() => {
    if (!cardsRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // Ricalcola quando le dimensioni del container delle card cambiano
      // (es. quando le card opzionali vengono nascoste dalle media queries)
      const entry = entries[0];
      console.log('👁️ [RESIZE OBSERVER] Rilevato cambio dimensioni:', {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        isReady
      });

      // Ricalcola sempre, anche prima che isReady sia true
      // Questo cattura i cambiamenti durante il rendering iniziale
      calculateScrollableDistance();
    });

    resizeObserver.observe(cardsRef.current);
    console.log('👁️ [RESIZE OBSERVER] Attivato');

    return () => {
      resizeObserver.disconnect();
      console.log('👁️ [RESIZE OBSERVER] Disattivato');
    };
  }, [calculateScrollableDistance, isReady]);

  // Sincronizza scroll con movimento
  useEffect(() => {
    if (!isReady) {
      console.log('⏸️ [SCROLL SYNC] Skipping - not ready');
      return;
    }

    if (scrollableDistanceRef.current === 0) {
      console.log('⏸️ [SCROLL SYNC] Skipping - distance is 0');
      return;
    }

    console.log('🎯 [SCROLL SYNC] Creazione listener con distance:', scrollableDistanceRef.current);

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Usa il ref per avere sempre il valore più aggiornato senza ricreare il listener
      const currentDistance = scrollableDistanceRef.current;
      let newX;

      if (isMobile) {
        // Mobile: scroll verso sinistra (da destra a sinistra)
        // progress 0 = ultima card (-distance)
        // progress 1 = prima card (0)
        newX = -currentDistance * (1 - progress);
      } else {
        // Desktop: scroll verso destra (da sinistra a destra)
        // progress 0 = prima card (0)
        // progress 1 = ultima card (-distance)
        newX = -currentDistance * progress;
      }

      x.set(newX);

      // Log più dettagliato per debug
      if (progress === 0 || progress === 1 || Math.abs(progress - 0.5) < 0.01) {
        console.log('📊 [SCROLL] Progress:', {
          progress: progress.toFixed(3),
          newX: newX.toFixed(2),
          currentDistance,
          expectedAtEnd: -currentDistance,
          diff: Math.abs(newX - (-currentDistance * progress))
        });
      }

      // Aggiorna stati posizione
      if (isMobile) {
        setIsAtStart(progress > 0.98);
        setIsAtEnd(progress < 0.02);
      } else {
        setIsAtStart(progress < 0.02);
        setIsAtEnd(progress > 0.98);
      }
    });

    return () => {
      console.log('🔌 [SCROLL SYNC] Listener disconnesso');
      unsubscribe();
    };
  }, [isReady, scrollYProgress, x, isMobile]);

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