"use client";

import { useState, useEffect, useMemo } from 'react';

// DEBUG MODE: impostare a true per vedere l'animazione in loop
const DEBUG_LOOP = false;
const DEBUG_DURATION = 3000; // durata prima dell'effetto finale

// Griglia per effetto scacchiera
const GRID_COLS = 12;
const GRID_ROWS = 8;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Genera delay casuali per ogni cella della griglia (una sola volta)
  const cellDelays = useMemo(() => {
    const delays: number[] = [];
    for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
      delays.push(Math.random() * 600); // delay casuale 0-600ms
    }
    return delays;
  }, []);

  // Aspetta che il browser abbia renderizzato prima di iniziare l'animazione
  useEffect(() => {
    // Doppio requestAnimationFrame per assicurarsi che il paint sia avvenuto
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setHasEntered(true);
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, []);

  useEffect(() => {
    if (DEBUG_LOOP) {
      const timer = setTimeout(() => {
        setIsReady(true);

        setTimeout(() => {
          setIsFading(true);

          setTimeout(() => {
            setIsReady(false);
            setIsFading(false);
            setHasEntered(false);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setHasEntered(true));
            });
          }, 1000);
        }, 800);
      }, DEBUG_DURATION);

      return () => clearTimeout(timer);
    }

    let hasTriggered = false;

    const triggerFinal = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      setIsReady(true);

      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsVisible(false), 1000);
      }, 800);
    };

    window.addEventListener('hero-ready', triggerFinal);
    const timeout = setTimeout(triggerFinal, 8000);

    return () => {
      window.removeEventListener('hero-ready', triggerFinal);
      clearTimeout(timeout);
    };
  }, [isReady, isFading]);

  if (!isVisible) return null;

  const letters = ['B', 'Y', 'L', 'T'];
  const radius = 140;
  const staggerDelay = 150; // delay tra ogni lettera

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
    >
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
              transition: `opacity 300ms ease-out`,
              transitionDelay: isFading ? `${cellDelays[i]}ms` : '0ms',
            }}
          />
        ))}
      </div>

      {/* Rotating circle container */}
      <div
        className="relative"
        style={{
          width: radius * 2 + 60,
          height: radius * 2 + 60,
          animation: isReady ? 'none' : 'spin-slow 3s linear infinite',
          opacity: isFading ? 0 : 1,
          transition: 'opacity 400ms ease-out',
        }}
      >
        {letters.map((letter, i) => {
          const angle = (i / letters.length) * 360 - 90;
          const letterSpacing = 80;
          const totalWidth = (letters.length - 1) * letterSpacing;
          const lineX = (i * letterSpacing) - (totalWidth / 2);
          const entryDelay = i * staggerDelay;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: isReady
                  ? `translate3d(${lineX}px, -50%, 0)`
                  : `rotate(${angle + 90}deg) translate3d(0, -${radius}px, 0)`,
                opacity: hasEntered ? 1 : 0,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease-out`,
                transitionDelay: `${entryDelay}ms`,
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              <span
                className="block text-7xl md:text-8xl lg:text-9xl font-bold font-inter"
                style={{
                  transform: isReady
                    ? 'translate3d(-50%, 0, 0)'
                    : `translate3d(-50%, 0, 0) rotate(-${angle + 90}deg)`,
                  background: 'linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)',
                  backgroundSize: '400% 100%',
                  backgroundPosition: `${(i / (letters.length - 1)) * 100}% 0`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: isReady ? 'none' : 'counter-spin 3s linear infinite',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                {letter}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
