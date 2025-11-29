// Utility to load CSS asynchronously
export const loadCSS = (href) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = function() {
    this.media = 'all';
  };
  
  // Fallback for browsers that don't support onload
  setTimeout(() => {
    link.media = 'all';
  }, 3000);
  
  document.head.appendChild(link);
};

// Load non-critical styles after page load
export const loadNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;
  
  // Wait for page load before loading non-critical styles
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(loadNonCriticalStyles, 100);
    });
  } else {
    setTimeout(loadNonCriticalStyles, 100);
  }
};

const loadNonCriticalStyles = () => {
  // Create style element for remaining global styles
  const style = document.createElement('style');
  style.textContent = `
    /* Non-critical CSS loaded asynchronously */
    .quantum-anim {
      opacity: 0;
      transform: translate3d(0, 60px, 0);
      transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
      will-change: transform, opacity;
      contain: layout style paint;
    }
    .quantum-anim.quantum-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    .quantum-button, .quantum-button-mobile {
      position: relative; display: inline-flex; align-items: center; justify-content: center;
      padding: 12px 24px; font-weight: 600; color: white;
      background: #374151;
      border: 1px solid #4b5563; border-radius: 8px; font-family: 'Inter', sans-serif;
      text-decoration: none; overflow: hidden; transition: all 0.3s ease; cursor: pointer;
    }
    .quantum-button:hover { 
      background: #B8FFFA; 
      color: #1e293b; 
      transform: translate3d(0, -2px, 0);
      border-color: #B8FFFA; 
    }

    .hologram-button {
      position: relative; display: inline-flex; align-items: center; justify-content: center;
      padding: 14px 30px; font-weight: 600; font-size: 18px; color: white;
      background: transparent; border: 2px solid #4b5563; border-radius: 12px;
      font-family: 'Inter', sans-serif; text-decoration: none; overflow: hidden;
      transition: all 0.4s ease; cursor: pointer;
      will-change: transform;
    }
    .hologram-button:hover { 
      background: #374151; 
      border-color: #6b7280; 
      transform: translate3d(0, -2px, 0);
    }

    .hero-overlay-1 {
      background: linear-gradient(
        135deg,
        rgba(15, 23, 42, 0.1) 0%,
        rgba(30, 41, 59, 0.05) 50%,
        rgba(15, 23, 42, 0.1) 100%
      );
      backdrop-filter: blur(1px);
    }

    .hero-cta { 
      animation: heroCtaFloat 2s ease-out 1s both; 
      will-change: transform, opacity;
    }
    @keyframes heroCtaFloat {
      from { opacity: 0; transform: translate3d(0, 30px, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }

    .quantum-scroll-indicator {
      width: 30px; height: 50px;
      border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 15px;
      position: relative;
      will-change: transform;
      contain: layout style paint;
    }
    .scroll-quantum-dot {
      width: 6px; height: 6px; background: white; border-radius: 50%;
      position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
      animation: quantumScrollDot 2s ease-in-out infinite;
      will-change: transform, opacity;
    }
    @keyframes quantumScrollDot {
      0% { top: 8px; opacity: 1; }
      50% { top: 30px; opacity: 1; }
      100% { top: 30px; opacity: 0; }
    }

    .section-title-enhanced {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.75rem, 4vw, 3rem);
      font-weight: 900;
      color: white;
      margin: 0;
      position: relative;
      background: linear-gradient(135deg, #B8FFFA 0%, #B8FFB8 25%, #B8FFFA 50%, #B8FFB8 75%, #B8FFFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 40px rgba(184, 255, 225, 0.4);
      letter-spacing: -0.02em;
      line-height: 1.1;
      background-size: 200% 100%;
      animation: titleGlow 4s ease-in-out infinite alternate, gradientShift 6s ease-in-out infinite;
      will-change: transform, opacity;
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes titleGlow {
      0% { 
        text-shadow: 0 0 20px rgba(184, 255, 250, 0.3);
        filter: brightness(1);
      }
      100% { 
        text-shadow: 0 0 30px rgba(184, 255, 250, 0.5);
        filter: brightness(1.1);
      }
    }
  `;
  
  document.head.appendChild(style);
};
