import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ShaderBackground from '../../home/ShaderBackground';
import { caseStudiesData, heroContent } from '../constants';

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/casestudies') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

// Card content component
const CardContent = ({ study, overlayOpacity }) => (
    <div
        className="relative overflow-hidden rounded-2xl border border-white/10 group cursor-pointer max-h-[80dvh]"
        style={{
            backgroundColor: '#020617',
            maskImage: 'radial-gradient(white, black)',
            WebkitMaskImage: 'radial-gradient(white, black)',
            isolation: 'isolate',
        }}
    >
        {/* Image */}
        <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden">
            <img
                src={study.imageUrl}
                alt={study.client}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient fade to background */}
            <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #020617, transparent)' }}
            />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 md:px-8 md:pb-8">
            {/* Category - subtle */}
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
                {study.category} · {study.industry}
            </span>

            {/* Client name */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3 line-clamp-1">
                {study.client}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                {study.description}
            </p>

            {/* Stats - 2 columns, each stat stacked vertically */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {study.stats.slice(0, 2).map((stat, statIndex) => (
                    <div key={statIndex}>
                        <span className="block text-xl md:text-2xl font-bold text-white">
                            {stat.value}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span>View Case Study</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
        </div>

        {/* Dark overlay for depth - only rendered when overlayOpacity is provided */}
        {overlayOpacity && (
            <motion.div
                className="absolute inset-0 bg-black rounded-2xl pointer-events-none"
                style={{ opacity: overlayOpacity }}
            />
        )}
    </div>
);

// Single card that gets "dealt" away on scroll
const StackedCard = ({ study, index, totalCards, scrollYProgress }) => {
    const isLastCard = index === totalCards - 1;

    const cardsToAnimate = totalCards - 1;
    const segmentSize = cardsToAnimate > 0 ? 1 / cardsToAnimate : 1;
    const cardStart = index * segmentSize;
    const cardEnd = Math.min((index + 1) * segmentSize, 1);

    const exitDirection = index % 2 === 0 ? -1 : 1;

    const rotationDirection = index % 2 === 0 ? 1 : -1;
    const baseRotation = [0, 3, 5, 4, 6, 3, 5, 4][index % 8];
    const stackRotation = index === 0 ? 0 : rotationDirection * baseRotation;

    const exitOffsetY = [0, -80, 120, -50, 90, -100, 60, -30][index % 8];

    const x = useTransform(
        scrollYProgress,
        [cardStart, cardStart + segmentSize * 0.1, cardEnd],
        isLastCard ? [0, 0, 0] : [0, 0, exitDirection * 1800]
    );

    const y = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        isLastCard ? [0, 0] : [0, exitOffsetY]
    );

    const rotate = useTransform(
        scrollYProgress,
        isLastCard
            ? [Math.max(0, cardStart - segmentSize), cardStart]
            : [Math.max(0, cardStart - segmentSize), cardStart, cardEnd],
        isLastCard
            ? [stackRotation, 0]
            : [stackRotation, 0, exitDirection * 25]
    );

    // Dark overlay for depth effect - dynamically updates as cards slide away
    // Each time a card ahead slides away, this card's overlay decreases
    const progressSteps = [];
    const overlaySteps = [];
    for (let i = 0; i <= index; i++) {
        progressSteps.push(i * segmentSize);
        overlaySteps.push(Math.max(0, (index - i) * 0.18));
    }
    const overlayOpacity = useTransform(scrollYProgress, progressSteps, overlaySteps);

    const zIndex = totalCards - index;

    return (
        <motion.a
            href={study.link}
            className="absolute inset-0 block overflow-hidden rounded-2xl"
            style={{
                x,
                y,
                rotate,
                zIndex,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                perspective: 1000,
            }}
        >
            <CardContent study={study} overlayOpacity={overlayOpacity} />
        </motion.a>
    );
};

const CaseStudiesHero = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const stickyRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(500);
    const [animationStartOffset, setAnimationStartOffset] = useState(0);

    const showcaseStudies = caseStudiesData;

    useEffect(() => {
        const measure = () => {
            if (cardRef.current) {
                setCardHeight(cardRef.current.offsetHeight);
            }
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Calculate animation start offset based on sticky container position
    useEffect(() => {
        const calculateOffset = () => {
            if (stickyRef.current && containerRef.current) {
                const stickyRect = stickyRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();

                // Position of sticky container relative to section
                const cardY = stickyRect.top - containerRect.top;

                // Sticky point: where card centers in viewport
                const stickyPoint = window.innerHeight / 2 - cardHeight / 2;

                // Animation starts when card reaches its sticky position
                setAnimationStartOffset(Math.max(0, cardY - stickyPoint));
            }
        };

        calculateOffset();
        window.addEventListener('resize', calculateOffset);
        return () => window.removeEventListener('resize', calculateOffset);
    }, [cardHeight]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: [`${animationStartOffset}px start`, "end end"]
    });

    const cardsToAnimate = showcaseStudies.length - 1;
    const scrollHeight = `${cardsToAnimate * 100}vh`;

    return (
        <div style={{ overflow: 'clip' }}><div
        className="sticky z-0 overflow-hidden rounded-2xl"
        style={{ top: '-12px', height: 'calc(100vh + 24px)' }}
    >
        <ShaderBackground onReady={signalPageReady} />
    </div>
<section ref={containerRef} className="relative" style={{ height: `calc(${scrollHeight} + ${cardHeight}px + 100vh)` }}>
    {/* Shader Background - sticky, oversized to hide rounded corners */}
    

    {/* Content container - positioned over shader */}
    <div className="relative z-10 pb-24 md:pb-32 h-full" style={{ marginTop: '-100vh' }}>
        {/* Header - scrolls normally */}
        <div className="pt-16 md:pt-24 pb-16 md:pb-40 text-center px-4 max-w-4xl mx-auto">
            <span className="text-xs tracking-[0.2em] text-slate-500 uppercase mb-4 block font-inter">
                {heroContent.badge}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter leading-[1.1] mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {heroContent.description}
            </p>
        </div>

        {/* Sticky cards container */}
        <div
            ref={stickyRef}
            className="sticky"
            style={{ top: `calc(50vh - ${cardHeight / 2}px)` }}
        >
            <div className="relative max-w-2xl mx-auto px-6">
                {/* Ghost card for height */}
                <div ref={cardRef} className="invisible">
                    <CardContent study={showcaseStudies[0]} />
                </div>

                {/* Actual stacked cards */}
                <div className="absolute inset-y-0 left-6 right-6">
                    {showcaseStudies.map((study, index) => (
                        <StackedCard
                            key={study.id}
                            study={study}
                            index={index}
                            totalCards={showcaseStudies.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
        {/* Content dopo sticky - sale via con la fine del background */}
    </div>

    
</section>
            <div className='relative z-20 text-center pb-24 px-4 max-w-2xl mx-auto'>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Results That Speak for Themselves
                </h3>
                <p className="text-base text-slate-400">
                    Every project is a partnership built on data, creativity, and measurable outcomes.
                </p>
            </div>
</div>
    );
};

export default CaseStudiesHero;
