import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TrafficDistributionChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Traffic Distribution</h3>
            <p className="text-xs text-gray-600">visitors/month</p>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-400">Organic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-gray-400">Paid</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative min-h-[200px]" style={{ pointerEvents: 'none' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="organicGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
                <linearGradient id="paidGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1200}
                animationBegin={0}
                isAnimationActive={true}
                activeIndex={-1}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? 'url(#organicGradient)' : 'url(#paidGradient)'}
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth={3}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-1">Total Traffic</p>
              <p className="text-2xl font-bold text-white">38.5K</p>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-white/5">
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-gray-400">Organic SEO</span>
              </div>
              <div className="ml-4">
                <span className="text-lg font-bold text-white">21K</span>
                <span className="text-gray-500 ml-1.5">(54.5%)</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-gray-400">Paid Ads</span>
              </div>
              <div className="ml-4">
                <span className="text-lg font-bold text-white">17.5K</span>
                <span className="text-gray-500 ml-1.5">(45.5%)</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Mix bilanciato di traffico organico e a pagamento. La forte presenza SEO garantisce sostenibilità a lungo termine, mentre le campagne paid mantengono la crescita costante.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TrafficDistributionChart;
