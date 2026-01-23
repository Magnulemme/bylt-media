"use client";
import React from 'react';
import { motion } from 'motion/react';
import AnimatedWaveCanvas from './AnimatedWaveCanvas';

const ServiceDetails = ({ service }) => {
    if (!service.details) return null;

    // Secondary section data (Results)
    const secondary = service.details.secondary;
    // Secondary stats (tempo/risultati)
    const secondaryStats = service.details.secondaryStats || [];

    if (!secondary) return null;

    return (
        <section
            className="relative py-16 md:py-24"
            style={{ background: '#020617' }}
        >
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Mobile: wave as background behind text */}
                <div className="md:hidden relative rounded-2xl overflow-hidden">
                    {/* Wave as background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <AnimatedWaveCanvas className="rounded-2xl" />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
                    </motion.div>

                    {/* Content with padding */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative z-10 p-6"
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {secondary.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-6">
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
                                    <span className="text-caption text-cyan-400 mt-0.5">
                                        0{index + 1}
                                    </span>
                                    <span className="text-body text-slate-300 leading-snug">
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
                                        <div className="text-caption">
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

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {secondary.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-6">
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
                                    <span className="text-caption text-cyan-500/70">
                                        0{index + 1}
                                    </span>
                                    <span className="text-body leading-snug">
                                        {outcome.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Secondary Stats - Desktop */}
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
                                        <div className="text-caption">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
