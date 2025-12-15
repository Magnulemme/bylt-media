import React from 'react';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';

const ConversionTrendChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative"
    >
      <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Performance per Canale</h3>
            <p className="text-xs text-gray-600">Analisi multi-dimensionale delle piattaforme pubblicitarie</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={data}>
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <PolarGrid
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="channel"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              stroke="rgba(255,255,255,0.2)"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }}
              stroke="rgba(255,255,255,0.1)"
            />
            <Tooltip
              content={<CustomTooltip />}
            />
            <Radar
              name="Performance"
              dataKey="performance"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#radarGradient)"
              fillOpacity={0.6}
              animationDuration={1500}
              dot={{
                r: 4,
                fill: '#a855f7',
                strokeWidth: 2,
                stroke: '#fff'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Score medio</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">87/100</span>
                <span className="text-xs text-gray-500">performance</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Miglior canale</p>
              <p className="text-sm font-bold text-purple-400">Google Ads</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Strategia omnicanale bilanciata con performance eccellenti su tutte le piattaforme principali. Google Ads e Meta leading performers.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversionTrendChart;
