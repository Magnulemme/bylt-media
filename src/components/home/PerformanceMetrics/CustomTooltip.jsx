import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Forza l'estrazione del label dai dati del payload se non è presente
    const displayLabel = label || (payload[0]?.payload?.name);

    return (
      <div className="bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-3 shadow-2xl">
        {displayLabel && (
          <p className="text-xs text-gray-400 mb-1.5 font-medium border-b border-white/10 pb-1.5">{displayLabel}</p>
        )}
        {payload.map((entry, index) => {
          // Determina il nome leggibile del dato
          const dataName = entry.dataKey;

          // Traduci i nomi tecnici in etichette leggibili
          const nameMap = {
            'value': 'Revenue',
            'actual': 'Actual ROAS',
            'target': 'Target ROAS',
            'organic': 'Organic SEO',
            'paid': 'Paid Ads',
            'rate': entry.payload?.name?.includes('W') ? 'Bounce Rate' : 'Engagement Rate'
          };

          const displayName = nameMap[dataName] || dataName;

          // Formatta il valore in base al tipo di dato
          let formattedValue = entry.value;
          if (typeof entry.value === 'number') {
            if (dataName === 'value') {
              // Revenue in euro
              formattedValue = `€${entry.value.toLocaleString('it-IT')}`;
            } else if (dataName === 'actual' || dataName === 'target') {
              // ROAS con decimale
              formattedValue = `${entry.value.toFixed(1)}x`;
            } else if (dataName === 'rate') {
              // Bounce Rate percentuale
              formattedValue = `${entry.value}%`;
            } else {
              // Altri numeri generici
              formattedValue = entry.value.toLocaleString('it-IT');
            }
          }

          // Mappa colori per ogni tipo di dato
          const colorMap = {
            'value': '#22d3ee',
            'actual': '#3b82f6',
            'target': '#6b7280',
            'organic': '#a855f7',
            'paid': '#22d3ee',
            'rate': '#10b981'
          };

          const displayColor = colorMap[dataName] || '#22d3ee';

          return (
            <div key={index} className="flex items-center justify-between gap-3 mt-1">
              <span className="text-xs text-gray-400">{displayName}</span>
              <span className="text-sm font-bold" style={{ color: displayColor }}>
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
