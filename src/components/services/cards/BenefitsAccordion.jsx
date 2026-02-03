'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { getIcon } from '../utils';

const AccordionItem = ({ benefit, isOpen, onToggle, index }) => {
    const Icon = getIcon(benefit.icon);

    return (
        <div className="border-b border-slate-700/60 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-4 text-left transition-opacity hover:opacity-80"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
                            }}
                        >
                            <Icon className="w-4 h-4 text-cyan-400" />
                        </div>
                    )}
                    <h4 className="text-lg font-semibold text-white">
                        {benefit.title}
                    </h4>
                </div>
                <motion.div
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                    style={{
                        borderColor: isOpen ? 'rgb(6, 182, 212)' : 'rgb(51 65 85)',
                        color: isOpen ? 'rgb(6, 182, 212)' : 'rgb(148 163 184)'
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
                        <p className="text-body-sm text-slate-400 pb-4 pl-11">
                            {benefit.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BenefitsAccordion = ({ benefits, waveBackground, headline, description }) => {
    const [openItems, setOpenItems] = useState({ 0: true }); // First item open by default

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 transition-colors overflow-hidden">
            {/* Header with wave background - contained within its own section */}
            <div className="relative overflow-hidden">
                {/* Wave background - only in header */}
                {waveBackground && (
                    <div
                        className="absolute inset-0 transition-opacity duration-300 z-0"
                        style={{
                            backgroundImage: `url(${waveBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                )}
                {waveBackground && (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />
                )}
                <div className="relative z-10 p-6">
                    <h2 className="heading-h2 text-white mb-3">
                        {headline || 'What it means for your brand'}
                    </h2>
                    {description && (
                        <p className="text-body">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Accordion items - no wave background */}
            <div className="px-6 pb-6">
                {benefits.slice(0, 2).map((benefit, index) => (
                    <AccordionItem
                        key={index}
                        benefit={benefit}
                        index={index}
                        isOpen={openItems[index] || false}
                        onToggle={() => toggleItem(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BenefitsAccordion;
