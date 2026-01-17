import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShaderBackground from '../../home/ShaderBackground';
import { FeatureCard, ProcessCard, MainCard } from '../cards';

const ServiceHero = ({ service }) => {
    const [isAtEnd, setIsAtEnd] = useState(false);

    const getFadeMask = () => {
        if (isAtEnd) return 'none';
        return 'linear-gradient(to right, black, black calc(100% - 80px), transparent)';
    };

    return (
        <section className='z-90 relative '>
            {/* Shader Background */}
            <ShaderBackground onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

            {/* Content */}
            <div className="relative z-20 text-white max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
                {/* Bento Grid - Desktop */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                    {/* Left Column - Main Card with Image */}
                    <MainCard service={service} />

                    {/* Right Column - 3 Feature Cards */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="grid grid-rows-3 gap-4 flex-1">
                            {service.features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    feature={feature}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                    {/* Main Card */}
                    <MainCard service={service} />

                    {/* Features - Vertical Stack */}
                    <div>
                        <div className="space-y-3">
                            {service.features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    feature={feature}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Process Swiper */}
                    <div className="overflow-x-clip overflow-y-visible -mx-4">
                        <div
                            className="relative pl-4"
                            style={{
                                maskImage: getFadeMask(),
                                WebkitMaskImage: getFadeMask(),
                                transition: 'mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out'
                            }}
                        >
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={1.15}
                                slidesOffsetAfter={16}
                                style={{ overflow: 'visible' }}
                                onSlideChange={(swiper) => setIsAtEnd(swiper.isEnd)}
                                onReachEnd={() => setIsAtEnd(true)}
                                onFromEdge={() => setIsAtEnd(false)}
                            >
                                {service.process.slice(0, 3).map((step, index) => (
                                    <SwiperSlide key={`process-${step.step}`}>
                                        <ProcessCard
                                            step={step}
                                            index={index}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* Process Row - Desktop Grid */}
                <div className="hidden md:block mt-4">
                    <div className="grid grid-cols-3 gap-4">
                        {service.process.slice(0, 3).map((step, index) => (
                            <ProcessCard
                                key={step.step}
                                step={step}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
