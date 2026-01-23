import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const PainPointsGrid = ({ painPoints, className }) => {
    if (!painPoints || painPoints.length === 0) return null;

    return (
        <div className={cn("py-16 md:py-24 px-4", className)}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium mb-4">
                        The Reality
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-inter text-white mb-4">
                        La situazione era <span className="text-red-400">critica</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Prima del nostro intervento, questi erano i numeri che parlavano chiaro
                    </p>
                </div>

                {/* Pain Points Grid */}
                <div className={cn(
                    "grid gap-4 md:gap-6",
                    painPoints.length === 2 && "grid-cols-1 md:grid-cols-2",
                    painPoints.length === 3 && "grid-cols-1 md:grid-cols-3",
                    painPoints.length === 4 && "grid-cols-2 md:grid-cols-4",
                    painPoints.length > 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}>
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icon */}
                                {point.icon && (
                                    <div className="text-3xl md:text-4xl mb-4 opacity-80">
                                        {point.icon}
                                    </div>
                                )}

                                {/* Stat */}
                                <div className="text-4xl md:text-5xl lg:text-6xl font-black font-inter text-red-400 mb-2">
                                    {point.stat}
                                </div>

                                {/* Label */}
                                <div className="text-slate-300 text-sm md:text-base font-medium">
                                    {point.label}
                                </div>

                                {/* Optional description */}
                                {point.description && (
                                    <p className="text-slate-500 text-sm mt-2">
                                        {point.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom line */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm italic">
                        Serviva un cambiamento. Serviva <span className="text-cyan-400 font-semibold">BYLT</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PainPointsGrid;
