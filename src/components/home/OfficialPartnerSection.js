import React, { useState, useEffect, useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { motion, useScroll, useTransform } from 'motion/react';

// Word Component with Motion
const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block mr-[0.25em]"
        >
            {children}
        </motion.span>
    );
};

// Scroll Reveal Text Component - Multiple Lines with Word Opacity
const ScrollRevealText = ({ lines }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"]
    });

    // Divide ogni linea in parole e calcola l'opacità per ogni parola
    const renderLine = (line, lineIndex) => {
        const words = line.split(' ');
        const totalWords = lines.reduce((acc, l) => acc + l.split(' ').length, 0);
        let wordIndex = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.split(' ').length, 0);

        return (
            <h3
                key={lineIndex}
                className="text-3xl md:text-5xl lg:text-6xl font-bold font-inter text-center leading-tight text-white"
            >
                {words.map((word, i) => {
                    const start = wordIndex / totalWords;
                    const end = (wordIndex + 1) / totalWords;
                    wordIndex++;

                    return (
                        <Word key={i} range={[start, end]} progress={scrollYProgress}>
                            {word}
                        </Word>
                    );
                })}
            </h3>
        );
    };

    return (
        <div ref={ref} className="relative py-16 md:py-24 space-y-4 md:space-y-6">
            {lines.map((line, index) => renderLine(line, index))}
        </div>
    );
};

// Animated Stat Component
const AnimatedStat = ({ value, suffix = '', prefix = '', label, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    const animatedValue = useCountUp(value, 2000, isVisible);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-inter mb-2">
                {prefix}{animatedValue}{suffix}
            </div>
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider font-semibold">
                {label}
            </div>
        </div>
    );
};

// Official Partner Section - Show, Don't Tell
const OfficialPartnerSection = () => {
    return (
        <section className="relative pb-8 md:pb-12 overflow-hidden" style={{ background: '#020617' }}>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

            <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
                {/* Scroll Reveal Intermezzo */}
                <ScrollRevealText
                    lines={[
                        "Proven Track Record",
                        "Data-Driven Strategy",
                        "Long-Term Partnership"
                    ]}
                />

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    <AnimatedStat value={9} suffix=".5x" label="Avg ROAS" delay={0} />
                    <AnimatedStat value={200} prefix="€" suffix="M+" label="Ad Spend" delay={100} />
                    <AnimatedStat value={10} suffix="+" label="Years Exp" delay={200} />
                    <AnimatedStat value={4} label="Continents" delay={300} />
                </div>
            </div>
        </section>
    );
};

export default OfficialPartnerSection;
