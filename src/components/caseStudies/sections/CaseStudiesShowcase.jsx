import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { MovingBorderButton } from '../../ui/moving-border-button';
import { caseStudiesData } from '../constants';

// Card content component (shared between ghost and real cards)
const CardContent = ({ study }) => (
    <div
        className="relative overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/60 group cursor-pointer max-h-[80dvh]"
        style={{
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
            <div className="absolute top-4 left-4">
                <MovingBorderButton variant="tag" color="cyan" as="span">
                    <p className="text-tag">{study.category}</p>
                </MovingBorderButton>
            </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
            <h3 className="heading-h3 text-white mb-2 line-clamp-1">
                {study.client}
            </h3>
            <p className="text-body-sm mb-4 line-clamp-2">
                {study.description}
            </p>
            <div className="flex gap-6 mb-4">
                {study.stats.slice(0, 2).map((stat, statIndex) => (
                    <div key={statIndex}>
                        <div className="stats-value-light">
                            {stat.value}
                        </div>
                        <div className="text-label-sm">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span>View case study</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </div>
);

// Single card that gets "dealt" away on scroll
const StackedCard = ({ study, index, totalCards, scrollYProgress }) => {
    const isLastCard = index === totalCards - 1;

    // Each card has its own scroll segment (last card doesn't need exit segment)
    const cardsToAnimate = totalCards - 1;
    const segmentSize = cardsToAnimate > 0 ? 1 / cardsToAnimate : 1;
    const cardStart = index * segmentSize;
    const cardEnd = Math.min((index + 1) * segmentSize, 1);

    // Card exits to alternating sides
    const exitDirection = index % 2 === 0 ? -1 : 1;

    // Stack rotation - alternating directions for casual stack look
    // Pattern: 0, -3, 5, -4, 6, -2... (alternating with slight variation)
    const rotationDirection = index % 2 === 0 ? 1 : -1;
    const baseRotation = [0, 3, 5, 4, 6, 3, 5, 4][index % 8]; // Varied amounts
    const stackRotation = index === 0 ? 0 : rotationDirection * baseRotation;

    // Exit offset Y - varied vertical positions for non-repetitive movement
    const exitOffsetY = [0, -80, 120, -50, 90, -100, 60, -30][index % 8];

    // X position: exits completely off screen (last card stays)
    const x = useTransform(
        scrollYProgress,
        [cardStart, cardStart + segmentSize * 0.1, cardEnd],
        isLastCard ? [0, 0, 0] : [0, 0, exitDirection * 1800] // Increased to fully exit
    );

    // Y position: adds vertical offset during exit
    const y = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        isLastCard ? [0, 0] : [0, exitOffsetY]
    );

    // Rotation: starts with stack rotation, straightens when active, then exits rotated
    const rotate = useTransform(
        scrollYProgress,
        isLastCard
            ? [Math.max(0, cardStart - segmentSize), cardStart]
            : [Math.max(0, cardStart - segmentSize), cardStart, cardEnd],
        isLastCard
            ? [stackRotation, 0]
            : [stackRotation, 0, exitDirection * 25]
    );

    // Z-index based on position in stack
    const zIndex = totalCards - index;

    return (
        <Link href={study.link} passHref legacyBehavior>
            <motion.a
                className="absolute inset-0 block"
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
                <CardContent study={study} />
            </motion.a>
        </Link>
    );
};

const CaseStudiesShowcase = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(500); // fallback

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const showcaseStudies = caseStudiesData;

    // Measure card height dynamically
    useEffect(() => {
        const measureHeight = () => {
            if (cardRef.current) {
                setCardHeight(cardRef.current.offsetHeight);
            }
        };

        measureHeight();
        window.addEventListener('resize', measureHeight);
        return () => window.removeEventListener('resize', measureHeight);
    }, []);

    // Calculate total scroll height needed for all card animations
    const cardsToAnimate = showcaseStudies.length - 1;
    const scrollHeight = `${cardsToAnimate * 100}vh`;

    return (
        <section
            ref={containerRef}
            className="relative bg-[#020617] overflow-x-clip"
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Header - normal flow */}
            <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-36 text-center px-4">
                <span className="text-label text-cyan-500 mb-3 block">
                    Our Work
                </span>
                <h2 className="heading-h2 text-white">
                    Featured Projects
                </h2>
            </div>

            {/* Cards section - starts in normal flow, then becomes sticky */}
            <div style={{ height: `calc(${scrollHeight} + ${cardHeight}px)` }}>
                <div
                    className="sticky"
                    style={{ top: `calc(50dvh - ${cardHeight / 2}px)` }}
                >
                    {/* Cards stack container */}
                    <div className="relative max-w-2xl mx-auto px-6 sm:px-6">
                        {/* Ghost card to define height - invisible but in flow */}
                        <div ref={cardRef} className="invisible">
                            <CardContent study={showcaseStudies[0]} />
                        </div>

                        {/* Actual cards - absolute positioned, respects parent padding */}
                        <div className="absolute inset-y-0 left-6 right-6 sm:left-6 sm:right-6">
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
            </div>
        </section>
    );
};

export default CaseStudiesShowcase;
