"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { WhyByltChart } from './WhyByltCharts';

const ServiceWhyBylt = ({ service }) => {
    if (!service.details) return null;

    // Get first 4 benefits for the list
    const keyBenefits = service.details.benefits?.slice(0, 4) || [];

    return (
        <section
            className="service-why-bylt-section relative"
            style={{ background: '#020617' }}
        >
            <div className="service-why-bylt-container relative z-10">
                <div className="service-why-bylt-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left - Header + Description + Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:col-start-1"
                    >
                        <h2 className="heading-h2 text-white mb-4">
                            {service.details.heading}
                        </h2>
                        <p className="text-subheader leading-relaxed mb-6">
                            {service.details.subheading}
                        </p>

                        {keyBenefits.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                                {keyBenefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-cyan-400" />
                                        </div>
                                        <span className="text-body">
                                            {benefit.title}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </motion.div>

                    {/* Right - Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-2 lg:col-start-2 self-center relative rounded-2xl border border-slate-800 bg-slate-950/50 p-6 overflow-hidden"
                    >
                        {/* Subtle glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                        <WhyByltChart serviceSlug={service.slug} />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ServiceWhyBylt;
