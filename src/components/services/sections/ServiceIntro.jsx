import React from 'react';
import { motion } from 'motion/react';

const ServiceIntro = ({ service }) => {
    return (
        <section className="relative py-16 md:py-24 lg:py-32">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                {/* Service Tag */}
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-4 block"
                >
                    {service.heroTag}
                </motion.span>

                {/* Main Title - White text */}
                <motion.h1
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter mb-4 text-white"
                >
                    {service.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-400"
                >
                    {service.subtitle}
                </motion.p>
            </div>
        </section>
    );
};

export default ServiceIntro;
