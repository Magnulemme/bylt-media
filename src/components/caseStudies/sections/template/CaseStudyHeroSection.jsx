import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useShaderBackground } from '@/hooks/useShaderBackground';
import { getIcon } from './utils';
import ShaderBackground from '@/components/home/ShaderBackground';

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

const CaseStudyHeroSection = ({ data, imageUrl, study }) => {
    const [currentStat, setCurrentStat] = useState(0);
    const stats = data.stats || [];

    useEffect(() => {
        if (stats.length === 0) return;
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    // Overview items dal study
    const overviewItems = study ? [
        { title: 'Client', value: study.client, iconName: 'User' },
        { title: 'Industry', value: study.industry, iconName: 'Car' },
        { title: 'Duration', value: study.overview?.duration || 'N/A', iconName: 'Clock' },
        { title: 'Platforms', value: study.overview?.platforms || 'N/A', iconName: 'Globe' }
    ] : [];

    // Signal ready on mount
    useEffect(() => {
        signalPageReady();
    }, []);

    return (
        <section className="relative overflow-hidden">
        <ShaderBackground />
            {/* Content */}
            <div className="relative flex flex-col items-center justify-center px-4 pt-24 md:pt-32 pb-16 z-20">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-inter leading-[1.2] mb-6"
                    >
                        {data.headline.map((line, i) => (
                            <span
                                key={i}
                                className={`block ${i === data.highlightIndex
                                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                                    : 'text-white'
                                    }`}
                            >
                                {line}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        {data.subtitle}
                    </motion.p>

                    {/* Stats carousel */}
                    {stats.length > 0 && (
                        <StatsCarousel
                            stats={stats}
                            currentStat={currentStat}
                            setCurrentStat={setCurrentStat}
                        />
                    )}
                </div>

                {/* Project Overview Content - ora dentro la Hero */}
                {study && (
                    <div className="w-full max-w-6xl mx-auto mt-16">
                        <ProjectShowcase
                            imageUrl={imageUrl}
                            overviewItems={overviewItems}
                        />
                        {/* Mobile: solo testo sotto l'immagine */}
                        <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
                            {overviewItems.map((item) => (
                                <div key={item.title} className="text-center">
                                    <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white font-bold font-inter">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {data.testimonial && <ClientTestimonial testimonial={data.testimonial} />}

                        {/* What We Did - Services */}
                        {study.services && (
                            <WhatWeDid services={study.services} />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

// Client Testimonial sub-component
const ClientTestimonial = ({ testimonial }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 max-w-2xl mx-auto"
    >
        <blockquote className="relative">
            <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed">
                "{testimonial.quote}"
            </p>
            <footer className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-white font-medium">{testimonial.author}</span>
                <span className="text-slate-500">—</span>
                <span className="text-slate-400">{testimonial.role}</span>
                {testimonial.company && (
                    <>
                        <span className="text-slate-500">@</span>
                        <span className="text-cyan-400">{testimonial.company}</span>
                    </>
                )}
            </footer>
        </blockquote>
    </motion.div>
);

// Stat Card con shader background
const StatCard = ({ stat, index, currentStat, totalStats, onClick }) => {
    const Icon = getIcon(stat.icon);
    const isActive = index === currentStat;
    const isPrevious = index === (currentStat - 1 + totalStats) % totalStats;
    const isNext = index === (currentStat + 1) % totalStats;

    const { containerRef, canvasRef } = useShaderBackground({
        colors: {
            color1: 0x22d3ee,
            color2: 0x06b6d4,
            color3: 0x0891b2,
        },
        priority: 15,
        targetFPS: 12,
        enableVisibilityTracking: true,
    });

    let transformClasses = '';
    if (isActive) {
        transformClasses = 'opacity-100 scale-100 z-20';
    } else if (isPrevious) {
        transformClasses = 'opacity-30 scale-75 -translate-x-32 z-10';
    } else if (isNext) {
        transformClasses = 'opacity-30 scale-75 translate-x-32 z-10';
    } else {
        transformClasses = 'opacity-0 scale-50 pointer-events-none';
    }

    return (
        <div
            className={`absolute w-fit px-8 p-5 rounded-2xl border border-gray-800 bg-slate-950/60 backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer hover:border-gray-700 overflow-hidden ${transformClasses}`}
            onClick={onClick}
        >
            {/* Shader background */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 opacity-40"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ borderRadius: '1rem' }}
                />
            </div>
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                    <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-white font-inter">
                        {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">
                        {stat.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Carousel sub-component
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative h-32 md:h-28 flex items-center justify-center"
    >
        {stats.map((stat, index) => (
            <StatCard
                key={index}
                stat={stat}
                index={index}
                currentStat={currentStat}
                totalStats={stats.length}
                onClick={() => setCurrentStat(index)}
            />
        ))}
    </motion.div>
);

// Service Card con shader background
const ServiceCard = ({ service, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const { containerRef, canvasRef } = useShaderBackground({
        colors: {
            color1: 0x22d3ee,
            color2: 0x06b6d4,
            color3: 0x0891b2,
        },
        priority: 15,
        targetFPS: 12,
        enableVisibilityTracking: true,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative px-5 py-3 rounded-xl border border-cyan-500/30 bg-slate-950/60 hover:border-cyan-500/50 transition-colors duration-300 overflow-hidden"
        >
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 opacity-40"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ borderRadius: '0.75rem' }}
                />
            </div>
            <span className="relative z-10 text-sm text-white group-hover:text-cyan-300 transition-colors">
                {service}
            </span>
        </motion.div>
    );
};

// What We Did section
const WhatWeDid = ({ services }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    if (!services || services.length === 0) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
        >
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

// Overview Card con shader background
const OverviewCard = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const { containerRef, canvasRef } = useShaderBackground({
        colors: {
            color1: 0x22d3ee,
            color2: 0x06b6d4,
            color3: 0x0891b2,
        },
        priority: 15,
        targetFPS: 12,
        enableVisibilityTracking: true,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-cyan-500/30 bg-slate-950/60 hover:border-cyan-500/50 transition-colors duration-300 overflow-hidden min-h-24 lg:min-h-35"
        >
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 opacity-40"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ borderRadius: '1rem' }}
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {item.title}
                </h3>
                <p className="text-sm md:text-base text-white font-bold font-inter group-hover:text-cyan-300 transition-colors">
                    {item.value}
                </p>
            </div>
        </motion.div>
    );
};

// Project Showcase con immagine e cards sovrapposte
const ProjectShowcase = ({ imageUrl, overviewItems }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    if (!imageUrl) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
        >
            <div className="aspect-video">
                <img
                    src={imageUrl}
                    alt="Project showcase"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Tablet+Desktop: Overview cards al centro */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                    {overviewItems.map((item, index) => (
                        <OverviewCard key={item.title} item={item} index={index} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CaseStudyHeroSection;
