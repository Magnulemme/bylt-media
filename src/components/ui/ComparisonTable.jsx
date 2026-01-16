import React from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

const ComparisonTable = ({
    badge,
    heading,
    subheading,
    others,
    bylt,
    showHeader = true,
    className = ''
}) => {
    return (
        <div className={className}>
            {/* Header */}
            {showHeader && (badge || heading || subheading) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    {badge && (
                        <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-4 block font-medium">
                            {badge}
                        </span>
                    )}
                    {heading && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-inter mb-5">
                            {heading}
                        </h2>
                    )}
                    {subheading && (
                        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {subheading}
                        </p>
                    )}
                </motion.div>
            )}

            {/* Mobile: Comparison table */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:hidden rounded-2xl border border-cyan-500/30 overflow-hidden"
                style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 182, 212, 0.05) 100%)' }}
            >
                {/* Header row */}
                <div
                    className="grid grid-cols-2 border-b border-slate-800/60"
                    style={{ background: 'linear-gradient(to right, transparent 30%, rgba(6, 182, 212, 0.08) 100%)' }}
                >
                    <div className="p-4 text-center">
                        <span className="text-sm font-semibold text-slate-400">{others.title}</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-sm font-semibold text-cyan-400">{bylt.title}</span>
                    </div>
                </div>

                {/* Comparison rows */}
                {others.items.map((otherItem, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        className={`grid grid-cols-2 ${index !== others.items.length - 1 ? 'border-b border-slate-800/40' : ''}`}
                        style={{ background: 'linear-gradient(to right, transparent 30%, rgba(6, 182, 212, 0.05) 100%)' }}
                    >
                        <div className="p-4 flex items-start gap-2">
                            <X className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" strokeWidth={2} />
                            <span className="text-xs text-slate-500 leading-relaxed">{otherItem}</span>
                        </div>
                        <div className="p-4 flex items-start gap-2">
                            <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                            <span className="text-xs text-slate-200 leading-relaxed">{bylt.items[index]}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Desktop: Two cards */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Others card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-slate-900/50 border border-slate-800/60 p-10"
                >
                    <h3 className="text-xl font-semibold text-slate-400 mb-8">
                        {others.title}
                    </h3>

                    <ul className="space-y-5">
                        {others.items.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                className="flex items-start gap-4"
                            >
                                <X className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" strokeWidth={2} />
                                <span className="text-slate-500 leading-relaxed">
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* BYLT card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative rounded-2xl border border-cyan-500/20 p-10 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(6, 182, 212, 0.2)'
                    }}
                >
                    {/* Subtle glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <h3 className="relative text-xl font-semibold text-white mb-8">
                        {bylt.title}
                    </h3>

                    <ul className="relative space-y-5">
                        {bylt.items.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                                className="flex items-start gap-4"
                            >
                                <Check className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                                <span className="text-slate-200 leading-relaxed">
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default ComparisonTable;
