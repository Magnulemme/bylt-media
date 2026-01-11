"use client";

import { useState, useEffect } from 'react';

/**
 * Splash Screen che si nasconde quando lo shader background è pronto.
 * Ascolta l'evento 'standalone-renderer-ready' emesso da ShaderBackgroundStandalone.
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let hasTriggered = false;

    const handleReady = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      // Inizia fade out
      setIsFading(true);
      // Rimuovi dopo l'animazione
      setTimeout(() => setIsVisible(false), 500);
    };

    // Ascolta evento specifico dalla Hero
    window.addEventListener('hero-ready', handleReady);

    // Timeout fallback: 8 secondi (solo emergenza, normalmente l'evento arriva prima)
    const timeout = setTimeout(handleReady, 8000);

    return () => {
      window.removeEventListener('hero-ready', handleReady);
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
