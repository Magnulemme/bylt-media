import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll } from 'framer-motion';

const DEBUG = true;
const log = (...args) => DEBUG && console.log('🎯 [useScrollProgress]', ...args);

/**
 * Hook per gestire l'animazione scroll verticale con inizializzazione corretta.
 * Risolve il problema di Framer Motion useScroll che a volte non si attiva
 * fino al primo evento di scroll.
 *
 * Pattern condiviso con useScrollAnimation per garantire comportamento consistente.
 */
export const useScrollProgress = (isMobile = true) => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Debug: monitora scrollYProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      // Log solo ogni 10% per non intasare la console
      if (Math.round(value * 100) % 10 === 0) {
        log('scrollYProgress:', value.toFixed(2));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Inizializzazione con delay (più lungo su mobile)
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

        // Warning se position è static
        if (style.position === 'static') {
          console.warn('⚠️ [useScrollProgress] Container ha position:static! Framer Motion richiede relative/absolute/fixed');
        }
      } else {
        console.error('❌ [useScrollProgress] containerRef.current è null!');
      }

      setIsReady(true);
      log('isReady = true');

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
  }, [isMobile]);

  // Forza ricalcolo dopo resize per mantenere sincronizzazione
  const forceRecalc = useCallback(() => {
    if (!containerRef.current) return;
    log('Resize - forzo ricalcolo');

    // Micro-scroll per forzare ricalcolo Framer Motion
    const currentScroll = window.scrollY;
    window.scrollTo({ top: currentScroll + 1, behavior: 'instant' });
    window.scrollTo({ top: currentScroll, behavior: 'instant' });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', forceRecalc);
    return () => window.removeEventListener('resize', forceRecalc);
  }, [forceRecalc]);

  return {
    containerRef,
    scrollYProgress,
    isReady
  };
};
