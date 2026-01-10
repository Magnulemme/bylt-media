import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ShaderBackground from '../../home/ShaderBackground';
import { heroRotatingPhrases, heroRotatingPhrasesMobile, heroContent } from '../constants';

const RotatingText = ({ phrases, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <span className="inline-block">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className={`inline-block ${className}`}
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.6 }
                    }}
                >
                    {phrases[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const CaseStudiesHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Shader Background */}
            <ShaderBackground />

            {/* Content */}
            <div className="relative z-20 text-white max-w-6xl mx-auto px-4 py-16 md:py-20 lg:py-24 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="text-xs tracking-[0.2em] text-slate-500 uppercase font-inter">
                        {heroContent.badge}
                    </span>
                </motion.div>

                {/* Main Title with Rotating Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="font-bold font-inter leading-[1.1] mb-8"
                >
                    {/* Mobile - shorter phrases */}
                    <span className="block md:hidden text-5xl">
                        <RotatingText
                            phrases={heroRotatingPhrasesMobile}
                            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                        />
                    </span>
                    {/* Tablet/Desktop - full phrases */}
                    <span className="hidden md:block md:text-6xl lg:text-7xl xl:text-8xl">
                        <RotatingText
                            phrases={heroRotatingPhrases}
                            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                        />
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    {heroContent.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href={heroContent.ctaPrimary.href}
                        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                        <span className="relative z-10">{heroContent.ctaPrimary.text}</span>
                    </a>
                    <a
                        href={heroContent.ctaSecondary.href}
                        className="group px-8 py-4 rounded-xl font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/5"
                    >
                        {heroContent.ctaSecondary.text}
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                        <motion.div
                            animate={{
                                y: [0, 12, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudiesHero;
