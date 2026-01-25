import React from 'react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../PerformanceMetrics/hooks/useScrollAnimation';
import { useFadeMask } from '../PerformanceMetrics/hooks/useFadeMask';
import { useCenteredPosition } from '../PerformanceMetrics/hooks/useCenteredPosition';
import MobileCard from './MobileCard';

const MobileTimeline = ({ processSteps }) => {
    // Mobile carousel hooks (reusing PerformanceMetrics pattern)
    const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd, scrollYProgress } = useScrollAnimation(true);
    const maskImage = useFadeMask(isAtStart, isAtEnd, 64);
    const topPosition = useCenteredPosition(wrapperRef);

    return (
        <div className="lg:hidden mobile-timeline-container">
            {/* Title */}
            <div className="mobile-timeline-title">
                <h2 className="heading-h1 text-white text-center max-w-4xl mx-auto">
                    Our proven process ensures clarity, efficiency, and exceptional results
                </h2>
                <p className="text-subheader text-center max-w-2xl mx-auto">
                    Every stage is designed to deliver measurable impact, from strategy to scale
                </p>
            </div>

            {/* Scroll container */}
            <div style={{ height: '400vh' }} ref={containerRef}>
                <div className="sticky flex items-center" style={{ top: topPosition, overflowX: 'clip', overflowY: 'visible' }}>
                    <div className="w-full relative">
                        <div
                            ref={wrapperRef}
                            className="relative mobile-timeline-wrapper"
                            style={{
                                opacity: isReady ? 1 : 0,
                                transition: 'opacity 0.2s ease-out',
                                overflowX: 'clip',
                                overflowY: 'visible'
                            }}
                        >
                            {/* Layer 1: Glow layer (absolute, no mask, overflow visible) */}
                            <div className="absolute inset-0 overflow-visible pointer-events-none mobile-timeline-glow-layer">
                                <motion.div
                                    className="flex items-stretch mobile-timeline-cards"
                                    style={{ x }}
                                >
                                    {processSteps.map((step, index) => (
                                        <MobileCard
                                            key={`glow-${step.step}`}
                                            step={step}
                                            index={index}
                                            totalSteps={processSteps.length}
                                            scrollProgress={scrollYProgress}
                                            variant="glow-only"
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Layer 2: Content layer (base layer with mask) */}
                            <div
                                style={{
                                    maskImage,
                                    WebkitMaskImage: maskImage
                                }}
                            >
                                <motion.div
                                    ref={cardsRef}
                                    className="flex items-stretch mobile-timeline-cards"
                                    style={{ x }}
                                >
                                    {processSteps.map((step, index) => (
                                        <MobileCard
                                            key={`content-${step.step}`}
                                            step={step}
                                            index={index}
                                            totalSteps={processSteps.length}
                                            scrollProgress={scrollYProgress}
                                            variant="content-only"
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileTimeline;
