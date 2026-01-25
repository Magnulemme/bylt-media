import React from 'react';
import { MovingBorderButton } from '../../ui/moving-border-button';

const ServiceCTA = () => {
    return (
        <section
            className="service-cta-section relative overflow-hidden"
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <div className="service-cta-container text-center">
                <h2 className="heading-h1 text-white mb-6">
                    Ready to Get Started?
                </h2>
                <p className="text-subheader mb-8 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve your goals. Get a free audit and see what's possible.
                </p>
                <div className="relative z-10 flex justify-center w-full pt-8 pb-8">
                    <MovingBorderButton
                        type="submit"
                        borderRadius="0.75rem"
                        containerClassName="min-w-[240px] h-16"
                        borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                        className="border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed bg-slate-950"
                        duration={2500}
                    >
                        Get Free Audit
                    </MovingBorderButton>
                </div>
            </div>
        </section>
    );
};

export default ServiceCTA;
