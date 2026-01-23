import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DitherShader } from '@/components/ui/dither-shader';
import { useNumberImage } from '@/components/services/hooks';

// Card styles configuration - different colors and dither modes per card
const cardStyles = [
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

const DEFAULT_DESCRIPTION = "Every project follows a proven methodology. Here's how we approached this one.";

const ProcessGrid = ({ process, description = DEFAULT_DESCRIPTION }) => {
    const [openCard, setOpenCard] = useState(null);

    if (!process || process.length === 0) return null;

    const toggleCard = (index) => {
        setOpenCard(openCard === index ? null : index);
    };

    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

            {/* Section Header */}
            <div className="max-w-5xl mx-auto px-4 relative mb-12 md:mb-16">
                <h2 className="heading-h1 text-white mb-4">The Process</h2>
                {description && (
                    <p className="text-subheader max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* Mobile Swiper - full width */}
            <div
                className="md:hidden relative z-10"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)'
                }}
            >
                <Swiper
                    spaceBetween={12}
                    slidesPerView="auto"
                    slidesOffsetBefore={16}
                    slidesOffsetAfter={16}
                    className="process-swiper overflow-visible!"
                >
                    {process.map((step, index) => (
                        <SwiperSlide
                            key={step.step}
                            style={{ width: 'calc(100vw - 140px)' }}
                            className="h-auto!"
                        >
                            <ProcessCard
                                step={step}
                                index={index}
                                isMobile
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="max-w-5xl mx-auto px-4 relative">
                <div className="hidden md:grid grid-cols-2 gap-6">
                    {process.map((step, index) => (
                        <ProcessCard
                            key={step.step}
                            step={step}
                            index={index}
                            isOpen={openCard === index}
                            onToggle={() => toggleCard(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessCard = ({ step, index, isOpen, onToggle, isMobile = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Get style for this card (cycles through styles array)
    const style = cardStyles[index % cardStyles.length];
    const hasDetails = step.details && step.details.length > 0;
    const showAccordion = hasDetails && !isMobile;

    const Wrapper = isMobile ? 'div' : motion.div;
    const motionProps = isMobile ? {} : {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.5, delay: index * 0.1 }
    };

    // Generate number image with canvas (same as services ProcessCard)
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
        </Wrapper>
    );
};

export default ProcessGrid;
