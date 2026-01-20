import React from 'react';

/**
 * Componente unificato per la sezione details di tutte le performance cards
 * Accetta una struttura dati standardizzata e gestisce il rendering in modo uniforme
 */

/**
 * Sezione details completa
 *
 * @param {object} leftStat - Statistica sinistra: { label, value, className, unit }
 * @param {object} rightStat - Statistica destra: { label, value, className }
 * @param {string|ReactNode} description - Testo descrittivo
 */
export const DetailsSection = ({ leftStat, rightStat, description }) => (
  <>
    {/* Stats Row */}
    <div className="flex items-center justify-between">
      {/* Left Stat */}
      <div>
        <p className="text-xs text-slate-500 mb-1">{leftStat.label}</p>
        <div className="flex items-baseline gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-0">
          <span className={leftStat.className}>{leftStat.value}</span>
          {leftStat.unit && <span className="text-xs text-slate-500">{leftStat.unit}</span>}
        </div>
      </div>

      {/* Right Stat */}
      <div className="text-right">
        <p className="text-xs text-slate-500 mb-1">{rightStat.label}</p>
        <p className={rightStat.className}>{rightStat.value}</p>
      </div>
    </div>

    {/* Description */}
    {description && (
      <p className="text-xs text-slate-500 mt-3">
        {description}
      </p>
    )}
  </>
);
