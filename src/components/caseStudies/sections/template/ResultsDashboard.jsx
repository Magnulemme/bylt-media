import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check } from 'lucide-react';
import AnimatedWaveCanvas from '../../../services/sections/AnimatedWaveCanvas';

const ResultsDashboard = ({ results }) => {
    if (!results) return null;

    return (
        <div className="py-padding-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Colonna sinistra: freccia + stats */}
                <ResultsMetrics metrics={results.metrics} className="order-last lg:order-first" />
                {/* Colonna destra: titolo + content */}
                <div>
                    <ResultsDescription
                        description={results.description}
                        highlights={results.highlights}
                    />
                </div>
            </div>
        </div>
    );
};

// Results Description sub-component (mirrored from TheChallenge)
const ResultsDescription = ({ description, highlights }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="heading-h1 text-white mb-6">
                The Results
            </h2>
            <p className="text-subheader mb-8">
                {description}
            </p>
            {highlights && highlights.length > 0 && (
                <ul className="space-y-4">
                    {highlights.map((highlight, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                            <span className="text-body">{highlight}</span>
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

// Animated Counter Hook
const useAnimatedCounter = (endValue, duration = 2000, shouldAnimate = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

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
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentValue = targetNumber * easeOutExpo;

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [endValue, duration, shouldAnimate]);

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
    const value = `${metric.prefix || ''}${metric.value}${metric.suffix || ''}`;
    const animatedValue = useAnimatedCounter(value, 2000, shouldAnimate);

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
            <span className="block stats-value-light bg-none! text-emerald-500!">
                {animatedValue}
            </span>
            <span className="block text-label-sm mt-1">
                {metric.title}
            </span>
        </motion.div>
    );
};

// Results Metrics sub-component (mirrored from ChallengeMetrics)
const ResultsMetrics = ({ metrics, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    if (!metrics || metrics.length === 0) return null;

    return (
        <div ref={ref} className={`relative sm:flex sm:flex-row-reverse sm:items-center sm:gap-4 lg:flex-col ${className}`}>
            <div className="absolute inset-0 sm:relative sm:inset-auto opacity-40 sm:opacity-60 max-w-[400px]">
                <AnimatedWaveCanvas colors={['#22c55e', '#16a34a', '#4ade80']} shape="growth" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
                {metrics.map((metric, index) => (
                    <MetricItem
                        key={metric.key || index}
                        metric={metric}
                        index={index}
                        shouldAnimate={isInView}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResultsDashboard;
