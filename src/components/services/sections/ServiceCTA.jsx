import React from 'react';
import { MovingBorderButton } from '../../ui/moving-border-button';

const ServiceCTA = () => {
    return (
        <section
            className="py-24 relative overflow-hidden"
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter">
                    Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
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
