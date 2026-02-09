"use cache";

import ShaderBackgroundDirect from './home/ShaderBackgroundDirect';

/**
 * PersistentShaderBackground - Wrapper cacheable per ShaderBackgroundDirect
 *
 * Usa la direttiva "use cache" di Next.js 16 per mantenere il componente
 * montato durante la navigazione grazie al componente <Activity> di React 19.
 *
 * IMPORTANTE: Usa ShaderBackgroundDirect (standalone) invece della versione shared.
 * Questo è per i background grandi/globali che devono rimanere persistenti.
 * Per dettagli più piccoli, usa la versione shared direttamente.
 *
 * Vantaggi:
 * - Zero flicker durante la navigazione
 * - WebGLRenderer dedicato inizializzato una sola volta
 * - Transizioni fluide tra pagine
 * - Nessun overhead del shared renderer per il background globale
 *
 * Props:
 * - colors: { color1, color2, color3 } - Colori del gradiente (hex numbers)
 * - targetFPS: number - Target FPS per l'animazione (default: 24)
 * - className: string - Classe CSS aggiuntiva
 * - style: object - Stili inline aggiuntivi
 * - enableVisibilityTracking: boolean - Abilita pause quando non visibile (default: false per background globale)
 */
const PersistentShaderBackground = ({
  colors = {
    color1: 0x1a1a2e,
    color2: 0x16213e,
    color3: 0x0f3460,
  },
  targetFPS = 24,
  className = '',
  style = {},
  enableVisibilityTracking = false,
  ...props
}) => {
  return (
    <ShaderBackgroundDirect
      colors={colors}
      targetFPS={targetFPS}
      className={className}
      style={style}
      enableVisibilityTracking={enableVisibilityTracking}
      {...props}
    />
  );
};

export default PersistentShaderBackground;
