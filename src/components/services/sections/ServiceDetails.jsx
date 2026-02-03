"use client";
import React from 'react';
import { motion } from 'motion/react';
import QuoteCard from '@/components/ui/QuoteCard';

const ServiceDetails = ({ service }) => {
    if (!service.details) return null;

    // Secondary section data (Results)
    const secondary = service.details.secondary;
    // Secondary stats (tempo/risultati)
    const secondaryStats = service.details.secondaryStats || [];

    if (!secondary) return null;

    return (
        <section
            className="service-details-section relative"
            style={{ background: '#020617' }}
        >
            <div className="service-details-container relative z-10">
                {/* Mobile: stacked */}
                <div className="md:hidden space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {secondary.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-6">
                            {secondary.subheading}
                        </p>

                        {/* Outcomes Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {secondary.outcomes?.map((outcome, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                    className="flex items-start gap-2"
                                >
                                    <span className="text-caption text-cyan-400 mt-0.5">
                                        0{index + 1}
                                    </span>
                                    <span className="text-body text-slate-300 leading-snug">
                                        {outcome.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                    </motion.div>

                    <div className="space-y-6">
                        {/* Testimonial Quote - mobile */}
                        {service.details.testimonial && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <QuoteCard
                                    quote={service.details.testimonial.quote}
                                    author={service.details.testimonial.author}
                                    role={service.details.testimonial.role}
                                    company={service.details.testimonial.company}
                                    brutalist
                                    showIcon
                                />
                            </motion.div>
                        )}

                        {/* Secondary Stats */}
                        {secondaryStats.length > 0 && (
                            <div className="flex gap-6 pt-2">
                                {secondaryStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-caption">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tablet & Desktop: two columns (content left, quote right) */}
                <div className="hidden md:grid md:grid-cols-2 gap-12 items-start">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {secondary.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-3">
                            {secondary.subheading}
                        </p>

                        {/* Outcomes Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {secondary.outcomes?.map((outcome, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-caption text-cyan-500/70">
                                        0{index + 1}
                                    </span>
                                    <span className="text-body leading-snug">
                                        {outcome.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Secondary Stats - always left */}
                        {secondaryStats.length > 0 && (
                            <div className="flex gap-8 pt-8">
                                {secondaryStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-caption">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right - Quote only */}
                    {service.details.testimonial && (
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="self-center"
                        >
                            <QuoteCard
                                quote={service.details.testimonial.quote}
                                author={service.details.testimonial.author}
                                role={service.details.testimonial.role}
                                company={service.details.testimonial.company}
                                brutalist
                                showIcon
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
