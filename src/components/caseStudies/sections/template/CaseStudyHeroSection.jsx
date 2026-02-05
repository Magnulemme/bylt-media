import React, { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import ShaderBackground from '@/components/home/ShaderBackground';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
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

// Stat Card memoized per il carousel desktop
const StatCard = memo(({ stat, index, currentStat, totalStats, onClick, isMobile }) => {
    const isActive = index === currentStat;
    const isPrevious = index === (currentStat - 1 + totalStats) % totalStats;
    const isNext = index === (currentStat + 1) % totalStats;
    const isSecondary = isPrevious || isNext;

    let translateX = 0;
    let scale = 1;
    let zIndex = 0;
    let opacity = 1;

    if (isActive) {
        translateX = 0;
        scale = 1;
        zIndex = 20;
    } else if (isMobile) {
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

// Stats Carousel
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => {
    const isMobile = useIsMobile();

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
                    className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] pb-2"
                    renderItem={(stat) => <MobileStatCard stat={stat} />}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid mx-auto w-fit"
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

const CaseStudyHeroSection = ({ data, imageUrl, study }) => {
    const [currentStat, setCurrentStat] = useState(0);
    const stats = data.stats || [];
    const services = study?.services || [];
    const isMobile = useIsMobile();

    useEffect(() => {
        if (stats.length === 0) return;
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    useEffect(() => {
        signalPageReady();
        // Force scrollbar always visible to prevent layout shift
        document.documentElement.style.overflowY = 'scroll';
        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []);

    return (
            <section className="case-study-hero-section">
                <ShaderBackground />

            <div className="case-study-hero-container w-full">
                {/* Single Hero Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl border border-white/10 bg-slate-950 overflow-hidden"
                        style={{ boxShadow: '8px 8px 0px rgba(34, 211, 238, 1)' }}
                    >
                        {/* Header Section */}
                        <div className="p-6 md:p-10 lg:p-12 text-center border-b border-white/5">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="heading-page mb-4"
                            >
                                {data.headline.map((line, i) => (
                                    <span
                                        key={i}
                                        className={`block ${
                                            i === data.highlightIndex
                                                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                                                : 'text-white'
                                        }`}
                                    >
                                        {line}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="hidden sm:block text-subheader max-w-3xl mx-auto mb-6"
                            >
                                {data.subtitle}
                            </motion.p>

                            {/* Tags Section */}
                            {services.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                    className="sm:flex sm:flex-wrap sm:justify-center sm:gap-3 mb-6 sm:mb-0"
                                >
                                    {isMobile ? (
                                        // Mobile: infinite carousel moving right (opposite to stats)
                                        <InfiniteMovingCards
                                            items={services.map((service, index) => ({
                                                service,
                                                color: ['cyan', 'purple', 'blue', 'pink', 'green'][index % 5]
                                            }))}
                                            direction="right"
                                            speed="20s"
                                            pauseOnHover={true}
                                            gap="gap-3"
                                            className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
                                            renderItem={(item) => (
                                                <MovingBorderButton
                                                    variant="tag"
                                                    color={item.color}
                                                    as="span"
                                                >
                                                    <p className="text-tag whitespace-nowrap">{item.service}</p>
                                                </MovingBorderButton>
                                            )}
                                        />
                                    ) : (
                                        // Desktop: show all tags
                                        services.map((service, index) => {
                                            const colors = ['cyan', 'purple', 'blue', 'pink', 'green'];
                                            const color = colors[index % colors.length];
                                            return (
                                                <MovingBorderButton
                                                    key={index}
                                                    variant="tag"
                                                    color={color}
                                                    as="span"
                                                >
                                                    <p className="text-tag">{service}</p>
                                                </MovingBorderButton>
                                            );
                                        })
                                    )}
                                </motion.div>
                            )}

                            {/* Stats Carousel - mobile only, below tags */}
                            {stats.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="sm:hidden"
                                >
                                    <StatsCarousel
                                        stats={stats}
                                        currentStat={currentStat}
                                        setCurrentStat={setCurrentStat}
                                    />
                                </motion.div>
                            )}
                        </div>

                        {/* Image Section with Stats Carousel Overlay */}
                        <div className="relative">
                            {/* Main Image */}
                            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="Project showcase"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                                )}
                            </div>

                            {/* Stats Carousel - centered on image, hidden on mobile */}
                            {stats.length > 0 && (
                                <div className="hidden sm:flex absolute inset-0 items-center justify-center">
                                    <StatsCarousel
                                        stats={stats}
                                        currentStat={currentStat}
                                        setCurrentStat={setCurrentStat}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                {/* Project Info - Typography Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center place-items-center"
                >
                    {[
                        { label: 'Client', value: study?.client },
                        { label: 'Industry', value: study?.industry },
                        { label: 'Duration', value: study?.overview?.duration },
                        { label: 'Platforms', value: study?.overview?.platforms }
                    ].filter(item => item.value).map((item, index) => (
                        <div key={index}>
                            <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-2">
                                {item.label}
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudyHeroSection;
