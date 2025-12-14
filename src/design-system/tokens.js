/**
 * BYLT Media Design System - Design Tokens
 *
 * Questo file contiene tutti i token di design del sito:
 * - Spacing (spaziature)
 * - Typography (tipografia)
 * - Colors (colori)
 * - Gradients (gradienti)
 * - Shadows (ombre)
 * - Border Radius (raggi di bordo)
 */

// ============================================
// SPACING SYSTEM
// ============================================
// Sistema basato su multipli di 4px per consistenza
export const spacing = {
  // Base spacing
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px

  // Section spacing (per spacing tra sezioni)
  section: {
    mobile: '4rem',    // 64px
    tablet: '6rem',    // 96px
    desktop: '8rem',   // 128px
  },

  // Container padding
  container: {
    mobile: '1rem',    // 16px
    tablet: '2rem',    // 32px
    desktop: '4rem',   // 64px
  }
};

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================
export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  // Font sizes - Sistema modulare
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1.2' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1.2' }],      // 60px
    '7xl': ['4.5rem', { lineHeight: '1.2' }],       // 72px
    '8xl': ['6rem', { lineHeight: '1.2' }],         // 96px
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Heading presets
  headings: {
    h1: {
      mobile: 'text-5xl',    // 48px
      tablet: 'md:text-7xl', // 72px
      desktop: 'lg:text-8xl', // 96px
      weight: 'font-bold',
    },
    h2: {
      mobile: 'text-4xl',    // 36px
      tablet: 'md:text-5xl', // 48px
      desktop: 'lg:text-6xl', // 60px
      weight: 'font-bold',
    },
    h3: {
      mobile: 'text-3xl',    // 30px
      tablet: 'md:text-4xl', // 36px
      desktop: 'lg:text-5xl', // 48px
      weight: 'font-semibold',
    },
    h4: {
      mobile: 'text-2xl',    // 24px
      tablet: 'md:text-3xl', // 30px
      weight: 'font-semibold',
    },
  }
};

// ============================================
// COLOR SYSTEM
// ============================================
export const colors = {
  // Brand colors
  brand: {
    cyan: {
      light: '#B8FFFA',
      DEFAULT: '#22D3EE',
      dark: '#0891B2',
    },
    blue: {
      light: '#60A5FA',
      DEFAULT: '#3B82F6',
      dark: '#1D4ED8',
    },
    purple: {
      light: '#C084FC',
      DEFAULT: '#A855F7',
      dark: '#7E22CE',
    },
  },

  // Background colors
  background: {
    primary: '#020617',      // Nero profondo
    secondary: '#0f172a',    // Slate 900
    tertiary: '#1e1b4b',     // Indigo 950
    elevated: '#312e81',     // Indigo 900
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: '#9CA3AF',        // Gray 400
  },

  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    DEFAULT: 'rgba(255, 255, 255, 0.2)',
    strong: 'rgba(255, 255, 255, 0.3)',
    accent: 'rgba(34, 211, 238, 0.5)', // cyan
  },

  // Glassmorphism backgrounds
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  }
};

// ============================================
// GRADIENT SYSTEM
// ============================================
export const gradients = {
  // Background gradients
  background: {
    hero: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    dark: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
    purple: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
  },

  // Text gradients
  text: {
    primary: 'linear-gradient(to right, #22D3EE, #3B82F6, #A855F7)',      // cyan → blue → purple
    cyan: 'linear-gradient(to right, #B8FFFA, #22D3EE)',                  // light cyan → cyan
    blue: 'linear-gradient(to right, #60A5FA, #3B82F6)',                  // light blue → blue
    purple: 'linear-gradient(to right, #C084FC, #A855F7)',                // light purple → purple
  },

  // Button gradients
  button: {
    primary: 'linear-gradient(to right, #22D3EE, #3B82F6, #22D3EE)',     // cyan → blue → cyan (animato)
    hover: 'linear-gradient(to right, #0891B2, #1D4ED8, #0891B2)',       // Versione più scura
  },

  // Overlay gradients
  overlay: {
    radialBlue: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%)',
    radialPurple: 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15), transparent 50%)',
    radialCyan: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 70%)',
  }
};

// ============================================
// SHADOW SYSTEM
// ============================================
export const shadows = {
  // Standard shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Colored shadows (per effetti glow)
  glow: {
    cyan: '0 0 20px rgba(34, 211, 238, 0.5)',
    cyanLg: '0 0 40px rgba(34, 211, 238, 0.6)',
    blue: '0 0 20px rgba(59, 130, 246, 0.5)',
    blueLg: '0 0 40px rgba(59, 130, 246, 0.6)',
    purple: '0 0 20px rgba(168, 85, 247, 0.5)',
    purpleLg: '0 0 40px rgba(168, 85, 247, 0.6)',
  },

  // 3D Box shadows (offset shadows)
  offset: {
    cyan: '8px 8px 0px rgba(34, 211, 238, 0.8)',
    blue: '8px 8px 0px rgba(59, 130, 246, 0.8)',
    purple: '8px 8px 0px rgba(168, 85, 247, 0.8)',
  }
};

// ============================================
// BORDER RADIUS SYSTEM
// ============================================
export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  full: '9999px',
};

// ============================================
// TRANSITION SYSTEM
// ============================================
export const transitions = {
  // Duration
  duration: {
    fast: '150ms',
    DEFAULT: '300ms',
    slow: '500ms',
  },

  // Timing functions
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
};

// ============================================
// BREAKPOINTS
// ============================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================
// Z-INDEX SYSTEM
// ============================================
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  toast: 60,
};

// ============================================
// EXPORT ALL
// ============================================
export default {
  spacing,
  typography,
  colors,
  gradients,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
  zIndex,
};
