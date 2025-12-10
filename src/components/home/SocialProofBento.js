import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, TrendingUp, Globe, Award, Zap, Users } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2000 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    }, []);

    const animatedValue = useCountUp(value, duration, isVisible);

    return (
        <span ref={ref}>
            {prefix}{animatedValue}{suffix}
        </span>
    );
};

// Social Proof Bento Grid
const SocialProofBento = () => {
    return (
        <section className="relative py-20 overflow-hidden" style={{ background: '#020617' }}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        className="inline-flex items-center gap-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-cyan-400 font-mono text-sm tracking-wide">
                            4)
                        </span>
                        <span className="text-white font-mono text-sm tracking-wide">
                            Social Proof
                        </span>
                        <span className="text-gray-500 font-mono text-sm tracking-wide">
                            [Verified]
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Trusted by Industry Leaders
                    </motion.h2>
                </div>

                {/* Bento Grid - Less predictable layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">

                    {/* Large Card - 5 Star Rating */}
                    <motion.div
                        className="md:col-span-2 lg:col-span-3 lg:row-span-2 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="flex gap-2 mb-6 justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                                    >
                                        <Star className="w-10 h-10 md:w-12 md:h-12 fill-cyan-400 text-cyan-400" />
                                    </motion.div>
                                ))}
                            </div>

                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-3">5.0</h3>
                            <p className="text-lg md:text-xl text-gray-300 mb-2">Client Satisfaction</p>
                            <p className="text-xs md:text-sm text-gray-400">Based on 50+ reviews</p>
                        </div>
                    </motion.div>

                    {/* Official Partners - Wide Card */}
                    <motion.div
                        className="md:col-span-3 lg:col-span-3 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <Award className="w-8 h-8 text-yellow-400 mb-4" />
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Official Partners</h4>

                            <div className="flex flex-wrap items-center justify-start gap-6 md:gap-8">
                                <img
                                    src="/images/partners/partners logos/google-partner-logo-min.svg"
                                    alt="Google Partner"
                                    className="h-12 md:h-16 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                                <img
                                    src="/images/partners/partners logos/meta_partner_logo.png"
                                    alt="Meta Partner"
                                    className="h-12 md:h-16 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Performance Guarantee - Tall Card */}
                    <motion.div
                        className="md:col-span-1 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <Zap className="w-10 h-10 text-cyan-400 mb-4" />
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Performance First
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Data-driven campaigns with transparent reporting and guaranteed ROI
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">24/7</div>
                                <div className="text-xs text-gray-400">Campaign Monitoring</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Global Reach */}
                    <motion.div
                        className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <Globe className="w-8 h-8 text-purple-400 mb-4" />
                            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Global Experience
                            </h4>
                            <p className="text-sm text-gray-400 mb-4">Campaigns across 4 continents</p>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">Europe</span>
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">Asia</span>
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">Americas</span>
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">Africa</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SocialProofBento;
