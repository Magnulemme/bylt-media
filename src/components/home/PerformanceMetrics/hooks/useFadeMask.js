/**
 * Genera la mask CSS per il fade ai bordi delle card
 */
export const useFadeMask = (isAtStart, isAtEnd, fadeWidth = 128) => {
  if (isAtStart && isAtEnd) {
    // Tutte le card sono visibili, nessun fade
    return 'none';
  }

  if (isAtStart) {
    // All'inizio: fade solo a destra
    return `linear-gradient(to right, black, black calc(100% - ${fadeWidth}px), transparent)`;
  }

  if (isAtEnd) {
    // Alla fine: fade solo a sinistra
    return `linear-gradient(to right, transparent, black ${fadeWidth}px, black)`;
  }

  // Nel mezzo: fade su entrambi i lati
  return `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`;
};
