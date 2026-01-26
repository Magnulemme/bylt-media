import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'motion/react';
import ShaderBackground from '@/components/home/ShaderBackground';
import { MovingBorderButton } from '@/components/ui/moving-border-button';

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
            <div className="relative flex flex-col items-center justify-center px-(--margin-safe-x) pt-section-sm pb-padding-lg z-20">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="heading-page mb-6"
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
                        className="text-subheader max-w-2xl mx-auto mb-10"
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
                    <div className="w-full max-w-(--breakpoint-content) mx-auto mt-padding-lg">
                        {/* Overview info as text - 4 columns, 2 rows */}
                        <div className="mb-padding-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {overviewItems.map((item) => (
                                <div key={item.title}>
                                    <p className="text-label-sm mb-1">{item.title}</p>
                                    <p className="text-body-lg text-white font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <ProjectShowcase imageUrl={imageUrl} />

                        {/* What We Did - Services */}
                        {study.services && (
                            <WhatWeDid services={study.services} />
                        )}

                        {/* Client Testimonial */}
                        {data.testimonial && (
                            <ClientTestimonial testimonial={data.testimonial} />
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
            <p className="text-body-lg italic text-slate-300">
                "{testimonial.quote}"
            </p>
            <footer className="mt-4 flex items-center justify-center gap-2 text-body-sm">
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

// Stat Card - memoized to prevent re-renders affecting border animation
const StatCard = memo(({ stat, index, currentStat, totalStats, onClick, minWidth }) => {
    const isActive = index === currentStat;
    const isPrevious = index === (currentStat - 1 + totalStats) % totalStats;
    const isNext = index === (currentStat + 1) % totalStats;

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
            className={`absolute transition-all duration-500 ease-out cursor-pointer ${transformClasses}`}
            onClick={onClick}
        >
            <div
                className={`relative rounded-2xl transition-all duration-300 border border-slate-700 bg-slate-950`}
                style={{ boxShadow: isActive ? '6px 6px 0px rgba(34, 211, 238, 1)' : '3px 3px 0px rgba(34, 211, 238, 0.4)' }}
            >
                <div className="text-center px-6 py-4" style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}>
                    <div className="stats-value-light">
                        {stat.value}
                    </div>
                    <div className="text-label-sm">
                        {stat.label}
                    </div>
                </div>
            </div>
        </div>
    );
});

// Stats Carousel sub-component
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => {
    const [maxWidth, setMaxWidth] = useState(0);
    const measureRef = useRef(null);

    // Measure all cards to find the widest one
    useEffect(() => {
        if (!measureRef.current) return;
        const items = measureRef.current.querySelectorAll('[data-measure]');
        let max = 0;
        items.forEach((item) => {
            const width = item.getBoundingClientRect().width;
            if (width > max) max = width;
        });
        if (max > 0) setMaxWidth(max);
    }, [stats]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-32 md:h-28 flex items-center justify-center"
        >
            {/* Hidden container to measure all cards */}
            <div ref={measureRef} className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                {stats.map((stat, index) => (
                    <div key={index} data-measure className="inline-block px-6 py-4">
                        <div className="stats-value-light">{stat.value}</div>
                        <div className="text-label-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    stat={stat}
                    index={index}
                    currentStat={currentStat}
                    totalStats={stats.length}
                    onClick={() => setCurrentStat(index)}
                    minWidth={maxWidth}
                />
            ))}
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
                    <MovingBorderButton key={index} variant="tag" color="cyan" as="span">
                        <p className="text-tag">{service}</p>
                    </MovingBorderButton>
                ))}
            </div>
        </motion.div>
    );
};

// Project Showcase - solo immagine
const ProjectShowcase = ({ imageUrl }) => {
    if (!imageUrl) return null;

    return (
        <div
            className="rounded-2xl overflow-hidden border border-slate-700"
            style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)' }}
        >
            <div className="aspect-video">
                <img
                    src={imageUrl}
                    alt="Project showcase"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default CaseStudyHeroSection;
