"use client";

import { useState, useEffect } from 'react';
import { sharedRenderer } from '@/lib/sharedRenderer';

/**
 * Splash Screen che si nasconde quando lo shader background è pronto.
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Controlla periodicamente se il primo render WebGL è avvenuto
    const checkReady = () => {
      const stats = sharedRenderer.getStats();

      // Nascondi quando:
      // 1. Il renderer è attivo
      // 2. Ci sono task visibili renderizzati
      if (stats.isRunning && stats.activeTasks > 0) {
        // Inizia fade out
        setIsFading(true);
        // Rimuovi dopo l'animazione
        setTimeout(() => setIsVisible(false), 500);
        return true;
      }
      return false;
    };

    // Se già pronto, nascondi subito
    if (checkReady()) return;

    // Altrimenti controlla ogni 100ms
    const interval = setInterval(() => {
      if (checkReady()) {
        clearInterval(interval);
      }
    }, 100);

    // Timeout massimo: 5 secondi
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 500);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
      }}
    >
      {/* Logo */}
      <img
        src="/favicon.png"
        alt="BYLT Media"
        width={80}
        height={80}
        className="animate-pulse"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(103, 232, 249, 0.5))',
        }}
      />

      {/* Loading bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full w-2/5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7)',
            animation: 'splash-loading 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes splash-loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
