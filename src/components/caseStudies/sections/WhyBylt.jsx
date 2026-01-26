import React from 'react';
import { motion } from 'motion/react';
import { whyByltContent, processPreviewContent } from '../constants';
import ComparisonTable from '../../ui/ComparisonTable';
import { DitherShader } from '../../ui/dither-shader';
import { useNumberImage } from '../../services/hooks';
import { ditherPatterns, accentColors } from '../../services/utils';

// What you get items
const benefitsData = [
    'Data-driven strategies',
    'Transparent reporting',
    'Dedicated account manager',
    'No long-term contracts'
];

// Process step card with dither shader background
const ProcessStepCard = ({ step, index }) => {
    const numberImage = useNumberImage(step.number, index);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <div
            className="relative rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 h-44 bg-slate-950"
            style={{ boxShadow: '4px 4px 0px rgba(34, 211, 238, 1)' }}
        >
            {/* Dither Background with number */}
            <div className="absolute inset-0">
                {numberImage && (
                    <DitherShader
                        src={numberImage}
                        colorMode="duotone"
                        primaryColor="#020617"
                        secondaryColor={accentColor}
                        ditherMode={ditherPatterns[index % ditherPatterns.length]}
                        gridSize={6}
                        threshold={0.4}
                        contrast={1.2}
                    />
                )}
            </div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.6) 100%)'
            }} />

            {/* Bottom gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                <h3 className="heading-h4 text-white mb-1">{step.title}</h3>
                <p className="text-body-sm md:line-clamp-2">{step.description}</p>
            </div>
        </div>
    );
};

const WhyBylt = () => {
    const { others, bylt } = whyByltContent;
    const { badge, heading, steps } = processPreviewContent;

    return (
        <section
            className="case-studies-why-bylt-section relative overflow-hidden"
            style={{ background: '#020617' }}
        >
            <div className="case-studies-why-bylt-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-h2 text-white mb-4">
                        Why Choose BYLT
                    </h2>
                    <p className="text-subheader max-w-2xl">
                        See how we compare to traditional agencies and why businesses choose us.
                    </p>
                </motion.div>

                <ComparisonTable
                    others={others}
                    bylt={bylt}
                    showHeader={false}
                />

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="case-studies-quote text-center max-w-3xl mx-auto"
                >
                    <svg className="w-8 h-8 mx-auto mb-4 text-cyan-400/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-4">
                        We don't just run campaigns—we build growth systems that deliver results month after month.
                    </blockquote>
                    <p className="text-sm text-slate-500">
                        — The BYLT Team
                    </p>
                </motion.div>

                {/* Process header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="case-studies-process-header text-center"
                >
                    <span className="text-label-sm text-cyan-500 mb-3 block">
                        {badge}
                    </span>
                    <h3 className="heading-h2 text-white">
                        {heading}
                    </h3>
                </motion.div>

                {/* Process steps */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        >
                            <ProcessStepCard step={step} index={index} />
                        </motion.div>
                    ))}
                </div>

                {/* Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="case-studies-benefits grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
                    {benefitsData.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyBylt;
