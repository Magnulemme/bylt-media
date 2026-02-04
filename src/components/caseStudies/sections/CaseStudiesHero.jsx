import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import ShaderBackgroundDirect from '../../home/ShaderBackgroundDirect';
import { MovingBorderButton } from '../../ui/moving-border-button';
import { caseStudiesData, heroContent } from '../constants';
import { useCardCentering } from '../hooks/useCardCentering';
// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/casestudies') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

// Checklist data
const checklistItems = [
    'Data-driven strategies',
    'Transparent reporting',
    'Dedicated account manager',
    'No long-term contracts'
];

// Card content component
const CardContent = ({ study, overlayOpacity }) => ( 
    <div
        className="relative overflow-hidden rounded-2xl border border-white/10 group cursor-pointer"
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
            {/* Category tag */}
            <div className='md:flex justify-between flex-row-reverse items-center pt-4'>
            <div className="flex gap-2 flex-wrap h-fit">
                <MovingBorderButton variant="tag" color="cyan" as="span">
                    <p className="text-tag">{study.category}</p>
                </MovingBorderButton>
                <MovingBorderButton variant="tag" color="purple" as="span">
                    <p className="text-tag">{study.industry}</p>
                </MovingBorderButton>
            </div>

            {/* Client name */}
            <h3 className="heading-h3 text-white mt-3 mb-3 line-clamp-1">
                {study.client}
            </h3>
            </div>

            {/* Description */}
            <p className="text-body-sm mb-6 line-clamp-2">
                {study.description}
            </p>

            {/* Stats - 2 columns, each stat stacked vertically */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {study.stats.slice(0, 2).map((stat, statIndex) => (
                    <div key={statIndex}>
                        <span className="block stats-value-light">
                            {stat.value}
                        </span>
                        <span className="text-label-sm">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <span className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                <span>View Case Study</span>
                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
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
        <Link href={study.link} passHref legacyBehavior>
            <motion.a
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
        </Link>
    );
};

const CaseStudiesHero = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const stickyRef = useRef(null);
    const stickyContentRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(500);
    const [animationStartOffset, setAnimationStartOffset] = useState(0);

    const showcaseStudies = caseStudiesData;

    // Calculate centering and text visibility
    const { showText, stickyTop, stickyTopNumeric } = useCardCentering(stickyContentRef, cardHeight);

    // Use useLayoutEffect for measurements to prevent layout shift
    useLayoutEffect(() => {
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
    useLayoutEffect(() => {
        const calculateOffset = () => {
            if (stickyRef.current && containerRef.current) {
                const stickyRect = stickyRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();

                // Position of sticky container relative to section
                const cardY = stickyRect.top - containerRect.top;

                // Sticky point: use the calculated stickyTop from the hook
                const stickyPoint = stickyTopNumeric;

                // Animation starts when card reaches its sticky position
                setAnimationStartOffset(Math.max(0, cardY - stickyPoint));
            }
        };

        calculateOffset();
        window.addEventListener('resize', calculateOffset);
        return () => window.removeEventListener('resize', calculateOffset);
    }, [cardHeight, stickyTopNumeric]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: [`${animationStartOffset}px start`, "end end"]
    });

    const cardsToAnimate = showcaseStudies.length - 1;
    const scrollHeight = `${cardsToAnimate * 100}vh`;

    return (
        <div style={{ overflow: 'clip' }}><div
        className="relative sticky z-0 overflow-hidden rounded-2xl"
        style={{ top: '-12px', height: 'calc(100dvh + 24px)', background: '#020617' }}
    >
        <ShaderBackgroundDirect onReady={signalPageReady} />
    </div>
<section ref={containerRef} className="relative" style={{ height: `calc(${scrollHeight} + ${cardHeight}px + 100vh)` }}>
    {/* Content container - positioned over shader */}
    <div className="relative z-10 h-full" style={{ marginTop: '-100dvh' }}>
        {/* Header - scrolls normally */}
        <div className="pt-16 md:pt-24 pb-16 md:pb-24 xl:pb-32 text-center px-4 max-w-4xl mx-auto">
            <h1 className="heading-page bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
            </h1>
            <p className="text-body-lg mt-6 max-w-2xl mx-auto">
                {heroContent.description}
            </p>
        </div>

        {/* Sticky cards container */}
        <div
            ref={stickyRef}
            className="sticky"
            style={{ top: stickyTop }}
        >
            <div ref={stickyContentRef} className="flex flex-col">
                <div className="relative mx-auto px-6 max-w-[min(768px,85vw)] md:max-w-[min(768px,90vw)]">
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

                {/* Title below cards - conditionally shown based on available space */}
                {showText && (
                    <div className="text-center pt-12 px-4 max-w-5xl mx-auto">
                        <h3 className="heading-h2 text-white mb-3">
                            Results That Speak for Themselves
                        </h3>
                        <p className="text-body">
                            Every project is a partnership built on data, creativity, and measurable outcomes.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>

</section>

{/* Stats grid - scrolls up after sticky section */}
<div className="relative z-20 text-center pb-24 px-4 max-w-5xl mx-auto">
    {/* Title shown here when not enough space in sticky section */}
    {!showText && (
        <div className="text-center pt-12 pb-16 md:pb-20 max-w-5xl mx-auto">
            <h3 className="heading-h2 text-white mb-3">
                Results That Speak for Themselves
            </h3>
            <p className="text-body">
                Every project is a partnership built on data, creativity, and measurable outcomes.
            </p>
        </div>
    )}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {checklistItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
            </div>
        ))}
    </div>
</div>
</div>
    );
};

export default CaseStudiesHero;
