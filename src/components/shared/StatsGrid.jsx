'use client';

import { useState, useEffect, useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

// Hook per rilevare mobile
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};

// Stat card statica per mobile (no count-up)
const StaticStat = ({ value, suffix = '', prefix = '', label, variant = 'default' }) => {
    const valueClass = variant === 'light' ? 'stats-value-light' : 'stats-value';
    const labelClass = variant === 'light' ? 'text-label-sm text-slate-400' : 'text-label-lg font-bold text-slate-400';

    return (
        <div className="stats-card">
            <div className={valueClass}>
                {prefix}{value}{suffix}
            </div>
            <div className={labelClass}>
                {label}
            </div>
        </div>
    );
};

// Stat card animata per desktop (con count-up)
const AnimatedStat = ({ value, suffix = '', prefix = '', label, delay = 0, variant = 'default' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const valueClass = variant === 'light' ? 'stats-value-light' : 'stats-value';
    const labelClass = variant === 'light' ? 'text-label-sm text-slate-400' : 'text-label-lg font-bold text-slate-400';

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
            <div className={valueClass}>
                {prefix}{animatedValue}{suffix}
            </div>
            <div className={labelClass}>
                {label}
            </div>
        </div>
    );
};

const StatsGrid = ({
    stats,
    className = '',
    variant = 'default',
    oscillate = false,
    oscillateAmplitude = 8,
    oscillateSpeed = 0.02
}) => {
    const isMobile = useIsMobile();

    // Mobile: infinite moving cards
    if (isMobile) {
        return (
            <InfiniteMovingCards
                items={stats}
                direction="left"
                speed="slow"
                pauseOnHover={false}
                className={className}
                gap="gap-4"
                useNestedMask={true}
                oscillate={oscillate}
                oscillateAmplitude={oscillateAmplitude}
                oscillateSpeed={oscillateSpeed}
                renderItem={(stat, idx) => (
                    <StaticStat
                        key={idx}
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        label={stat.label}
                        variant={variant}
                    />
                )}
            />
        );
    }

    // Desktop: grid statico con count-up
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
                    variant={variant}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
