import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'motion/react';
import ShaderBackground from '@/components/home/ShaderBackground';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import QuoteCard from '@/components/ui/QuoteCard';

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
            {/* ShaderBackground sempre visibile */}
            <ShaderBackground />

            {/* Content */}
            <div className="relative z-20 px-(--margin-safe-x) pt-padding-lg pb-padding-lg">
                <div className="max-w-(--breakpoint-content) mx-auto">
                    {/* Card con immagine come sfondo su desktop */}
                    <div className="relative rounded-2xl overflow-hidden lg:min-h-[500px]">
                        {/* Immagine come sfondo su desktop */}
                        {imageUrl && (
                            <div className="absolute inset-0 hidden lg:block">
                                <img
                                    src={imageUrl}
                                    alt="Project showcase"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay gradient per leggibilità */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />
                            </div>
                        )}

                        {/* Content sovrapposto */}
                        <div className="relative z-10 py-padding-lg lg:py-padding-xl">
                            <div className="text-center max-w-4xl mx-auto px-4">
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

                            {/* Overview info */}
                            {study && (
                                <div className="mt-padding-lg px-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                        {overviewItems.map((item) => (
                                            <div key={item.title}>
                                                <p className="text-label-sm mb-1">{item.title}</p>
                                                <p className="text-body-lg text-white font-bold">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* What We Did - Services (inside image) */}
                            {study?.services && (
                                <WhatWeDid services={study.services} />
                            )}

                        </div>
                    </div>

                    {/* Immagine visibile solo su mobile/tablet */}
                    {imageUrl && (
                        <div className="lg:hidden mt-padding-md">
                            <ProjectShowcase imageUrl={imageUrl} />
                        </div>
                    )}

                    {/* Client Testimonial - sotto l'immagine */}
                    {data.testimonial && (
                        <div className="mt-padding-lg">
                            <ClientTestimonial testimonial={data.testimonial} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Client Testimonial sub-component
const ClientTestimonial = ({ testimonial }) => (
    <QuoteCard
        quote={testimonial.quote}
        author={testimonial.author}
        role={testimonial.role}
        company={testimonial.company}
        brutalist
        showRating
        className="mt-12 max-w-2xl mx-auto"
    />
);

// Stat Card - memoized to prevent re-renders affecting border animation
const StatCard = memo(({ stat, index, currentStat, totalStats, onClick }) => {
    const isActive = index === currentStat;
    const isPrevious = index === (currentStat - 1 + totalStats) % totalStats;
    const isNext = index === (currentStat + 1) % totalStats;
    const isSecondary = isPrevious || isNext;

    // Calcola translateX in base alla posizione
    let translateX = 0;
    let scale = 1;
    let zIndex = 0;
    let opacity = 1;

    if (isActive) {
        translateX = 0;
        scale = 1;
        zIndex = 20;
    } else if (isPrevious) {
        translateX = -128; // -32 * 4 = -128px
        scale = 0.75;
        zIndex = 10;
    } else if (isNext) {
        translateX = 128;
        scale = 0.75;
        zIndex = 10;
    } else {
        opacity = 0;
        scale = 0.5;
    }

    return (
        <div
            className="col-start-1 row-start-1 cursor-pointer transition-all duration-500 ease-out"
            style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: opacity === 0 ? 'none' : 'auto'
            }}
            onClick={onClick}
        >
            <div
                className={`h-full rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                    isActive
                        ? 'bg-white/10 border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/10'
                }`}
                style={{
                    filter: isSecondary ? 'blur(0.5px)' : 'none'
                }}
            >
                <div className="h-full flex flex-col justify-center text-center px-6 py-4">
                    <div
                        className="stats-value-light"
                        style={isSecondary ? {
                            background: 'linear-gradient(to right, rgba(34,211,238,0.5), rgba(59,130,246,0.5), rgba(147,51,234,0.5))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        } : undefined}
                    >
                        {stat.value}
                    </div>
                    <div className={isActive ? 'text-label-sm font-medium text-white/90' : 'text-label-sm text-white/50'}>
                        {stat.label}
                    </div>
                </div>
            </div>
        </div>
    );
});

// Stats Carousel sub-component
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid w-fit mx-auto"
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
