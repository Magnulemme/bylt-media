import React from 'react';
import DitherProcessCard from '../../ui/DitherProcessCard';
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards';

const ServiceProcess = ({ service }) => {
    const steps = service.process;

    return (
        <section className="service-process-section relative z-20 overflow-hidden mx-auto" style={{ background: '#020617' }}>
            {/* Header */}
            <div className="service-process-header text-right">
                <h2 className="heading-h2 text-white">Our Process</h2>
                <p className="text-subheader mt-2">A proven methodology that delivers results, step by step.</p>
            </div>

            {/* Infinite Moving Cards */}
            <div className="service-process-carousel">
                <InfiniteMovingCards
                    items={steps}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                    gap="gap-5"
                    renderItem={(step, index) => (
                        <div className="w-[320px] md:w-95 flex-1 flex flex-col">
                            <DitherProcessCard
                                step={step}
                                index={index}
                                isMobile
                            />
                        </div>
                    )}
                />
            </div>
        </section>
    );
};

export default ServiceProcess;
