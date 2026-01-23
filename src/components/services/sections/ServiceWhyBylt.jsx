"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Sample growth data
const growthData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 35 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 45 },
    { month: 'May', value: 52 },
    { month: 'Jun', value: 68 },
    { month: 'Jul', value: 75 },
    { month: 'Aug', value: 82 },
    { month: 'Sep', value: 95 },
    { month: 'Oct', value: 110 },
    { month: 'Nov', value: 125 },
    { month: 'Dec', value: 148 }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-caption mb-1">{label}</p>
                <p className="text-sm font-semibold text-cyan-400">
                    +{payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

const ServiceWhyBylt = ({ service }) => {
    if (!service.details) return null;

    // Get first 4 benefits for the list
    const keyBenefits = service.details.benefits?.slice(0, 4) || [];
    // Get first 2 stats
    const keyStats = service.details.stats?.slice(0, 2) || [];

    return (
        <section
            className="relative py-16 md:py-24"
            style={{ background: '#020617' }}
        >
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {service.details.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-6">
                            {service.details.subheading}
                        </p>

                        {/* Key Benefits List */}
                        {keyBenefits.length > 0 && (
                            <ul className="space-y-3 mb-8">
                                {keyBenefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-cyan-400" />
                                        </div>
                                        <span className="text-body">
                                            {benefit.title}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        )}

                        {/* Key Stats */}
                        {keyStats.length > 0 && (
                            <div className="flex gap-8">
                                {keyStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-caption">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right - Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-2xl border border-slate-800 bg-slate-950/50 p-6 overflow-hidden max-md:mt-8"
                    >
                        {/* Subtle glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="heading-h4 text-white">
                                        Performance Growth
                                    </h3>
                                    <p className="text-body-sm text-slate-500">
                                        Year over year improvement
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                    <span className="text-caption">Growth %</span>
                                </div>
                            </div>

                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growthData}>
                                        <defs>
                                            <linearGradient id="whyByltGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="month"
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
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#06b6d4"
                                            strokeWidth={2}
                                            fill="url(#whyByltGrowthGradient)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceWhyBylt;
