'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { accentColors } from './utils';
import AnimatedWaveCanvas from '../../../services/sections/AnimatedWaveCanvas';

const DEFAULT_DESCRIPTION = "Every project follows a proven methodology. Here's how we approached this one.";

const AccordionItem = ({ step, isOpen, onToggle, index }) => {
    const accentColor = accentColors[index % accentColors.length];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-slate-700/60 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-80"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <span
                        className="text-sm font-mono font-medium w-8 h-8 rounded-full flex items-center justify-center border"
                        style={{
                            color: isOpen ? accentColor : 'rgb(148 163 184)',
                            borderColor: isOpen ? accentColor : 'rgb(51 65 85)',
                            background: isOpen ? `${accentColor}15` : 'transparent'
                        }}
                    >
                        {step.step}
                    </span>
                    <span className={`heading-h4 ${isOpen ? 'bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}>{step.title}</span>
                </div>
                <motion.div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                    style={{
                        borderColor: isOpen ? accentColor : 'rgb(51 65 85)',
                        color: isOpen ? accentColor : 'rgb(148 163 184)'
                    }}
                >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-5 pl-12">
                            {/* Description */}
                            <p className="text-body mb-4">
                                {step.description}
                            </p>

                            {/* Metrics tags */}
                            {step.metrics && step.metrics.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {step.metrics.map((metric, i) => (
                                        <span
                                            key={i}
                                            className="text-body-sm px-3 py-1.5 rounded-xl border"
                                            style={{ color: accentColor, borderColor: `${accentColor}40` }}
                                        >
                                            {metric}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Details */}
                            {step.details && step.details.length > 0 && (
                                <ul className="space-y-2">
                                    {step.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3 text-body-sm">
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                style={{ background: accentColor }}
                                            />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ProcessGrid = ({ process, description = DEFAULT_DESCRIPTION }) => {
    const [openItems, setOpenItems] = useState({ 0: true });

    if (!process || process.length === 0) return null;

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <section className="pb-padding-lg relative">
            {/* Header */}
            <div className="mb-padding-md">
                <h2 className="heading-h1 text-white mb-4">The Process</h2>
                {description && (
                    <p className="text-subheader max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* Accordion + Wave Canvas Grid */}
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6 items-stretch">
                {/* Accordion Card */}
                <div className="laptop:order-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all overflow-hidden shadow-[6px_6px_0px_rgba(34,211,238,1)]">
                    <div className="p-6">
                        {process.map((step, index) => (
                            <AccordionItem
                                key={step.step || index}
                                step={step}
                                index={index}
                                isOpen={openItems[index] || false}
                                onToggle={() => toggleItem(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Animated Wave Canvas - visible on laptop+ */}
                <div className="hidden laptop:flex laptop:order-2 items-center justify-center overflow-hidden">
                    <AnimatedWaveCanvas
                        shape="blob"
                        colors={['#06b6d4', '#8b5cf6', '#10b981']}
                        background="transparent"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProcessGrid;
