import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

// Dati che mostrano crescita progressiva post-BYLT
const growthData = [
    { name: 'M1', value: 2.1 },
    { name: 'M2', value: 3.0 },
    { name: 'M3', value: 3.8 },
    { name: 'M4', value: 4.6 },
    { name: 'M5', value: 5.4 },
    { name: 'M6', value: 6.2 },
];

const TARGET = 5.0;

const AfterByltChart = ({ className, headline = "The momentum kept building.", description = "Month after month, performance surpassed targets. The gap was now in our favor." }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div className={cn("max-w-6xl mx-auto px-4 py-16 md:py-24", className)}>
            <div ref={ref} className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                {/* Colonna sinistra: titolo + copy */}
                <div className="lg:max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="text-label text-emerald-400 mb-3 block">
                            The Impact
                        </span>
                        <h2 className="heading-h2 text-white">
                            {headline}
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-subheader"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Colonna destra: grafico */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 lg:max-w-lg"
                >
                    <div className="bg-[#020617]/40 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium text-slate-400">Growth Over Time</h4>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-gray-400">Performance</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-[2px] bg-gray-500" style={{ borderTop: '2px dashed #6b7280' }} />
                                    <span className="text-gray-400">Target</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={growthData} barCategoryGap="25%">
                                    <XAxis
                                        dataKey="name"
                                        stroke="rgba(255,255,255,0.1)"
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.1)"
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[0, 7]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(0,0,0,0.9)',
                                            border: '1px solid rgba(16,185,129,0.3)',
                                            borderRadius: '8px',
                                        }}
                                        labelStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    />
                                    <ReferenceLine
                                        y={TARGET}
                                        stroke="#6b7280"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[4, 4, 0, 0]}
                                        animationDuration={1500}
                                    >
                                        {growthData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.value >= TARGET ? '#10b981' : '#065f46'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AfterByltChart;
