import React from 'react';
import { motion } from 'motion/react';
import { whyByltContent, processPreviewContent } from '../constants';
import ComparisonTable from '../../ui/ComparisonTable';
import { DitherShader } from '../../ui/dither-shader';
import { useNumberImage } from '../../services/hooks';
import { ditherPatterns, accentColors } from '../../services/utils';

// Process step card with dither shader background
const ProcessStepCard = ({ step, index }) => {
    const numberImage = useNumberImage(step.number, index);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <div className="relative rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 h-44 bg-slate-950">
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
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
            </div>
        </section>
    );
};

export default WhyBylt;
