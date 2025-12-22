import { useState, useEffect, useCallback } from 'react';

/**
 * Hook per calcolare il top position per centrare verticalmente le card mobile
 * Formula: (100dvh - cardHeight) / 2
 */
export const useCenteredPosition = (cardRef) => {
  const [topPosition, setTopPosition] = useState('20vh'); // fallback iniziale

  const calculatePosition = useCallback(() => {
    if (!cardRef?.current) return;

    const viewportHeight = window.innerHeight;
    const cardHeight = cardRef.current.offsetHeight;

    // Calcola il top per centrare: (viewport - card) / 2
    const calculatedTop = Math.max(0, (viewportHeight - cardHeight) / 2);

    setTopPosition(`${calculatedTop}px`);
  }, [cardRef]);

  useEffect(() => {
    // Aspetta che il DOM sia pronto
    const timer = setTimeout(calculatePosition, 100);

    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [calculatePosition]);

  return topPosition;
};
