import React from 'react';
import { motion } from 'motion/react';
import ScrollRevealText from './ScrollRevealText';
import ProcessStep from './ProcessStep';

const DesktopTimeline = ({ processSteps }) => {
    return (
        <div className="hidden lg:block">
            {/* Content container */}
            <div className="engine-timeline-container engine-timeline-title-container">
                <ScrollRevealText
                    text="Our proven process ensures clarity, efficiency, and exceptional results"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-center leading-tight text-white mb-6 max-w-4xl mx-auto"
                />
                <motion.p
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    Every stage is designed to deliver measurable impact, from strategy to scale
                </motion.p>
            </div>

            {/* Steps Container */}
            <div className="engine-timeline-container">
                <div>
                    {processSteps.map((step, index) => (
                        <ProcessStep key={step.step} step={step} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DesktopTimeline;
