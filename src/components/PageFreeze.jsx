"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Congela visivamente la pagina corrente durante la navigazione interna.
 * Clona il DOM della pagina prima della navigazione e lo mostra come overlay
 * finché la nuova pagina non è pronta (evento hero-ready).
 */
export default function PageFreeze() {
  const router = useRouter();
  const [frozenHTML, setFrozenHTML] = useState(null);
  const isFirstLoadRef = useRef(true);
  const timeoutRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Non freezare al primo caricamento (lo splash screen lo gestisce)
      if (isFirstLoadRef.current) return;

      // Salva la posizione di scroll corrente
      scrollYRef.current = window.scrollY;

      // Clona l'intero contenuto della pagina
      const appRoot = document.getElementById('__next');
      if (appRoot) {
        // Usa innerHTML per catturare tutto
        setFrozenHTML(appRoot.innerHTML);
      }
    };

    const handleRouteChangeComplete = () => {
      // Timeout fallback: se hero-ready non arriva entro 3s, sblocca comunque
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFrozenHTML(null);
      }, 3000);
    };

    const handleRouteChangeError = () => {
      setFrozenHTML(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleHeroReady = () => {
      // La nuova pagina è pronta, rimuovi il freeze
      setFrozenHTML(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Dopo il primo hero-ready, non è più il primo caricamento
      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    window.addEventListener('hero-ready', handleHeroReady);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      window.removeEventListener('hero-ready', handleHeroReady);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [router]);

  if (!frozenHTML) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        background: '#020617',
        overflow: 'hidden',
      }}
    >
      {/* Clone della pagina precedente, posizionato come se fosse scrollato */}
      <div
        dangerouslySetInnerHTML={{ __html: frozenHTML }}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(-${scrollYRef.current}px)`,
        }}
      />
    </div>
  );
}
