import React, { useRef } from 'react';
import { motion, useTransform } from 'motion/react';
import ShaderBackground from '../ShaderBackground';

const MobileCard = ({ step, index, totalSteps, scrollProgress, variant = 'full' }) => {
    const thisCardRef = useRef(null);

    // Range dinamico per ogni card basato sull'indice
    // progress 0 = card 1 visibile, progress 1 = card 5 visibile
    // Con 5 card ci sono 4 transizioni, quindi dividiamo per (totalSteps - 1)
    const numTransitions = totalSteps - 1;
    const transitionWidth = 1 / numTransitions;  // 0.25 per 5 card

    // Centro di ogni card (dove isActive = 100%)
    const center = index / numTransitions;

    // Crossfade logic:
    // - Prima card visibile (index 0): inizia a 100%, fadeOut
    // - Ultima card visibile (index più alto): fadeIn, finisce a 100%
    // - Card intermedie: fadeIn da card precedente, fadeOut a card successiva
    const isFirstVisible = index === 0;
    const isLastVisible = index === totalSteps - 1;

    // Calcola input/output arrays PRIMA di chiamare useTransform (no conditional hooks)
    const inputRange = isFirstVisible
        ? [center, center + transitionWidth]                              // Card 5: [0, 0.25]
        : isLastVisible
            ? [center - transitionWidth, center]                          // Card 1: [0.75, 1]
            : [center - transitionWidth, center, center + transitionWidth]; // Altri: [prev, center, next]

    const outputRange = isFirstVisible
        ? [1, 0]           // Card 5: fadeOut da 100%
        : isLastVisible
            ? [0, 1]       // Card 1: fadeIn a 100%
            : [0, 1, 0];   // Intermedie: fadeIn/fadeOut

    const isActive = useTransform(scrollProgress, inputRange, outputRange);

    const glowScale = useTransform(isActive, [0, 1], [1, 1.8]);

    // Transforms pre-calcolati (non dentro il render)
    const circleBorderColor = useTransform(isActive, [0, 1], ['rgba(103, 232, 249, 0.3)', 'rgba(103, 232, 249, 0.8)']);
    const iconOpacity = useTransform(isActive, [0, 1], [0.2, 1]);


    const circleBackground = useTransform(
        isActive,
        [0, 1],
        ['#0f172a', '#1e293b']
    );

    // Render solo i glow (layer non mascherato)
    if (variant === 'glow-only') {
        return (
            <div ref={thisCardRef} className="timeline-mobile-card flex flex-col items-center gap-4 pointer-events-none">
                {/* Step Number Circle - solo i glow */}
                <div className="relative shrink-0 rounded-full overflow-visible">
                    {/* Cerchio invisibile per mantenere dimensioni */}
                    <motion.div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full opacity-0"
                        style={{
                            background: circleBackground,
                            borderColor: circleBorderColor
                        }}
                    />
                    {/* Luminous glow effect around circle - Safari fix with will-change */}
                    <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0.3) 50%, transparent 70%)',
                            filter: useTransform(glowScale, (s) => {
                                const blur = 15 + s * 5;
                                return `blur(${blur}px)`;
                            }),
                            opacity: isActive,
                            transform: useTransform(glowScale, (s) => `scale(${s})`),
                            willChange: 'transform, filter, opacity'
                        }}
                    />
                    {/* Outer glow ring - Safari fix with will-change */}
                    <motion.div
                        className="absolute -inset-4 rounded-full pointer-events-none -z-20"
                        style={{
                            background: 'radial-gradient(circle, transparent 40%, rgba(103, 232, 249, 0.4) 60%, transparent 80%)',
                            filter: useTransform(glowScale, (s) => {
                                const blur = 20 + s * 5;
                                return `blur(${blur}px)`;
                            }),
                            opacity: isActive,
                            transform: useTransform(glowScale, (s) => `scale(${s})`),
                            willChange: 'transform, filter, opacity'
                        }}
                    />
                </div>
                {/* Spacer per mantenere altezza uguale al layer content */}
                <div className="w-full flex-1 opacity-0 pointer-events-none">
                    <div className="bg-[#020617] rounded-2xl border border-slate-700/50 p-6 h-full relative overflow-hidden">
                        {/* Shader Background */}
                        <div className="absolute inset-0 opacity-50 pointer-events-none">
                            <ShaderBackground />
                        </div>
                        <div className="w-32 h-32 mb-6" />
                        <div className="mb-4"><div className="h-6 mb-1" /><div className="h-4" /></div>
                        <div className="mb-6 h-16" />
                        <div className="space-y-3">
                            {step.details.map((_, i) => <div key={i} className="h-5" />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render solo il contenuto (layer mascherato)
    if (variant === 'content-only') {
        return (
            <div ref={thisCardRef} className="timeline-mobile-card flex flex-col items-center gap-4 px-4">
                {/* Step Number Circle - con shader background */}
                <div className="relative shrink-0 rounded-full">
                    <motion.div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono font-bold text-lg md:text-xl relative z-10 border-2 overflow-hidden"
                        style={{
                            background: circleBackground,
                            borderColor: circleBorderColor
                        }}
                    >
                        {/* Shader Background dentro il cerchio */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-0"
                            style={{ opacity: isActive }}
                        >
                            <ShaderBackground priority={8} targetFPS={24} style={{ borderRadius: '9999px', zIndex: 0 }} />
                        </motion.div>
                        {/* Number */}
                        <motion.span
                            className="relative z-20 text-white"
                            style={{ opacity: iconOpacity }}
                        >
                            {step.step}
                        </motion.span>
                    </motion.div>
                </div>

                {/* Card Content */}
                <div className="w-full flex-1 bg-[#020617] rounded-2xl border border-slate-700/50 p-6 flex flex-col relative overflow-hidden">
                    {/* Shader Background */}
                    <div className="absolute inset-0 opacity-50 pointer-events-none">
                        <ShaderBackground />
                    </div>

                    {/* 3D Icon */}
                    <motion.div
                        className="flex items-center justify-center mb-6 relative z-10"
                        style={{
                            opacity: iconOpacity
                        }}
                    >
                        <img
                            src={step.image3d}
                            alt={step.title}
                            className="w-32 h-32 object-contain"
                        />
                    </motion.div>

                    {/* Title & Subtitle */}
                    <div className="mb-4 relative z-10">
                        <h3 className="text-xl font-bold text-white font-inter mb-1">
                            {step.title}
                        </h3>
                        <p className="text-sm text-cyan-400 font-medium">
                            {step.subtitle}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm relative z-10">
                        {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 relative z-10">
                        {step.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                <span className="text-sm text-gray-200 leading-relaxed">
                                    {detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Render completo (default - per backward compatibility)
    return (
        <div ref={thisCardRef} className="timeline-mobile-card flex flex-col items-center gap-4">
            {/* Step Number Circle - centered vertically to card */}
            <div className="relative shrink-0 rounded-full overflow-visible">
                <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono font-bold text-lg md:text-xl relative z-10 border-2"
                    style={{
                        background: circleBackground,
                        borderColor: circleBorderColor
                    }}
                >
                    {/* Number - white/gray when inactive */}
                    <motion.span
                        className="relative text-gray-400"
                        style={{
                            opacity: useTransform(isActive, [0, 1], [1, 0])
                        }}
                    >
                        {step.step}
                    </motion.span>
                    {/* Number - gradient when active */}
                    <motion.span
                        className="absolute bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_200%]"
                        style={{
                            opacity: isActive,
                            animation: 'gradient 3s ease infinite'
                        }}
                    >
                        {step.step}
                    </motion.span>
                </motion.div>
                {/* Luminous glow effect around circle - Safari fix with will-change */}
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none -z-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0.3) 50%, transparent 70%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 15 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
                        transform: useTransform(glowScale, (s) => `scale(${s})`),
                        willChange: 'transform, filter, opacity'
                    }}
                />
                {/* Outer glow ring - Safari fix with will-change */}
                <motion.div
                    className="absolute -inset-4 rounded-full pointer-events-none -z-20"
                    style={{
                        background: 'radial-gradient(circle, transparent 40%, rgba(103, 232, 249, 0.4) 60%, transparent 80%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 20 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
                        transform: useTransform(glowScale, (s) => `scale(${s})`),
                        willChange: 'transform, filter, opacity'
                    }}
                />
            </div>

            {/* Card Content */}
            <div className="w-full flex-1 bg-[#020617] rounded-2xl border border-slate-700/50 p-6 flex flex-col relative overflow-hidden">
                {/* Shader Background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <ShaderBackground />
                </div>

                {/* 3D Icon */}
                <motion.div
                    className="flex items-center justify-center mb-6 relative z-10"
                    style={{
                        opacity: iconOpacity
                    }}
                >
                    <img
                        src={step.image3d}
                        alt={step.title}
                        className="w-32 h-32 object-contain"
                    />
                </motion.div>

                {/* Title & Subtitle */}
                <div className="mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-white font-inter mb-1">
                        {step.title}
                    </h3>
                    <p className="text-sm text-cyan-400 font-medium">
                        {step.subtitle}
                    </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 text-sm relative z-10">
                    {step.description}
                </p>

                {/* Details */}
                <div className="space-y-3 relative z-10">
                    {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                            <span className="text-sm text-gray-200 leading-relaxed">
                                {detail}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileCard;
