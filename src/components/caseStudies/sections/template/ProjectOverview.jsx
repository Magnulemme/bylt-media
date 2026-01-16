import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useShaderBackground } from '@/hooks/useShaderBackground';

const ProjectOverview = ({ study, imageUrl, testimonial }) => {
    const overviewItems = [
        { title: 'Client', value: study.client, iconName: 'User' },
        { title: 'Industry', value: study.industry, iconName: 'Car' },
        { title: 'Duration', value: study.overview?.duration || 'N/A', iconName: 'Clock' },
        { title: 'Platforms', value: study.overview?.platforms || 'N/A', iconName: 'Globe' }
    ];

    return (
        <div className="mb-16 md:mb-24">
            <SectionHeader />
            {/* Mobile: grid separata */}
            <div className="lg:hidden">
                <OverviewGrid items={overviewItems} />
            </div>
            <ProjectShowcase
                imageUrl={imageUrl}
                overviewItems={overviewItems}
            />
            {testimonial && <ClientTestimonial testimonial={testimonial} />}
        </div>
    );
};

// Section Header sub-component
const SectionHeader = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
    >
        <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-3 block font-inter">
            Project Details
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter">
            Project Overview
        </h2>
    </motion.div>
);

// Single card component con shader background
const OverviewCard = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const { containerRef, canvasRef } = useShaderBackground({
        colors: {
            color1: 0x22d3ee, // cyan
            color2: 0x06b6d4, // cyan-500
            color3: 0x0891b2, // cyan-600
        },
        priority: 15,
        targetFPS: 12,
        enableVisibilityTracking: true,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/60 hover:border-cyan-500/50 transition-colors duration-300 overflow-hidden min-h-35"
        >
            {/* Shader background */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 opacity-40"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ borderRadius: '1rem' }}
                />
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {item.title}
                </h3>
                <p className="text-sm md:text-base text-white font-bold font-inter group-hover:text-cyan-300 transition-colors">
                    {item.value}
                </p>
            </div>
        </motion.div>
    );
};

// Overview Grid sub-component
const OverviewGrid = ({ items }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
            <OverviewCard key={item.title} item={item} index={index} />
        ))}
    </div>
);

// Project Showcase with image and overlaid cards
const ProjectShowcase = ({ imageUrl, overviewItems }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    if (!imageUrl) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 lg:mt-0 relative rounded-2xl overflow-hidden"
        >
            {/* Image */}
            <div className="aspect-video">
                <img
                    src={imageUrl}
                    alt="Project showcase"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Desktop: Overview cards al centro */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center p-6">
                <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
                    {overviewItems.map((item, index) => (
                        <OverviewCard key={item.title} item={item} index={index} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Client Testimonial sub-component
const ClientTestimonial = ({ testimonial }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mt-8 max-w-2xl mx-auto text-center"
        >
            <blockquote>
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
};

export default ProjectOverview;
