import { useState, useEffect, useCallback } from 'react';

/**
 * Hook per determinare se mostrare il testo sotto le card
 * basandosi sulle dimensioni reali del DOM (non stime)
 *
 * @param {React.RefObject} cardRef - Ref alle card
 * @param {React.RefObject} textRef - Ref al testo da mostrare/nascondere
 * @param {number} minMargin - Margine minimo richiesto (default 200px)
 */
export const useShowText = (cardRef, textRef, minMargin = 200) => {
  const [showText, setShowText] = useState(true);

  const calculateShowText = useCallback(() => {
    if (!cardRef?.current || !textRef?.current) return;

    const viewportHeight = window.innerHeight;
    const cardHeight = cardRef.current.offsetHeight;
    const textHeight = textRef.current.offsetHeight;

    // Calcola altezza totale necessaria: card + testo + margine minimo
    const totalHeight = cardHeight + textHeight + minMargin;

    // Se c'è spazio sufficiente, mostra il testo dentro sticky
    // Altrimenti nascondilo (verrà mostrato fuori dalla sticky section)
    const shouldShow = totalHeight <= viewportHeight;

    setShowText(shouldShow);
  }, [cardRef, textRef, minMargin]);

  useEffect(() => {
    // Aspetta che il DOM sia pronto
    const timer = setTimeout(calculateShowText, 100);

    window.addEventListener('resize', calculateShowText);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateShowText);
    };
  }, [calculateShowText]);

  return showText;
};
