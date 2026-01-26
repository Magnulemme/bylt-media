import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dati che mostrano un declino
const declineData = [
    { name: 'Jan', actual: 4.2, target: 5.0 },
    { name: 'Feb', actual: 3.8, target: 5.0 },
    { name: 'Mar', actual: 3.5, target: 5.0 },
    { name: 'Apr', actual: 2.9, target: 5.0 },
    { name: 'May', actual: 2.4, target: 5.0 },
    { name: 'Jun', actual: 1.8, target: 5.0 },
];

const BeforeByltChart = ({ className, headline = "The numbers told the story.", description = "Month after month, performance kept slipping further from targets. The gap was growing." }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div className={cn("max-w-(--breakpoint-content) mx-auto px-(--margin-safe-x) pt-0 pb-padding-lg", className)}>
            <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Colonna destra (su desktop): titolo + copy - order-last su mobile, order-first su lg per reverse */}
                <div className="lg:order-last">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="heading-h2 text-white">
                            {headline}
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-subheader"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Colonna sinistra (su desktop): grafico */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-[#020617]/40 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium text-slate-400">Performance vs Target</h4>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="text-gray-400">Actual</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                                    <span className="text-gray-400">Target</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={declineData}>
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
                                        domain={[0, 6]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(0,0,0,0.9)',
                                            border: '1px solid rgba(239,68,68,0.3)',
                                            borderRadius: '8px',
                                        }}
                                        labelStyle={{ color: '#fff' }}
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
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        dot={{
                                            fill: '#ef4444',
                                            r: 4,
                                            strokeWidth: 2,
                                            stroke: '#991b1b'
                                        }}
                                        activeDot={{
                                            r: 6,
                                            fill: '#ef4444',
                                            stroke: '#fca5a5',
                                            strokeWidth: 3,
                                        }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BeforeByltChart;
