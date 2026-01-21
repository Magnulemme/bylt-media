import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DataVisualization3D from './DataVisualization3D';
import ShaderBackgroundStandalone from './ShaderBackgroundStandalone';
import { MovingBorderButton } from '../ui/moving-border-button';

import { useProfiler } from '@/hooks/useProfiler';

// Callback to signal Hero is ready
const signalHeroReady = () => {
    window.dispatchEvent(new CustomEvent('hero-ready'));
};

// Optimized Hero Section with typing effect and side-by-side layout
const FuturisticHero = () => {
    useProfiler('FuturisticHero');
    // Determine if mobile/tablet
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Memoize texts array to prevent recreation - shorter on mobile
    const texts = useMemo(() => {
        if (isMobile) {
            return [
                "Digital",
                "Performance",
                "AI Solutions",
                "Growth"
            ];
        }
        return [
            "Digital Futures",
            "Performance",
            "AI Solutions",
            "Growth"
        ];
    }, [isMobile]);

    // Rotating text index for fade effect
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [texts.length]);


    return (
        <section
            id="home"
            className="hero-section"
            data-hero-section
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <div className="hero-inner bg-hero">
                {/* Shader Background */}
                <ShaderBackgroundStandalone onReady={signalHeroReady} />

                <div className="container-centered">
                <div className="hero-grid">
                    {/* Left side - Text content */}
                    <div className="hero-content">
                        <h1 className="hero-title font-inter relative z-20">
                            <div className="text-white mb-padding-xs">
                                We Build
                            </div>
                            <div className="animated-text-container">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={textIndex}
                                        className="text-gradient animated-gradient inline-block pb-4"
                                        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.25, 0.1, 0.25, 1],
                                            opacity: { duration: 0.6 }
                                        }}
                                    >
                                        {texts[textIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>

                        {/* Description - Mobile & Tablet */}
                        <div className="xl:hidden relative w-full max-w-md md:max-w-lg mx-auto">
                            {/* 3D Sphere as background */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] opacity-40 pointer-events-none" style={{ marginTop: 'calc(-1 * var(--navbar-height-mobile))' }}>
                                <DataVisualization3D />
                            </div>

                            {/* Description Text */}
                            <p className="relative z-10 text-body-lg text-center max-w-lg mx-auto">
                                A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                            </p>

                            {/* CTAs - Mobile & Tablet */}
                            <div className="pt-padding-sm flex flex-col gap-padding-xs relative z-10 md:max-w-sm md:mx-auto items-center">
                                <div className="flex justify-center w-full">
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
                                <a
                                    href="#services"
                                    className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
                                >
                                    <span>Explore Services</span>
                                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Description - Desktop only */}
                        <p className="hidden xl:block text-lg text-gray-300 leading-relaxed max-w-xl">
                            A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                        </p>

                        {/* CTAs - Desktop */}
                        <div className="hidden xl:flex flex-row items-center gap-padding-md pt-padding-lg">
                        <div className="flex justify-center">
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
                            <a
                                href="#services"
                                className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
                            >
                                <span>Explore Services</span>
                                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right side - 3D Data Visualization - Desktop only */}
                    <div className="hidden xl:block relative h-[600px]">
                        <DataVisualization3D />
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default FuturisticHero;
