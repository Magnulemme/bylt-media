"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Dati che mostrano il percorso di crescita - complementari alle stats sotto
const journeyData = [
    { month: 'Month 1', revenue: 12, efficiency: 45 },
    { month: 'Month 2', revenue: 28, efficiency: 58 },
    { month: 'Month 3', revenue: 45, efficiency: 67 },
    { month: 'Month 4', revenue: 62, efficiency: 74 },
    { month: 'Month 5', revenue: 78, efficiency: 82 },
    { month: 'Month 6', revenue: 95, efficiency: 89 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
                        {entry.name}: +{entry.value}%
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AboutGrowthChart = ({ className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={className}
        >
            <div className="bg-transparent p-2">
                {/* Header */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-1">Typical Client Journey</h4>
                    <p className="text-sm text-slate-500">Performance improvement in the first 6 months</p>
                </div>

                {/* Main Chart - Area Chart */}
                <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={journeyData}>
                            <defs>
                                <linearGradient id="aboutRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="aboutEfficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                stroke="rgba(255,255,255,0.1)"
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.1)"
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 100]}
                                tickFormatter={(value) => `+${value}%`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="efficiency"
                                name="Campaign Efficiency"
                                stroke="#06b6d4"
                                strokeWidth={2}
                                fill="url(#aboutEfficiencyGradient)"
                                animationDuration={1500}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                name="Revenue Growth"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#aboutRevenueGradient)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="text-sm text-slate-400">Revenue Growth</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                        <span className="text-sm text-slate-400">Campaign Efficiency</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutGrowthChart;
