import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const KPICard = ({ isMobile = false, roasData, kpis }) => (
  <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-400 mb-1">Performance Overview</h3>
      <p className="text-xs text-gray-600">Your key marketing metrics</p>
    </div>
    <div className="flex-1 min-h-[100px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={roasData}>
          <defs>
            <linearGradient id={isMobile ? "kpiGradient" : "kpiGradientDesktop"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#22d3ee"
            strokeWidth={2}
            fill={`url(#${isMobile ? "kpiGradient" : "kpiGradientDesktop"})`}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="flex flex-col gap-4">
      {kpis.map((kpi, i) => (
        <div key={i} className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{kpi.label}</p>
            <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}>
              {kpi.value}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">{kpi.description}</p>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-20 blur-sm`} />
            <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
              <div className="text-white">{kpi.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default KPICard;
