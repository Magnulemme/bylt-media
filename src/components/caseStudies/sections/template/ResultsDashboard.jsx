import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check } from 'lucide-react';
import AnimatedWaveCanvas from '../../../services/sections/AnimatedWaveCanvas';

const ResultsDashboard = ({ results }) => {
    if (!results) return null;

    return (
        <div className="py-16 md:py-24">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                <ResultsMetrics metrics={results.metrics} className="order-last lg:order-first" />
                <ResultsDescription
                    description={results.description}
                    highlights={results.highlights}
                />
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
            className="lg:max-w-xl"
        >
            <span className="text-xs tracking-[0.2em] text-emerald-500 uppercase mb-3 block font-inter">
                Measurable Impact
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-6">
                The Results
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-8">
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
                            <span className="text-slate-300 text-sm md:text-base">{highlight}</span>
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
            <span className="block text-3xl md:text-4xl font-bold text-emerald-500 font-inter">
                {animatedValue}
            </span>
            <span className="block text-slate-500 text-sm uppercase tracking-wider mt-1">
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
        <div ref={ref} className={`shrink-0 relative min-[500px]:flex min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-8 ${className}`}>
            <div className="grid grid-cols-2 gap-4 md:gap-6 min-[500px]:flex-1 relative z-10">
                {metrics.map((metric, index) => (
                    <MetricItem
                        key={metric.key || index}
                        metric={metric}
                        index={index}
                        shouldAnimate={isInView}
                    />
                ))}
            </div>
            <div className="absolute inset-0 min-[500px]:relative min-[500px]:inset-auto min-[500px]:flex-1 opacity-40 min-[500px]:opacity-60">
                <AnimatedWaveCanvas colors={['#22c55e', '#16a34a', '#4ade80']} shape="growth" />
            </div>
        </div>
    );
};

export default ResultsDashboard;
