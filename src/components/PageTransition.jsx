"use client";

import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

/**
 * Gestisce solo il flag isFirstLoad per lo SplashScreen.
 * Nessun overlay - lascia che Next.js gestisca le transizioni naturalmente.
 */
export default function PageTransition({ children }) {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const handleHeroReady = () => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
    };

    window.addEventListener('hero-ready', handleHeroReady);

    return () => {
      window.removeEventListener('hero-ready', handleHeroReady);
    };
  }, []);

  return children;
}
