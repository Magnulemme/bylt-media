import { useState, useEffect, useCallback } from 'react';

/**
 * Hook per calcolare la posizione sticky per centrare le card e
 * determinare se c'è spazio per il titolo sotto
 */
export const useCardCentering = (contentRef, cardHeight) => {
  const [showText, setShowText] = useState(true);
  const [stickyTop, setStickyTop] = useState('50dvh');

  // Prima fase: determina se mostrare il testo (basato su stime)
  const calculateShowText = useCallback(() => {
    if (!cardHeight) return true;

    const viewportHeight = window.innerHeight;

    // Stima altezza testo + margini
    const textHeight = window.innerWidth >= 1024 ? 160 : 140;
    const marginTop = 48;
    const totalHeightWithText = cardHeight + marginTop + textHeight;
    const availableHeight = viewportHeight - 64;

    return totalHeightWithText <= availableHeight;
  }, [cardHeight]);

  // Seconda fase: calcola stickyTop basandosi sull'altezza reale del contenuto
  const calculateStickyTop = useCallback(() => {
    if (!contentRef?.current) return;

    const viewportHeight = window.innerHeight;
    const contentHeight = contentRef.current.offsetHeight;

    // Centra il contenuto effettivo
    const calculatedTop = Math.max(0, (viewportHeight - contentHeight) / 2);
    setStickyTop(`${calculatedTop}px`);
  }, [contentRef]);

  // Determina showText
  useEffect(() => {
    if (cardHeight) {
      const shouldShowText = calculateShowText();
      setShowText(shouldShowText);
    }
  }, [cardHeight, calculateShowText]);

  // Dopo che showText è stato impostato e il DOM aggiornato, calcola stickyTop
  useEffect(() => {
    if (cardHeight) {
      // Delay per aspettare che il DOM si aggiorni dopo il cambio di showText
      const timer = setTimeout(calculateStickyTop, 100);
      window.addEventListener('resize', calculateStickyTop);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculateStickyTop);
      };
    }
  }, [cardHeight, showText, calculateStickyTop]);

  // Also return numeric value for calculations
  const stickyTopNumeric = parseFloat(stickyTop) || 0;

  return { showText, stickyTop, stickyTopNumeric };
};
