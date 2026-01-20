import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ShaderBackground from '../ShaderBackground';

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

    // Wave effect per il glow - ciclo continuo quando la card è attiva
    const [glowWave, setGlowWave] = React.useState(0);

    React.useEffect(() => {
        let animationFrameId;
        let startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            // Onda sinusoidale: oscilla tra 0.8 e 1.2 con periodo di 2 secondi
            const wave = 1 + Math.sin(elapsed / 1000 * Math.PI) * 0.2;
            setGlowWave(wave);
            animationFrameId = requestAnimationFrame(animate);
        };

        const unsubscribe = isActive.on('change', (v) => {
            if (v > 0.5) {
                // Avvia l'animazione quando la card diventa attiva
                startTime = Date.now();
                animate();
            } else {
                // Ferma l'animazione quando non è attiva
                cancelAnimationFrame(animationFrameId);
                setGlowWave(0);
            }
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            unsubscribe();
        };
    }, [isActive]);

    // Icone mantengono 100% opacity quando attive
    const iconOpacity = useTransform(isActive, [0, 1], [0.2, 1]);

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

                    {/* Number - white/gray when inactive */}
                    <motion.span
                        className="relative z-20 text-slate-400"
                        style={{
                            opacity: useTransform(isActive, [0, 1], [1, 0])
                        }}
                    >
                        {step.step}
                    </motion.span>
                    {/* Number - gradient when active */}
                    <motion.span
                        className="absolute z-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_200%]"
                        style={{
                            opacity: isActive,
                            animation: 'gradient 3s ease infinite'
                        }}
                    >
                        {step.step}
                    </motion.span>
                </motion.div>
                {/* Luminous glow effect around circle - Safari fix with will-change + wave effect */}
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none -z-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0.3) 50%, transparent 70%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 15 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
                        transform: `scale(${glowWave || 1})`,
                        willChange: 'transform, filter, opacity'
                    }}
                />
                {/* Outer glow ring - Safari fix with will-change + wave effect */}
                <motion.div
                    className="absolute -inset-4 rounded-full pointer-events-none -z-20"
                    style={{
                        background: 'radial-gradient(circle, transparent 40%, rgba(103, 232, 249, 0.4) 60%, transparent 80%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 20 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
                        transform: `scale(${glowWave || 1})`,
                        willChange: 'transform, filter, opacity'
                    }}
                />
            </div>

            {/* Step Content Card */}
            <motion.div
                className="process-step-card relative overflow-hidden"
                style={{
                    borderColor,
                    x: cardX
                }}
            >
                {/* Shader Background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <ShaderBackground />
                </div>

                {/* Gradient Background - matching mobile */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.03) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(168, 85, 247, 0.03) 100%)',
                        opacity: isActive
                    }}
                />

                {/* Row 1: Title + Description + 3D Icon */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-6 relative z-10">
                    {/* Left: Title + Description */}
                    <div>
                        <h3 className="heading-h3 text-white mb-1">
                            {step.title}
                        </h3>
                        <p className="text-sm text-cyan-400 font-medium mb-4">
                            {step.subtitle}
                        </p>
                        <p className="text-body-lg">
                            {step.description}
                        </p>
                    </div>

                    {/* Right: 3D Icon - mantiene 100% opacity quando attivo */}
                    <motion.div
                        className="hidden lg:flex items-center justify-center"
                        style={{
                            opacity: iconOpacity,
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {step.details.map((detail, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                            <span className="text-sm text-slate-200 leading-relaxed">
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
