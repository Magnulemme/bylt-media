'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { accentColors } from '../utils';

const AccordionItem = ({ feature, isOpen, onToggle, index }) => {
    const variantColors = {
        cyan: "#06b6d4",
        purple: "#a855f7",
    };
    const accentColor = accentColors[index % accentColors.length];
    const titleColor = accentColor.startsWith("#") ? accentColor : (variantColors[accentColor] || variantColors.cyan);

    return (
        <div className="border-b border-slate-700/60 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-4 text-left transition-opacity hover:opacity-80"
                aria-expanded={isOpen}
            >
                <h4 className="text-lg font-semibold" style={{ color: titleColor }}>
                    {feature.title}
                </h4>
                <motion.div
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                    style={{
                        borderColor: isOpen ? titleColor : 'rgb(51 65 85)',
                        color: isOpen ? titleColor : 'rgb(148 163 184)'
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
                        <p className="text-body-sm text-slate-400 pb-4">
                            {feature.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FeaturesAccordion = ({ features, waveBackground, headerBackground, headline, description }) => {
    const [openItems, setOpenItems] = useState({ 0: true }); // First item open by default

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 transition-colors overflow-hidden">
            {/* Header with background - contained within its own section */}
            <div className="relative overflow-hidden">
                {/* Custom React component background (e.g., DitherShader) */}
                {headerBackground && (
                    <div className="absolute inset-0 z-0">
                        {headerBackground}
                    </div>
                )}
                {/* Wave background image - only in header */}
                {waveBackground && !headerBackground && (
                    <div
                        className="absolute inset-0 transition-opacity duration-300 z-0"
                        style={{
                            backgroundImage: `url(${waveBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                )}
                {(waveBackground || headerBackground) && (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />
                )}
                <div className="relative z-10 p-6">
                    <h2 className="heading-h2 text-white mb-3">
                        {headline}
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
                {features.map((feature, index) => (
                    <AccordionItem
                        key={index}
                        feature={feature}
                        index={index}
                        isOpen={openItems[index] || false}
                        onToggle={() => toggleItem(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturesAccordion;
