import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { DitherShader } from '@/components/ui/dither-shader';
import { useNumberImage } from '@/components/services/hooks';

// Card styles configuration - different colors and dither modes per card
export const cardStyles = [
    {
        color: '#22d3ee', // cyan
        ditherMode: 'halftone',
        gridSize: 3,
        threshold: 0.45,
        contrast: 1.3,
        boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)',
        hoverBorder: 'border-cyan-500/50'
    },
    {
        color: '#a855f7', // purple
        ditherMode: 'bayer',
        gridSize: 4,
        threshold: 0.5,
        contrast: 1.4,
        boxShadow: '6px 6px 0px rgba(168, 85, 247, 1)',
        hoverBorder: 'border-purple-500/50'
    },
    {
        color: '#3b82f6', // blue
        ditherMode: 'crosshatch',
        gridSize: 3,
        threshold: 0.4,
        contrast: 1.3,
        boxShadow: '6px 6px 0px rgba(59, 130, 246, 1)',
        hoverBorder: 'border-blue-500/50'
    },
    {
        color: '#10b981', // emerald
        ditherMode: 'noise',
        gridSize: 2,
        threshold: 0.42,
        contrast: 1.5,
        boxShadow: '6px 6px 0px rgba(16, 185, 129, 1)',
        hoverBorder: 'border-emerald-500/50'
    }
];

const DitherProcessCard = ({ step, index, isOpen, onToggle, isMobile = false, styles = cardStyles }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const style = styles[index % styles.length];
    const hasDetails = step.details && step.details.length > 0;
    const showAccordion = hasDetails && !isMobile;

    const Wrapper = isMobile ? 'div' : motion.div;
    const motionProps = isMobile ? {} : {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.5, delay: index * 0.1 }
    };

    const numberImage = useNumberImage(step.step, index);

    return (
        <Wrapper
            {...motionProps}
            style={{
                background: '#020617',
                boxShadow: style.boxShadow
            }}
            className={`relative rounded-2xl border overflow-hidden transition-colors duration-300 h-full ${
                isOpen && !isMobile ? style.hoverBorder : 'border-slate-700'
            }`}
        >
            {/* Dither shader background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {numberImage && (
                    <DitherShader
                        src={numberImage}
                        colorMode="duotone"
                        primaryColor="#020617"
                        secondaryColor={style.color}
                        ditherMode={style.ditherMode}
                        gridSize={style.gridSize}
                        threshold={style.threshold}
                        contrast={style.contrast}
                    />
                )}
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
                {/* Title + Toggle */}
                <div
                    className={`flex items-center justify-between mb-2 ${showAccordion ? 'cursor-pointer' : ''}`}
                    onClick={showAccordion ? onToggle : undefined}
                >
                    <h3 className="heading-h4 text-white">
                        {step.title}
                    </h3>
                    {showAccordion && (
                        <ChevronDown
                            className="w-5 h-5 transition-all duration-300 flex-shrink-0 ml-4"
                            style={{
                                color: isOpen ? style.color : '#64748b',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                        />
                    )}
                </div>

                {/* Description */}
                <p className="text-body-sm mb-4">
                    {step.description}
                </p>

                {/* Metrics tags */}
                {step.metrics && step.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {step.metrics.slice(0, 3).map((metric, i) => (
                            <span
                                key={i}
                                className="text-body-sm px-3 py-1.5 rounded-xl border"
                                style={{ color: style.color, borderColor: `${style.color}40` }}
                            >
                                {metric}
                            </span>
                        ))}
                    </div>
                )}

                {/* Accordion Details - Desktop only */}
                {!isMobile && (
                    <AnimatePresence>
                        {isOpen && hasDetails && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 pt-4">
                                    <h4 className="text-tag mb-3">
                                        Details
                                    </h4>
                                    <ul className="space-y-2">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-3 text-body-sm">
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                    style={{ background: style.color }}
                                                />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Step Image */}
            {step.image && (
                <div className="relative z-10 px-4 pb-4">
                    <div className="relative rounded-lg overflow-hidden border border-slate-700/50 h-32 md:h-36">
                        <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default DitherProcessCard;
