import React from 'react';
import { motion } from 'motion/react';
import { caseStudiesData } from '../constants';
import { CaseStudyCard } from './cards';

const CaseStudiesGrid = () => {
    return (
        <section
            id="case-studies"
            className="relative py-20 md:py-28"
            style={{ background: '#020617' }}
        >
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Gradient orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-4 block font-inter">
                        Our Work
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-inter mb-4">
                        Featured Case Studies
                    </h2>
                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                        Real results from real partnerships. Discover how we help brands achieve measurable growth.
                    </p>
                </motion.div>

                {/* Case Studies List */}
                <div className="space-y-20 md:space-y-28">
                    {caseStudiesData.map((study, index) => (
                        <CaseStudyCard
                            key={study.id}
                            study={study}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesGrid;
