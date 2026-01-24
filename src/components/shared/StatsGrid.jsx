'use client';

import { useState, useEffect, useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

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

const StatsGrid = ({ stats, className = '' }) => {
    return (
        <div className={`stats-grid ${className}`.trim()}>
            {stats.map((stat, index) => (
                <AnimatedStat
                    key={index}
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    label={stat.label}
                    delay={index * 100}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
