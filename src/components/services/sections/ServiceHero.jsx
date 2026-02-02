import React from 'react';
import ShaderBackgroundDirect from '../../home/ShaderBackgroundDirect';
import { FeatureCard, MainCard } from '../cards';
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards';


const ServiceHero = ({ service }) => {
    return (
        <section className='service-hero-section z-90 relative'>
            {/* Shader Background */}
            <ShaderBackgroundDirect onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

            {/* Content */}
            <div className="service-hero-container relative z-20 text-white">
                {/* Mobile only - MainCard + scrolling features */}
                <div className="md:hidden space-y-4">
                    <MainCard service={service} />
                    {/* Esce dal padding del container, fade allineato al bordo reale */}
                    <div className="service-hero-carousel-bleed pt-8">
                        <InfiniteMovingCards
                            items={service.features}
                            direction="left"
                            speed="slow"
                            pauseOnHover={true}
                            gap="gap-4"
                            className="service-hero-carousel-mask"
                            renderItem={(feature, index) => (
                                <FeatureCard feature={feature} index={index} />
                            )}
                        />
                    </div>
                </div>

                {/* Tablet (md → xl) - MainCard + 3 Feature Cards */}
                <div className="hidden md:block xl:hidden space-y-4">
                    <MainCard service={service} />
                    <div className="grid grid-cols-3 gap-4 pt-8">
                        {service.features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} />
                        ))}
                    </div>
                </div>

                {/* Desktop - Bento Grid */}
                <div className="hidden xl:grid grid-cols-2 gap-4">
                    <MainCard service={service} />
                    <div className="flex flex-col gap-4 h-full">
                        <div className="grid grid-rows-3 gap-4 flex-1">
                            {service.features.map((feature, index) => (
                                <FeatureCard key={index} feature={feature} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
