import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ProcessStep = ({ step, index }) => {
    const stepRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: stepRef,
        offset: ["start 0.7", "end 0.3"]
    });

    // Active quando lo step è al centro (range più stretto per spotlight effect - single focus)
    // Transizione più rigida per effetto netto
    const isActive = useTransform(
        scrollYProgress,
        [0, 0.45, 0.55, 1],
        [0, 1, 1, 0]
    );

    const borderColor = useTransform(
        isActive,
        [0, 1],
        ['rgba(71, 85, 105, 0.5)', '#67e8f9']
    );

    const circleBorderColor = useTransform(
        isActive,
        [0, 1],
        ['rgba(255, 255, 255, 0.2)', 'rgba(103, 232, 249, 0.8)']
    );

    const circleBackground = useTransform(
        isActive,
        [0, 1],
        ['#0f172a', '#1e293b']
    );

    const glowScale = useTransform(isActive, [0, 1], [1, 1.8]);

    // Debug scale del glow e blur
    React.useEffect(() => {
        const unsubscribeActive = isActive.on('change', (v) => {
            // Track active state changes
        });
        const unsubscribeScale = glowScale.on('change', (v) => {
            // Track glow scale changes
        });

        return () => {
            unsubscribeActive();
            unsubscribeScale();
        };
    }, [isActive, glowScale, step.step]);

    // Card movement - slide right when active
    const cardX = useTransform(isActive, [0, 1], [0, 20]);

    return (
        <div
            ref={stepRef}
            className="process-step"
        >
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

            {/* Step Content Card */}
            <motion.div
                className="process-step-card"
                style={{
                    borderColor,
                    x: cardX
                }}
            >
                {/* Row 1: Title + Description + 3D Icon */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-6">
                    {/* Left: Title + Description */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white font-inter mb-1">
                            {step.title}
                        </h3>
                        <p className="text-sm text-cyan-400 font-medium mb-4">
                            {step.subtitle}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            {step.description}
                        </p>
                    </div>

                    {/* Right: 3D Icon */}
                    <motion.div
                        className="hidden lg:flex items-center justify-center"
                        style={{
                            opacity: isActive,
                            rotate: useTransform(isActive, [0, 1], [-5, 0])
                        }}
                    >
                        <img
                            src={step.image3d}
                            alt={step.title}
                            className="w-48 h-48 object-contain"
                        />
                    </motion.div>
                </div>

                {/* Row 2: Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.details.map((detail, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                            <span className="text-sm text-gray-200 leading-relaxed">
                                {detail}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProcessStep;
