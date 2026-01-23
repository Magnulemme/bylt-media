import React from 'react';
import ShaderBackground from '../../home/ShaderBackground';
import { FeatureCard, MainCard } from '../cards';

const ServiceHero = ({ service }) => {
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

                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
