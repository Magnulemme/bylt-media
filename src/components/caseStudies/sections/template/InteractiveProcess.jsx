import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { getIcon, accentColors } from './utils';

const InteractiveProcess = ({ process }) => {
    const [activeStep, setActiveStep] = useState(null);

    if (!process || process.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative" style={{ background: '#020617' }}>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <SectionHeader />
                <ProcessTimeline
                    process={process}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                />
            </div>
        </section>
    );
};

// Section Header sub-component
const SectionHeader = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
        >
            <span className="text-xs tracking-[0.2em] text-cyan-500 uppercase mb-3 block font-inter">
                How We Did It
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-inter mb-4">
                Our Process
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>
    );
};

// Process Timeline sub-component
const ProcessTimeline = ({ process, activeStep, setActiveStep }) => (
    <div className="relative">
        {process.map((step, index) => (
            <ProcessStep
                key={step.step}
                step={step}
                index={index}
                isActive={activeStep === step.step}
                isLast={index === process.length - 1}
                onToggle={() => setActiveStep(activeStep === step.step ? null : step.step)}
            />
        ))}
    </div>
);

// Process Step sub-component
const ProcessStep = ({ step, index, isActive, isLast, onToggle }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const Icon = getIcon(step.icon);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative mb-6"
        >
            <div className="flex items-start gap-4 md:gap-6">
                {/* Step number */}
                <StepNumber
                    step={step.step}
                    isActive={isActive}
                    accentColor={accentColor}
                    onToggle={onToggle}
                />

                {/* Step card */}
                <StepCard
                    step={step}
                    Icon={Icon}
                    isActive={isActive}
                    accentColor={accentColor}
                    onToggle={onToggle}
                />
            </div>

            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-6 md:left-7 top-14 w-0.5 h-full bg-gray-800 -z-0" />
            )}
        </motion.div>
    );
};

// Step Number sub-component
const StepNumber = ({ step, isActive, accentColor, onToggle }) => (
    <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-300 flex-shrink-0 z-10 font-inter ${isActive
            ? 'scale-110 shadow-lg'
            : 'hover:scale-105'
            }`}
        style={{
            background: isActive ? accentColor : 'rgba(30, 41, 59, 0.8)',
            color: isActive ? '#020617' : 'white',
            boxShadow: isActive ? `0 0 30px ${accentColor}50` : 'none'
        }}
        onClick={onToggle}
    >
        {step}
    </div>
);

// Step Card sub-component
const StepCard = ({ step, Icon, isActive, accentColor, onToggle }) => (
    <div
        className={`flex-1 p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${isActive
            ? 'border-cyan-500/50 bg-slate-900/80'
            : 'border-gray-800 bg-slate-950/50 hover:border-gray-700'
            }`}
        onClick={onToggle}
    >
        <div className="flex items-center gap-3 mb-3">
            <div
                className="p-2 rounded-xl transition-colors"
                style={{ background: `${accentColor}15` }}
            >
                <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-white font-inter">
                    {step.title}
                </h3>
                <p className="text-xs text-slate-500">{step.subtitle}</p>
            </div>
            <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isActive ? 'rotate-180 text-cyan-400' : ''
                    }`}
            />
        </div>

        <p className="text-slate-400 text-sm mb-4">{step.description}</p>

        {/* Metrics tags */}
        <MetricsTags metrics={step.metrics} accentColor={accentColor} />

        {/* Expanded details */}
        {isActive && <ExpandedDetails details={step.details} />}
    </div>
);

// Metrics Tags sub-component
const MetricsTags = ({ metrics, accentColor }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {metrics.map((metric, i) => (
            <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                    background: `${accentColor}10`,
                    borderColor: `${accentColor}30`,
                    color: accentColor
                }}
            >
                {metric}
            </span>
        ))}
    </div>
);

// Expanded Details sub-component
const ExpandedDetails = ({ details }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="border-t border-gray-800 pt-4"
    >
        <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3 font-inter">
            Detailed Breakdown
        </h4>
        <ul className="space-y-2">
            {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    {detail}
                </li>
            ))}
        </ul>
    </motion.div>
);

export default InteractiveProcess;
