import React from 'react';
import { motion } from 'motion/react';
import { DitherShader } from '@/components/ui/dither-shader';
import { useIconBackground } from './useIconBackground';

// Shader config - same effect for all cards
const SHADER_CONFIG = { ditherMode: 'bayer', gridSize: 4, threshold: 0.5 };

const ProjectOverview = ({ study }) => {
    const overviewItems = [
        { title: 'Client', value: study.client, iconName: 'User' },
        { title: 'Industry', value: study.industry, iconName: 'Car' },
        { title: 'Duration', value: study.overview?.duration || 'N/A', iconName: 'Clock' },
        { title: 'Platforms', value: study.overview?.platforms || 'N/A', iconName: 'Globe' }
    ];

    return (
        <div className="mb-16 md:mb-24">
            <SectionHeader />
            <OverviewGrid items={overviewItems} />
            <ServiceTags services={study.services} />
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

// Single card component to use hooks
const OverviewCard = ({ item, index }) => {
    const iconBg = useIconBackground(item.iconName, index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative p-5 rounded-2xl border border-gray-800 bg-slate-950/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden min-h-35"
        >
            {/* Dither shader background */}
            {iconBg && (
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <DitherShader
                        src={iconBg}
                        colorMode="duotone"
                        primaryColor="#020617"
                        secondaryColor="#22d3ee"
                        ditherMode={SHADER_CONFIG.ditherMode}
                        gridSize={SHADER_CONFIG.gridSize}
                        threshold={SHADER_CONFIG.threshold}
                    />
                </div>
            )}

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

// Service Tags sub-component
const ServiceTags = ({ services }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex flex-wrap justify-center gap-3"
    >
        {services.map((service, index) => (
            <span
                key={index}
                className="px-4 py-2 text-sm text-slate-300 bg-slate-800/50 rounded-full border border-gray-700/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300"
            >
                {service}
            </span>
        ))}
    </motion.div>
);

export default ProjectOverview;
