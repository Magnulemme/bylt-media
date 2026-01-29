import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import AnimatedWaveCanvas from '../../../services/sections/AnimatedWaveCanvas';

const TheChallenge = ({ challenge }) => {
    if (!challenge) return null;

    return (
        <div className="mb-padding-md">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-18 xl:gap-24 2xl:gap-36 items-center">
                {/* Colonna sinistra: titolo + content */}
                <div>
                    <SectionHeader />
                    <ChallengeDescription
                        description={challenge.description}
                        painPoints={challenge.painPoints}
                    />
                </div>
                {/* Colonna destra: freccia + stats */}
                <ChallengeMetrics metrics={challenge.metrics} />
            </div>
        </div>
    );
};

// Section Header sub-component
const SectionHeader = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <h2 className="heading-h1 text-white">
                The Challenge
            </h2>
        </motion.div>
    );
};

// Challenge Description sub-component
const ChallengeDescription = ({ description, painPoints }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
        >
            <p className="text-subheader mb-8">
                {description}
            </p>
            <ul className="space-y-4">
                {painPoints.map((point, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                    >
                        <div className="shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                        </div>
                        <span className="text-body">{point}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const animatedValue = useAnimatedCounter(metric.value, 2000, shouldAnimate);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1
            }}
        >
            <span className="block stats-value-light bg-none! text-red-500!">
                {animatedValue}
            </span>
            <span className="block text-label-sm mt-1">
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
        <div ref={ref} className="flex flex-col sm:flex-row-reverse sm:items-center sm:gap-4 lg:flex-col lg:items-stretch lg:gap-0 2xl:flex-row-reverse 2xl:items-center 2xl:gap-8">
            {/* Wave: sopra su mobile e lg-xl, accanto su sm-md e 2xl+ */}
            <div className="opacity-50 sm:opacity-60 max-w-75 sm:max-w-100 mx-auto sm:mx-0 mb-6 sm:mb-0 lg:mx-auto lg:mb-6 2xl:mx-0 2xl:mb-0">
                <AnimatedWaveCanvas colors={['#ef4444', '#f97316', '#dc2626']} shape="arrow" />
            </div>
            {/* Stats grid */}
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
