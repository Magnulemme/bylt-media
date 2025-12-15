import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
        <h3 className="text-sm font-medium text-gray-400 mb-4">Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">€31.5K</span>
            <span className="text-xs text-gray-500">ultimo mese</span>
          </div>
          <p className="text-xs text-green-400 mt-1">+152% in 4 mesi</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
