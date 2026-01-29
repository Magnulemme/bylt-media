import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'motion/react';
import ShaderBackground from '@/components/home/ShaderBackground';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

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
                    {/* Headline + Subtitle + Stats - mobile e tablet (< 1024px) */}
                    <div className="show-until-lg text-center max-w-4xl mx-auto px-4 mb-10">
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

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-subheader max-w-2xl mx-auto mb-10"
                        >
                            {data.subtitle}
                        </motion.p>

                        {stats.length > 0 && (
                            <StatsCarousel
                                stats={stats}
                                currentStat={currentStat}
                                setCurrentStat={setCurrentStat}
                            />
                        )}
                    </div>

                    {/* Card con immagine come sfondo - mobile, tablet e desktop */}
                    <div className="relative rounded-2xl overflow-hidden min-h-70 md:min-h-75 lg:min-h-125">
                        {/* Immagine come sfondo - sempre visibile */}
                        {imageUrl && (
                            <div className="absolute inset-0">
                                <img
                                    src={imageUrl}
                                    alt="Project showcase"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />
                            </div>
                        )}

                        {/* Content sovrapposto */}
                        <div className="relative z-10 py-padding-lg lg:py-padding-xl">
                            {/* Headline + Subtitle + Stats - solo desktop (>= 1024px) */}
                            <div className="show-from-lg text-center max-w-4xl mx-auto px-4 mb-10">
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

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-subheader max-w-2xl mx-auto mb-10"
                                >
                                    {data.subtitle}
                                </motion.p>

                                {stats.length > 0 && (
                                    <StatsCarousel
                                        stats={stats}
                                        currentStat={currentStat}
                                        setCurrentStat={setCurrentStat}
                                    />
                                )}
                            </div>

                            {/* Overview info - tablet e desktop (dentro la card) */}
                            {study && (
                                <div className="hidden sm:block md:mt-padding-md lg:mt-padding-lg px-4">
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

                            {/* What We Did - Services */}
                            {study?.services && (
                                <WhatWeDid services={study.services} />
                            )}
                        </div>
                    </div>

                    {/* Overview info - solo mobile (sotto la card) */}
                    {study && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="sm:hidden mt-8 px-4"
                        >
                            <div className="grid grid-cols-2 gap-6 text-center">
                                {overviewItems.map((item) => (
                                    <div key={item.title}>
                                        <p className="text-label-sm mb-1">{item.title}</p>
                                        <p className="text-body-lg text-white font-bold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Hook per rilevare mobile
const useIsMobile = (breakpoint = 640) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};

// Stat Card - memoized to prevent re-renders affecting border animation
const StatCard = memo(({ stat, index, currentStat, totalStats, onClick, isMobile }) => {
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
    } else if (isMobile) {
        // Su mobile nascondi tutte le card non attive
        opacity = 0;
        scale = 0.5;
    } else if (isPrevious) {
        translateX = -128;
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
                className={`h-full rounded-2xl transition-all duration-300 border-2 backdrop-blur-md ${
                    isActive
                        ? 'bg-slate-950/80 border-white/30'
                        : 'bg-slate-950/60 border-white/10'
                }`}
                style={{
                    boxShadow: isActive
                        ? '6px 6px 0px rgba(34, 211, 238, 1)'
                        : '3px 3px 0px rgba(34, 211, 238, 0.3)',
                    filter: isSecondary ? 'blur(0.5px)' : 'none'
                }}
            >
                <div className="h-full flex flex-col justify-center text-center px-8 py-5">
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

// Mobile Stat Card per infinite scroll
const MobileStatCard = ({ stat }) => (
    <div
        className="h-full rounded-2xl border-2 backdrop-blur-md bg-slate-950/80 border-white/30"
        style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)' }}
    >
        <div className="h-full flex flex-col justify-center text-center px-8 py-5">
            <div className="stats-value-light">{stat.value}</div>
            <div className="text-label-sm font-medium text-white/90">{stat.label}</div>
        </div>
    </div>
);

// Stats Carousel sub-component
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => {
    const isMobile = useIsMobile();

    // Su mobile usa InfiniteMovingCards
    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <InfiniteMovingCards
                    items={stats}
                    direction="left"
                    speed="25s"
                    pauseOnHover={true}
                    gap="gap-4"
                    className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                    renderItem={(stat) => <MobileStatCard stat={stat} />}
                />
            </motion.div>
        );
    }

    // Su desktop mantieni il carousel originale
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
                    isMobile={isMobile}
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

export default CaseStudyHeroSection;
