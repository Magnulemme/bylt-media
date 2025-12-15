import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const ROASTrendChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative"
    >
      <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">ROAS Trend</h3>
            <p className="text-xs text-gray-600">Return on Ad Spend nel tempo - Actual vs Target</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-400">Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <span className="text-gray-400">Target</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="roasGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: '#3b82f6',
                r: 4,
                strokeWidth: 2,
                stroke: '#1e40af'
              }}
              activeDot={{
                r: 6,
                fill: '#3b82f6',
                stroke: '#60a5fa',
                strokeWidth: 3,
                filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
              }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500">
            Superamento costante degli obiettivi - ogni euro investito genera <span className="text-cyan-400 font-semibold">€6.80</span> di ritorno
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ROASTrendChart;
