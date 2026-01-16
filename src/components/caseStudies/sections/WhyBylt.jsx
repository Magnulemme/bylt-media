import React from 'react';
import { motion } from 'motion/react';
import { whyByltContent, processPreviewContent } from '../constants';
import ComparisonTable from '../../ui/ComparisonTable';

const WhyBylt = () => {
    const { badge, heading, subheading, others, bylt } = whyByltContent;
    const { steps } = processPreviewContent;

    return (
        <section
            className="relative pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden"
            style={{ background: '#020617' }}
        >
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                <ComparisonTable
                    badge={badge}
                    heading={heading}
                    subheading={subheading}
                    others={others}
                    bylt={bylt}
                />

                {/* Process steps */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        >
                            {/* Mobile: vertical layout */}
                            <div className="md:hidden mb-2 text-center">
                                <span className="text-2xl font-bold font-inter leading-none bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent">
                                    {step.number}
                                </span>
                                <h3 className="text-lg font-semibold text-white mt-1">
                                    {step.title}
                                </h3>
                            </div>
                            {/* Desktop: horizontal layout */}
                            <div className="hidden md:flex items-center justify-start mb-2 space-x-4">
                                <span className="text-2xl font-bold font-inter leading-none bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent">
                                    {step.number}
                                </span>
                                <h3 className="text-xl font-semibold text-white">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed text-center md:text-left">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyBylt;
