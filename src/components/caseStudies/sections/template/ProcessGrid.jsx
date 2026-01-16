import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProcessGrid = ({ process, description }) => {
    const [openCard, setOpenCard] = useState(null);

    if (!process || process.length === 0) return null;

    const toggleCard = (index) => {
        setOpenCard(openCard === index ? null : index);
    };

    return (
        <section className="py-16 md:py-24 relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

            {/* Header - always padded */}
            <div className="max-w-5xl mx-auto px-4 relative ">
                <SectionHeader description={description} />
            </div>

            {/* Mobile Swiper - full width */}
            <div className="md:hidden relative z-10">
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
                            style={{ width: 'calc(100vw - 64px)' }}
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

const SectionHeader = ({ description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
    >
        <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-3 block font-inter">
            How We Did It
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-4">
            Our Approach
        </h2>
        {description && (
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
                {description}
            </p>
        )}
    </motion.div>
);

const ProcessCard = ({ step, index, isOpen, onToggle, isMobile = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const accentColor = '#06b6d4'; // Cyan for all cards
    const hasDetails = step.details && step.details.length > 0;
    const showAccordion = hasDetails && !isMobile;

    const Wrapper = isMobile ? 'div' : motion.div;
    const motionProps = isMobile ? {} : {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.5, delay: index * 0.1 }
    };

    return (
        <Wrapper
            {...motionProps}
            style={{ background: '#020617' }}
            className={`relative rounded-2xl border overflow-hidden transition-colors duration-300 h-full ${
                isOpen && !isMobile ? 'border-cyan-500/50' : 'border-gray-800 hover:border-gray-700'
            }`}
        >
            {/* Content */}
            <div className="p-6">
                {/* Header: Number + Toggle */}
                <div
                    className={`flex items-center gap-4 mb-4 ${showAccordion ? 'cursor-pointer' : ''}`}
                    onClick={showAccordion ? onToggle : undefined}
                >
                    <span className="text-3xl font-bold font-inter bg-gradient-to-r from-cyan-400/60 via-blue-500/60 to-purple-600/60 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                        {String(step.step).padStart(2, '0')}
                    </span>
                    {showAccordion && (
                        <ChevronDown
                            className={`w-5 h-5 text-slate-500 ml-auto transition-transform duration-300 ${
                                isOpen ? 'rotate-180 text-cyan-400' : ''
                            }`}
                        />
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 font-inter">
                    {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {step.description}
                </p>

                {/* Metrics tags */}
                {step.metrics && step.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {step.metrics.slice(0, 3).map((metric, i) => (
                            <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-full border"
                                style={{
                                    background: `${accentColor}10`,
                                    borderColor: `${accentColor}25`,
                                    color: accentColor
                                }}
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
                                <div className="border-t border-gray-800 mt-4 pt-4">
                                    <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3 font-inter">
                                        Details
                                    </h4>
                                    <ul className="space-y-2">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                    style={{ background: accentColor }}
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
