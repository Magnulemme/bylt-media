import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { getIcon, accentColors, useWaveBackground } from './utils';

const OurSolution = ({ solution }) => {
    if (!solution) return null;

    return (
        <div className="mb-16 md:mb-24">
            <SectionHeader description={solution.description} />
            <PillarsGrid pillars={solution.pillars} />
        </div>
    );
};

// Section Header sub-component
const SectionHeader = ({ description }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-3 block font-inter">
                Our Approach
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-4">
                The Solution
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl">
                {description}
            </p>
        </motion.div>
    );
};

// Pillars Grid sub-component
const PillarsGrid = ({ pillars }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
        ))}
    </div>
);

// Pillar Card sub-component
const PillarCard = ({ pillar, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const Icon = getIcon(pillar.icon);
    const waveBg = useWaveBackground(index);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/50 transition-colors duration-300 hover:-translate-y-1"
        >
            {/* Wave Background */}
            {waveBg && (
                <div
                    className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-slate-950/70" />

            {/* Content */}
            <div className="relative z-10 p-6">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                        boxShadow: `0 0 20px ${accentColor}10`
                    }}
                >
                    <Icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <h4 className="font-bold text-white text-lg mb-3 font-inter group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    {pillar.text}
                </p>
            </div>
        </motion.div>
    );
};

export default OurSolution;
