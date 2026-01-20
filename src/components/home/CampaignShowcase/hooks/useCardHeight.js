import { useState, useEffect, useCallback } from 'react';

/**
 * Hook per calcolare l'altezza ottimale delle immagini e il top per centrare
 * Decide se mostrare o meno il testo in base allo spazio disponibile
 */
export const useCardHeight = (contentRef) => {
  const [cardHeight, setCardHeight] = useState('auto');
  const [showText, setShowText] = useState(true);
  const [stickyTop, setStickyTop] = useState('0');

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

  // Calcola stickyTop dopo che cardHeight è stato applicato
  const calculateTop = useCallback(() => {
    if (contentRef?.current) {
      const viewportHeight = window.innerHeight;
      const contentHeight = contentRef.current.offsetHeight;
      const calculatedTop = Math.max(0, (viewportHeight - contentHeight) / 2);
      setStickyTop(`${calculatedTop}px`);
    }
  }, [contentRef]);

  useEffect(() => {
    // Delay per aspettare che il DOM sia pronto
    const timer = setTimeout(calculateHeight, 100);

    window.addEventListener('resize', calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateHeight);
    };
  }, [calculateHeight]);

  // Ricalcola stickyTop quando cardHeight cambia
  useEffect(() => {
    if (cardHeight !== 'auto') {
      // Piccolo delay per aspettare che il DOM si aggiorni
      const timer = setTimeout(calculateTop, 50);
      window.addEventListener('resize', calculateTop);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculateTop);
      };
    }
  }, [cardHeight, calculateTop]);

  return { cardHeight, showText, stickyTop };
};
