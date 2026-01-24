import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { StatsGrid } from '../shared';

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
        <div ref={ref} className="scroll-reveal-text-wrapper">
            {lines.map((line, index) => renderLine(line, index))}
        </div>
    );
};

const stats = [
    { value: 9, suffix: '.5x', label: 'Avg ROAS' },
    { value: 200, prefix: '€', suffix: 'M+', label: 'Ad Spend' },
    { value: 10, suffix: '+', label: 'Years Exp' },
    { value: 4, label: 'Continents' },
];

// Official Partner Section - Show, Don't Tell
const OfficialPartnerSection = () => {
    return (
        <section className="official-partner-section" style={{ background: '#020617' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

            <div className="official-partner-container">
                <ScrollRevealText
                    lines={[
                        "Proven Track Record",
                        "Data-Driven Strategy",
                        "Long-Term Partnership"
                    ]}
                />

                <StatsGrid stats={stats} />
            </div>
        </section>
    );
};

export default OfficialPartnerSection;
