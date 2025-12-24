import React from 'react';

/**
 * Componenti atomici per costruire la sezione details delle performance cards
 * Ogni componente ha le proprie media queries per gestire la responsiveness
 */

/**
 * Statistica con label e valore
 */
export const StatItem = ({ label, value, valueClassName = "text-2xl font-bold text-white", unit }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className={valueClassName}>{value}</span>
      {unit && <span className="text-xs text-gray-500">{unit}</span>}
    </div>
  </div>
);

/**
 * Container per statistiche affiancate (2 colonne)
 */
export const StatsRow = ({ children }) => (
  <div className="flex items-center justify-between">
    {children}
  </div>
);

/**
 * Paragrafo descrittivo
 */
export const DescriptionText = ({ children }) => (
  <p className="text-xs text-gray-500 mt-3">
    {children}
  </p>
);

/**
 * Grid di statistiche (usato per traffic distribution)
 */
export const StatsGrid = ({ children }) => (
  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
    {children}
  </div>
);

/**
 * Item del grid con icona colorata e valore
 */
export const GridStatItem = ({ icon, iconColor, label, value, percentage }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-full ${iconColor}`} />
      <span className="text-gray-400">{label}</span>
    </div>
    <div className="ml-4">
      <span className="text-lg font-bold text-white">{value}</span>
      {percentage && <span className="text-gray-500 ml-1.5">({percentage})</span>}
    </div>
  </div>
);
