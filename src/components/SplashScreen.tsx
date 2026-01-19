"use client";

import { useState, useEffect, useMemo } from 'react';

// Griglia per effetto scacchiera
const GRID_COLS = 12;
const GRID_ROWS = 8;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  // Genera delay casuali per ogni cella della griglia (una sola volta)
  const cellDelays = useMemo(() => {
    const delays: number[] = [];
    for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
      delays.push(Math.random() * 600);
    }
    return delays;
  }, []);

  // Aspetta che il browser abbia renderizzato prima di iniziare l'animazione
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setHasEntered(true);

        // Segna animazione completa dopo che tutte le lettere sono entrate
        // 4 lettere * 150ms stagger + 600ms transizione = ~1050ms
        const animTimer = setTimeout(() => {
          setAnimationComplete(true);
        }, 1100);

        return () => clearTimeout(animTimer);
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, []);

  // Ascolta hero-ready event
  useEffect(() => {
    const onHeroReady = () => setHeroReady(true);
    window.addEventListener('hero-ready', onHeroReady);
    const timeout = setTimeout(onHeroReady, 8000);

    return () => {
      window.removeEventListener('hero-ready', onHeroReady);
      clearTimeout(timeout);
    };
  }, []);

  // Trigger finale solo quando ENTRAMBE le condizioni sono vere
  useEffect(() => {
    if (!animationComplete || !heroReady) return;

    // Piccola pausa per far apprezzare il logo completo
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 1000);
    }, 600);
  }, [animationComplete, heroReady]);

  if (!isVisible) return null;

  const letters = ['B', 'Y', 'L', 'T'];
  const letterSpacing = 80;
  const totalWidth = (letters.length - 1) * letterSpacing;
  const staggerDelay = 150;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Griglia scacchiera per dissolvenza */}
      <div className="absolute inset-0 grid pointer-events-none" style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}>
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
          <div
            key={i}
            style={{
              background: '#020617',
              opacity: isFading ? 0 : 1,
              transition: 'opacity 300ms ease-out',
              transitionDelay: isFading ? `${cellDelays[i]}ms` : '0ms',
            }}
          />
        ))}
      </div>

      {/* Letters container - simple fade in */}
      <div
        className="relative flex items-center justify-center"
        style={{
          opacity: isFading ? 0 : 1,
          transition: 'opacity 400ms ease-out',
        }}
      >
        {letters.map((letter, i) => {
          const lineX = (i * letterSpacing) - (totalWidth / 2);
          const entryDelay = i * staggerDelay;

          return (
            <span
              key={i}
              className="absolute text-7xl md:text-8xl lg:text-9xl font-bold font-inter"
              style={{
                left: '50%',
                transform: `translateX(calc(-50% + ${lineX}px))`,
                opacity: hasEntered ? 1 : 0,
                filter: hasEntered ? 'blur(0px)' : 'blur(8px)',
                transition: 'opacity 600ms ease-out, filter 600ms ease-out',
                transitionDelay: `${entryDelay}ms`,
                background: 'linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)',
                backgroundSize: '400% 100%',
                backgroundPosition: `${(i / (letters.length - 1)) * 100}% 0`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}
