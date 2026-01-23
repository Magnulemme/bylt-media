import React from 'react';
import DitherProcessCard from '../../ui/DitherProcessCard';

const ServiceProcess = ({ service }) => {
    // Duplicate cards for seamless infinite loop
    const steps = service.process;
    const duplicated = [...steps, ...steps];

    return (
        <section className="relative z-20 py-16 md:py-20 overflow-hidden" style={{ background: '#020617' }}>
            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-10">
                <p className="text-tag text-cyan-400 mb-2">HOW WE WORK</p>
                <h2 className="heading-h2 text-white">Our Process</h2>
            </div>

            {/* Infinite Scroll Track */}
            <div className="relative max-w-6xl mx-auto group">
                {/* Fade left */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
                {/* Fade right */}
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden pb-2">
                    <div className="flex gap-5 animate-scroll group-hover:[animation-play-state:paused]">
                        {duplicated.map((step, index) => (
                            <div
                                key={`${step.step}-${index}`}
                                className="shrink-0 w-[320px] md:w-95"
                            >
                                <DitherProcessCard
                                    step={step}
                                    index={index % steps.length}
                                    isMobile
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceProcess;
