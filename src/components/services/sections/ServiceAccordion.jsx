'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { getIcon, accentColors } from '../utils';


const AccordionItem = ({ item, isOpen, onToggle, index }) => {
    const IconComponent = getIcon(item.icon);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <div className="border-b border-slate-700/60 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-4 text-left transition-opacity hover:opacity-80"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    {IconComponent && (
                        <IconComponent
                            size={18}
                            style={{ color: accentColor }}
                            className="shrink-0"
                        />
                    )}
                    <span className="heading-h4 text-white">{item.title}</span>
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
                        <p className="text-body pb-4 pl-7.5">
                            {item.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ServiceAccordion = ({ service }) => {
    const [openItems, setOpenItems] = useState({ 0: true });

    const items = service?.details?.benefits?.slice(0, 3) || [];

    if (items.length === 0) return null;

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="space-y-0">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    item={item}
                    index={index}
                    isOpen={openItems[index] || false}
                    onToggle={() => toggleItem(index)}
                />
            ))}
        </div>
    );
};

export default ServiceAccordion;
