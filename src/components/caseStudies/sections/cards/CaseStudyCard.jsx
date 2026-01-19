import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CaseStudyCard = ({ study, index, isReversed = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
        >
            {/* Image */}
            <motion.div
                className={`relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <img
                        src={study.imageUrl}
                        alt={study.client}
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/800x500/0f172a/06b6d4?text=${encodeURIComponent(study.client)}`;
                        }}
                    />
                </div>
            </motion.div>

            {/* Content */}
            <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                {/* Category Badge */}
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30 mb-4"
                >
                    {study.category}
                </motion.span>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-4 leading-tight"
                >
                    {study.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base md:text-lg text-slate-400 leading-relaxed mb-8"
                >
                    {study.description}
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-2 gap-4 mb-8"
                >
                    {study.stats.map((stat, statIndex) => (
                        <div
                            key={statIndex}
                            className="relative p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group/stat hover:border-cyan-400/30 transition-all duration-300 overflow-hidden"
                        >
                            {/* Animated top border */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform -translate-x-full group-hover/stat:translate-x-0 transition-transform duration-500" />

                            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <Link href={study.link} passHref legacyBehavior>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </Link>
            </div>
        </motion.div>
    );
};

export default CaseStudyCard;
