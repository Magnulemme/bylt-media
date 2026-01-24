import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente centralizzato per tutte le performance cards
 * Gestisce il rendering condizionale per mobile/desktop in modo pulito
 */
const PerformanceCard = ({
  title,
  subtitle,
  legend,
  chart,
  details,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <div className="relative bg-[#020617]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
        {/* Header con titolo e legenda */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
            {subtitle && (
              <p className="text-xs text-slate-600">{subtitle}</p>
            )}
          </div>
          {legend && (
            <div className="gap-3 text-xs flex max-sm:flex-col">
              {legend}
            </div>
          )}
        </div>

        {/* Chart area */}
        <div className="flex-1 min-h-[160px]">
          {chart}
        </div>

        {/* Details section */}
        {details && (
          <div className="mt-4 pt-4 border-t border-white/5">
            {details}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
