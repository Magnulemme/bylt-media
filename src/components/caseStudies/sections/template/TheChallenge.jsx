import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import AnimatedWaveCanvas from '../../../services/sections/AnimatedWaveCanvas';

const TheChallenge = ({ challenge }) => {
    if (!challenge) return null;

    return (
        <div className="mb-16 md:mb-24">
            <SectionHeader />
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                <ChallengeDescription
                    description={challenge.description}
                    painPoints={challenge.painPoints}
                />
                <ChallengeMetrics metrics={challenge.metrics} />
            </div>
        </div>
    );
};

// Section Header sub-component
const SectionHeader = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    >
        <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-3 block font-inter">
            The Problem
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter">
            The Challenge
        </h2>
    </motion.div>
);

// Challenge Description sub-component
const ChallengeDescription = ({ description, painPoints }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:max-w-xl"
    >
        <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-8">
            {description}
        </p>
        <ul className="space-y-4">
            {painPoints.map((point, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                    </div>
                    <span className="text-slate-300 text-sm md:text-base">{point}</span>
                </motion.li>
            ))}
        </ul>
    </motion.div>
);

// Animated Counter Hook
const useAnimatedCounter = (endValue, duration = 2000, shouldAnimate = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

        // Parse the numeric value from string (e.g., "45%" -> 45, "$2.3M" -> 2.3)
        const numericMatch = endValue.toString().match(/[\d.]+/);
        if (!numericMatch) {
            setCount(endValue);
            return;
        }

        const targetNumber = parseFloat(numericMatch[0]);
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out-expo)
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentValue = targetNumber * easeOutExpo;

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [endValue, duration, shouldAnimate]);

    // Format the count back with original suffix/prefix
    const formatValue = (val) => {
        const original = endValue.toString();
        const numericMatch = original.match(/[\d.]+/);
        if (!numericMatch) return original;

        const prefix = original.slice(0, numericMatch.index);
        const suffix = original.slice(numericMatch.index + numericMatch[0].length);
        const hasDecimal = numericMatch[0].includes('.');

        return `${prefix}${hasDecimal ? val.toFixed(1) : Math.round(val)}${suffix}`;
    };

    return formatValue(count);
};

// Single Metric Item Component
const MetricItem = ({ metric, index, shouldAnimate }) => {
    const animatedValue = useAnimatedCounter(metric.value, 2000, shouldAnimate);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1
            }}
        >
            <span className="block text-3xl md:text-4xl font-bold text-red-500 font-inter">
                {animatedValue}
            </span>
            <span className="block text-slate-500 text-sm uppercase tracking-wider mt-1">
                {metric.label}
            </span>
        </motion.div>
    );
};

// Challenge Metrics sub-component
const ChallengeMetrics = ({ metrics }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    if (!metrics || metrics.length === 0) return null;

    return (
        <div ref={ref} className="shrink-0 flex flex-col">
            <div className="h-24 mb-4 opacity-60">
                <AnimatedWaveCanvas colors={['#ef4444', '#f97316', '#dc2626']} shape="arrow" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
                {metrics.map((metric, index) => (
                    <MetricItem
                        key={index}
                        metric={metric}
                        index={index}
                        shouldAnimate={isInView}
                    />
                ))}
            </div>
        </div>
    );
};

export default TheChallenge;
