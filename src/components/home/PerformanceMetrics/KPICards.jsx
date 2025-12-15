import React from 'react';
import { motion } from 'framer-motion';

const KPICards = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-6 lg:gap-3">
      {kpis.map((kpi, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: kpi.delay }}
          className="relative"
        >
          <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{kpi.label}</p>
              <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}>
                {kpi.value}
              </p>
              <p className="text-[10px] text-gray-600 mt-0.5">{kpi.description}</p>
            </div>
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Background glow */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-20 blur-sm animate-pulse`} />
              {/* Icon container */}
              <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                <div className="text-white">
                  {kpi.icon}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
