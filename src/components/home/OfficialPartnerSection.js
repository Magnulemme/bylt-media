import React, { useState, useEffect, useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { motion, useScroll, useTransform } from 'motion/react';

// Word Component with Motion
const Word = ({ children, range, progress, isLast = false }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className={`inline-block align-baseline ${!isLast ? 'mr-[0.25em]' : ''}`}
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
                className="heading-h1 text-center text-white"
                style={{ fontFamily: 'var(--font-family-inter)' }}
            >
                {words.map((word, i) => {
                    const start = wordIndex / totalWords;
                    const end = (wordIndex + 1) / totalWords;
                    wordIndex++;
                    const isLastWord = i === words.length - 1;

                    return (
                        <Word key={i} range={[start, end]} progress={scrollYProgress} isLast={isLastWord}>
                            {word}
                        </Word>
                    );
                })}
            </h3>
        );
    };

    return (
        <div ref={ref} className="scroll-reveal-text-wrapper space-y-4 md:space-y-6">
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
        <div ref={ref} className="stats-card">
            <div className="stats-value">
                {prefix}{animatedValue}{suffix}
            </div>
            <div className="text-label-lg font-bold text-slate-400">
                {label}
            </div>
        </div>
    );
};

// Official Partner Section - Show, Don't Tell
const OfficialPartnerSection = () => {
    return (
        <section className="official-partner-section" style={{ background: '#020617' }}>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

            <div className="official-partner-container">
                {/* Scroll Reveal Intermezzo */}
                <ScrollRevealText
                    lines={[
                        "Proven Track Record",
                        "Data-Driven Strategy",
                        "Long-Term Partnership"
                    ]}
                />

                {/* Main Stats Grid */}
                <div className="stats-grid">
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
