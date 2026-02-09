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
                className="md:hidden rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), linear-gradient(90deg, rgba(244, 63, 94, 0.2), rgba(52, 211, 153, 0.2))',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                }}
            >
                {/* Header row */}
                <div className="grid grid-cols-2">
                    <div
                        className="px-3 py-2.5 text-center bg-rose-950/20"
                        style={{
                            borderBottom: '1px solid transparent',
                            borderImage: 'linear-gradient(90deg, rgba(244, 63, 94, 0.15), rgba(52, 211, 153, 0.05)) 1'
                        }}
                    >
                        <span className="text-xs font-semibold text-slate-400">{others.title}</span>
                    </div>
                    <div
                        className="px-3 py-2.5 text-center bg-emerald-950/20"
                        style={{
                            borderBottom: '1px solid transparent',
                            borderImage: 'linear-gradient(90deg, rgba(52, 211, 153, 0.05), rgba(52, 211, 153, 0.15)) 1'
                        }}
                    >
                        <span className="text-xs font-semibold text-cyan-400">{bylt.title}</span>
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
                        className="grid grid-cols-2"
                        style={{
                            borderBottom: index < others.items.length - 1 ? '1px solid transparent' : 'none',
                            borderImage: index < others.items.length - 1 ? 'linear-gradient(90deg, rgba(244, 63, 94, 0.08), rgba(148, 163, 184, 0.08), rgba(52, 211, 153, 0.08)) 1' : 'none'
                        }}
                    >
                        <div
                            className="px-3 py-2.5 flex items-start gap-2"
                            style={{
                                background: 'linear-gradient(90deg, rgba(159, 18, 57, 0.08) 0%, rgba(15, 23, 42, 0.05) 100%)'
                            }}
                        >
                            <X className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" strokeWidth={2} />
                            <span className="text-[11px] text-slate-400 leading-snug">{otherItem}</span>
                        </div>
                        <div
                            className="px-3 py-2.5 flex items-start gap-2"
                            style={{
                                background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.05) 0%, rgba(6, 78, 59, 0.08) 100%)'
                            }}
                        >
                            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                            <span className="text-[11px] text-slate-200 leading-snug">{bylt.items[index]}</span>
                        </div>
                    </motion.div>
                ))}

                {/* Stats row - Mobile */}
                {(others.stats || bylt.stats) && (
                    <div className="grid grid-cols-2">
                        <div className="px-3 py-3 bg-rose-950/25 flex flex-wrap justify-center gap-2">
                            {others.stats?.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-sm font-bold text-rose-400">{stat.value}</div>
                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="px-3 py-3 bg-emerald-950/25 flex flex-wrap justify-center gap-2">
                            {bylt.stats?.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-sm font-bold text-emerald-400">{stat.value}</div>
                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Desktop: Two cards */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Others card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-rose-500/20 p-10 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(244, 63, 94, 0.15)'
                    }}
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
                                <X className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" strokeWidth={2} />
                                <span className="text-slate-400 leading-relaxed">
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Stats - Others */}
                    {others.stats && (
                        <div className="mt-8 pt-6 border-t border-rose-500/20 flex justify-between">
                            {others.stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xl font-bold text-rose-400">{stat.value}</div>
                                    <div className="text-label-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* BYLT card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative rounded-2xl border border-emerald-500/20 p-10 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(52, 211, 153, 0.2)'
                    }}
                >
                    {/* Subtle glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
                                <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                                <span className="text-slate-200 leading-relaxed">
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Stats - BYLT */}
                    {bylt.stats && (
                        <div className="relative mt-8 pt-6 border-t border-emerald-500/20 flex justify-between">
                            {bylt.stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">{stat.value}</div>
                                    <div className="text-label-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ComparisonTable;
