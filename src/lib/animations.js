/**
 * BYLT Media - Centralized Animation System
 *
 * Importa da qui tutte le costanti e varianti per Framer Motion.
 * Uso: import { fadeBlur, slideUp, DURATION, stagger } from '@/lib/animations'
 */

// ========================================
// TIMING CONSTANTS
// ========================================

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
}

export const DELAY = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
  longer: 0.5,
}

// ========================================
// EASING FUNCTIONS
// ========================================

export const EASING = {
  // Standard easings
  smooth: [0.25, 0.1, 0.25, 1],      // CSS ease equivalent
  easeOut: [0, 0, 0.2, 1],           // Quick start, smooth end
  easeIn: [0.4, 0, 1, 1],            // Slow start, quick end
  easeInOut: [0.4, 0, 0.2, 1],       // Smooth both ends

  // Special effects
  bounce: [0.34, 1.56, 0.64, 1],     // Overshoot for playful animations
  snappy: [0.68, -0.55, 0.265, 1.55], // Quick with bounce back
}

// ========================================
// ANIMATION VARIANTS
// ========================================

/**
 * Fade in with blur effect - ideale per titoli e contenuto principale
 */
export const fadeBlur = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
}

/**
 * Slide up with fade - ideale per card e list items
 */
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

/**
 * Slide up più pronunciato - per elementi che entrano dal basso
 */
export const slideUpLarge = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

/**
 * Slide in orizzontale - per layout side-by-side
 * @param {'left' | 'right'} direction
 */
export const slideIn = (direction = 'left') => ({
  initial: { opacity: 0, x: direction === 'left' ? -30 : 30 },
  animate: { opacity: 1, x: 0 },
})

/**
 * Scale with fade - per elementi che "appaiono"
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
}

/**
 * Semplice fade - quando non serve movimento
 */
export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

// ========================================
// VIEWPORT CONFIG
// ========================================

/**
 * Standard viewport config - anima una volta quando entra in view
 */
export const viewportOnce = { once: true }

/**
 * Viewport con margin - inizia animazione prima che sia completamente visibile
 */
export const viewportEarly = { once: true, margin: "-100px" }

/**
 * Viewport per elementi che devono animare ogni volta
 */
export const viewportAlways = { once: false, amount: 0.3 }

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calcola delay per animazioni staggered
 * @param {number} index - Indice dell'elemento
 * @param {number} base - Delay base tra elementi (default 0.1s)
 * @param {number} offset - Delay iniziale prima del primo elemento
 */
export const stagger = (index, base = 0.1, offset = 0) => offset + index * base

/**
 * Crea transition config standard
 * @param {keyof DURATION} speed - Velocità animazione
 * @param {number} delay - Delay opzionale
 */
export const transition = (speed = 'normal', delay = 0) => ({
  duration: DURATION[speed] || DURATION.normal,
  delay,
  ease: EASING.smooth,
})

/**
 * Transition con easing custom
 */
export const transitionWithEase = (speed = 'normal', ease = 'smooth', delay = 0) => ({
  duration: DURATION[speed] || DURATION.normal,
  delay,
  ease: EASING[ease] || EASING.smooth,
})

// ========================================
// PRESET ANIMATIONS (combinazioni pronte)
// ========================================

/**
 * Animazione standard per titoli sezione
 */
export const titleAnimation = {
  ...fadeBlur,
  transition: { duration: DURATION.slower, ease: EASING.smooth },
}

/**
 * Animazione standard per card
 */
export const cardAnimation = {
  ...slideUp,
  transition: { duration: DURATION.slow, ease: EASING.easeOut },
}

/**
 * Animazione per elementi in lista (con stagger)
 * @param {number} index
 */
export const listItemAnimation = (index) => ({
  ...slideUp,
  transition: {
    duration: DURATION.normal,
    delay: stagger(index),
    ease: EASING.easeOut
  },
})
