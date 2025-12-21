import { useState, useEffect, useCallback } from 'react';

/**
 * Hook per calcolare l'altezza ottimale delle card desktop
 * Decide se mostrare o meno il testo in base allo spazio disponibile
 */
export const useCardHeight = () => {
  const [cardHeight, setCardHeight] = useState('auto');
  const [showText, setShowText] = useState(true);

  const calculateHeight = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const stickyHeight = viewportHeight * 0.8; // 80vh

    // Spazio per testo + margini
    const textHeight = window.innerWidth >= 1024 ? 140 : 120;
    const marginTop = 64;

    // Altezza disponibile con il testo
    const availableWithText = stickyHeight - textHeight - marginTop;
    const minHeight = 300;

    if (availableWithText < minHeight) {
      // Non c'è abbastanza spazio, nascondi il testo
      setShowText(false);
      const availableHeight = stickyHeight - 32;
      const maxHeight = 500;
      const finalHeight = Math.min(Math.max(availableHeight, minHeight), maxHeight);
      setCardHeight(`${finalHeight}px`);
    } else {
      // C'è spazio, mostra il testo
      setShowText(true);
      const maxHeight = 500;
      const finalHeight = Math.min(Math.max(availableWithText, minHeight), maxHeight);
      setCardHeight(`${finalHeight}px`);
    }
  }, []);

  useEffect(() => {
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [calculateHeight]);

  return { cardHeight, showText };
};
