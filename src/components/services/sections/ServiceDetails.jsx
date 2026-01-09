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
import AnimatedWaveCanvas from './AnimatedWaveCanvas';

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
            <div className="bg-slate-900/95 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-cyan-400">
                    +{payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

const ServiceDetails = ({ service }) => {
    if (!service.details) return null;

    // Get first 4 benefits for the list
    const keyBenefits = service.details.benefits?.slice(0, 4) || [];
    // Get first 2 stats
    const keyStats = service.details.stats?.slice(0, 2) || [];
    // Secondary section data
    const secondary = service.details.secondary;
    // Secondary stats (tempo/risultati)
    const secondaryStats = service.details.secondaryStats || [];

    return (
        <section
            className="relative py-16 md:py-24"
            style={{ background: '#020617' }}
        >
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-4 block">
                            Why Choose Us
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-4">
                            {service.details.heading}
                        </h2>
                        <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-8">
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
                                        <span className="text-slate-400 text-sm md:text-base">
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
                                        <div className="text-xs md:text-sm text-slate-500">
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
                        className="relative rounded-2xl border border-gray-800 bg-slate-950/50 p-6 overflow-hidden max-md:mt-8"
                    >
                        {/* Subtle glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white font-inter">
                                        Performance Growth
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Year over year improvement
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                    <span className="text-xs text-slate-500">Growth %</span>
                                </div>
                            </div>

                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growthData}>
                                        <defs>
                                            <linearGradient id="serviceGrowthGradient" x1="0" y1="0" x2="0" y2="1">
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
                                            fill="url(#serviceGrowthGradient)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Secondary Section - Outcomes (mirrored layout) */}
                {secondary && (
                    <div className="mt-16 md:mt-24">
                        {/* Mobile: vertical layout (wave top, content bottom) */}
                        <div className="md:hidden">
                            {/* Wave on top */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-2xl overflow-hidden h-[200px] mb-6"
                            >
                                <AnimatedWaveCanvas className="rounded-2xl" />
                            </motion.div>

                            {/* Content below */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <h2 className="text-2xl font-bold text-white font-inter mb-3">
                                    {secondary.heading}
                                </h2>
                                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                    {secondary.subheading}
                                </p>

                                {/* Outcomes Grid - 2x2 with numbers */}
                                <div className="grid grid-cols-2 gap-3">
                                    {secondary.outcomes?.map((outcome, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-xs font-mono text-cyan-500/70 mt-0.5">
                                                0{index + 1}
                                            </span>
                                            <span className="text-slate-400 text-xs leading-snug">
                                                {outcome.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Secondary Stats - Mobile */}
                                {secondaryStats.length > 0 && (
                                    <div className="flex gap-6 pt-6">
                                        {secondaryStats.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                            >
                                                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Tablet & Desktop: two columns (wave left, content right) */}
                        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
                            {/* Left - Animated Wave */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative rounded-2xl overflow-hidden h-[320px]"
                            >
                                <AnimatedWaveCanvas className="rounded-2xl" />
                            </motion.div>

                            {/* Right - Content (different structure) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-white font-inter mb-3">
                                    {secondary.heading}
                                </h2>
                                <p className="text-base text-slate-400 leading-relaxed mb-6">
                                    {secondary.subheading}
                                </p>

                                {/* Outcomes Grid - 2x2 with numbers */}
                                <div className="grid grid-cols-2 gap-4">
                                    {secondary.outcomes?.map((outcome, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.08 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="text-xs font-mono text-cyan-500/70 mt-0.5">
                                                0{index + 1}
                                            </span>
                                            <span className="text-slate-400 text-sm leading-snug">
                                                {outcome.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                                {secondaryStats.length > 0 && (
                            <div className="flex gap-8 justify-end pt-8">
                                {secondaryStats.map((stat, index) => (
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
                                        <div className="text-xs md:text-sm text-slate-500">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceDetails;
