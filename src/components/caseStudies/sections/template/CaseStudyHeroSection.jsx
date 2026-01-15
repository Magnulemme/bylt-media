import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ShaderBackground from '../../../home/ShaderBackground';
import { getIcon } from './utils';

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

const CaseStudyHeroSection = ({ data, imageUrl, client }) => {
    const [currentStat, setCurrentStat] = useState(0);
    const stats = data.stats || [];

    useEffect(() => {
        if (stats.length === 0) return;
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <section className="relative overflow-hidden">
            {/* Shader Background */}
            <div className="absolute inset-0 z-0">
                <ShaderBackground onReady={signalPageReady} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 md:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-inter leading-[1.2] mb-6"
                    >
                        {data.headline.map((line, i) => (
                            <span
                                key={i}
                                className={`block ${i === data.highlightIndex
                                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                                    : 'text-white'
                                    }`}
                            >
                                {line}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        {data.subtitle}
                    </motion.p>

                    {/* Stats carousel */}
                    {stats.length > 0 && (
                        <StatsCarousel
                            stats={stats}
                            currentStat={currentStat}
                            setCurrentStat={setCurrentStat}
                        />
                    )}

                    {/* Client Testimonial */}
                    {data.testimonial && (
                        <ClientTestimonial testimonial={data.testimonial} />
                    )}
                </div>
            </div>
        </section>
    );
};

// Client Testimonial sub-component
const ClientTestimonial = ({ testimonial }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 max-w-2xl mx-auto"
    >
        <blockquote className="relative">
            <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed">
                "{testimonial.quote}"
            </p>
            <footer className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-white font-medium">{testimonial.author}</span>
                <span className="text-slate-500">—</span>
                <span className="text-slate-400">{testimonial.role}</span>
                {testimonial.company && (
                    <>
                        <span className="text-slate-500">@</span>
                        <span className="text-cyan-400">{testimonial.company}</span>
                    </>
                )}
            </footer>
        </blockquote>
    </motion.div>
);

// Stats Carousel sub-component
const StatsCarousel = ({ stats, currentStat, setCurrentStat }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative h-32 md:h-28 flex items-center justify-center"
    >
        {stats.map((stat, index) => {
            const Icon = getIcon(stat.icon);
            const isActive = index === currentStat;
            const isPrevious = index === (currentStat - 1 + stats.length) % stats.length;
            const isNext = index === (currentStat + 1) % stats.length;

            let transformClasses = '';
            if (isActive) {
                transformClasses = 'opacity-100 scale-100 z-20';
            } else if (isPrevious) {
                transformClasses = 'opacity-30 scale-75 -translate-x-32 z-10';
            } else if (isNext) {
                transformClasses = 'opacity-30 scale-75 translate-x-32 z-10';
            } else {
                transformClasses = 'opacity-0 scale-50 pointer-events-none';
            }

            return (
                <div
                    key={index}
                    className={`absolute w-fit px-8 p-5 rounded-2xl border border-gray-800 bg-slate-950/80 backdrop-blur-sm transition-all duration-500 ease-out cursor-pointer hover:border-cyan-500/50 ${transformClasses}`}
                    onClick={() => setCurrentStat(index)}
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10">
                            <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-2xl md:text-3xl font-bold text-white font-inter">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400">
                                {stat.label}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </motion.div>
);

export default CaseStudyHeroSection;
