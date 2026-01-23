import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import DitherProcessCard from '@/components/ui/DitherProcessCard';
import FadeMask from '@/components/ui/FadeMask';

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

            {/* Mobile Swiper */}
            <FadeMask fade="both" fadeSize={24} className="md:hidden relative z-10 pb-2">
                <Swiper
                    spaceBetween={12}
                    slidesPerView="auto"
                    slidesOffsetBefore={16}
                    slidesOffsetAfter={16}
                    className="process-swiper overflow-visible! py-1"
                >
                    {process.map((step, index) => (
                        <SwiperSlide
                            key={step.step}
                            style={{ width: 'calc(100vw - 140px)' }}
                            className="h-auto!"
                        >
                            <DitherProcessCard
                                step={step}
                                index={index}
                                isMobile
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </FadeMask>

            {/* Desktop Grid */}
            <div className="max-w-5xl mx-auto px-4 relative">
                <div className="hidden md:grid grid-cols-2 gap-6">
                    {process.map((step, index) => (
                        <DitherProcessCard
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

export default ProcessGrid;
