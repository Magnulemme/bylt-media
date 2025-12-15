import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const RevenueChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">Revenue & Ad Spend</h3>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-cyan-400" />
              <span className="text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-orange-400" />
              <span className="text-gray-400">Ad Spend</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" stopOpacity={0.7}/>
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="cost"
              stackId="a"
              fill="url(#costGradient)"
              radius={[0, 0, 0, 0]}
              animationDuration={1200}
            />
            <Bar
              dataKey="revenue"
              stackId="a"
              fill="url(#revenueGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Revenue totale</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">€31.5K</span>
                <span className="text-xs text-gray-500">ultimo mese</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Margine</p>
              <p className="text-sm font-bold text-green-400">€26.9K (85%)</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Crescita sostenuta con margine costante. Spesa pubblicitaria ottimizzata per massimizzare il profitto.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
