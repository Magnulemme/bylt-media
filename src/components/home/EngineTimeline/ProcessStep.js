import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ShaderBackground from '../ShaderBackground';
import { DitherShader } from '@/components/ui/dither-shader';
import { ditherStyles } from './constants';
import { useNumberImage } from '@/components/services/hooks';

const ProcessStep = ({ step, index }) => {
    const stepRef = useRef(null);
    const numberImage = useNumberImage(step.step, index);

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
    // Usa ref invece di state per evitare re-render a 60fps
    const glowRef1 = React.useRef(null);
    const glowRef2 = React.useRef(null);
    const isAnimatingRef = React.useRef(false);

    React.useEffect(() => {
        let animationFrameId;
        let startTime = Date.now();

        const animate = () => {
            if (!isAnimatingRef.current) return;
            const elapsed = Date.now() - startTime;
            const wave = 1 + Math.sin(elapsed / 1000 * Math.PI) * 0.2;
            // Aggiorna direttamente il DOM senza passare per React state
            if (glowRef1.current) glowRef1.current.style.transform = `scale(${wave})`;
            if (glowRef2.current) glowRef2.current.style.transform = `scale(${wave})`;
            animationFrameId = requestAnimationFrame(animate);
        };

        const unsubscribe = isActive.on('change', (v) => {
            if (v > 0.5 && !isAnimatingRef.current) {
                isAnimatingRef.current = true;
                startTime = Date.now();
                animate();
            } else if (v <= 0.5) {
                isAnimatingRef.current = false;
                cancelAnimationFrame(animationFrameId);
                // Reset scale quando non attivo
                if (glowRef1.current) glowRef1.current.style.transform = 'scale(1)';
                if (glowRef2.current) glowRef2.current.style.transform = 'scale(1)';
            }
        });

        return () => {
            isAnimatingRef.current = false;
            cancelAnimationFrame(animationFrameId);
            unsubscribe();
        };
    }, [isActive]);

    // Icone mantengono 100% opacity quando attive
    const iconOpacity = useTransform(isActive, [0, 1], [0.2, 1]);

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
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative z-10 border-2 overflow-hidden"
                    style={{
                        background: circleBackground,
                        borderColor: circleBorderColor
                    }}
                >
                    {/* Dithered Number */}
                    {numberImage && (
                        <motion.div
                            className="absolute inset-0 z-20"
                            style={{ opacity: iconOpacity }}
                        >
                            <DitherShader
                                src={numberImage}
                                colorMode="duotone"
                                primaryColor="#0f172a"
                                secondaryColor={ditherStyles[index % ditherStyles.length].color}
                                ditherMode={ditherStyles[index % ditherStyles.length].ditherMode}
                                gridSize={4}
                                threshold={0.35}
                                contrast={1.6}
                                objectFit="contain"
                            />
                        </motion.div>
                    )}
                </motion.div>
                {/* Luminous glow effect around circle - Safari fix with will-change + wave effect */}
                <motion.div
                    ref={glowRef1}
                    className="absolute inset-0 rounded-full pointer-events-none -z-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0.3) 50%, transparent 70%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 15 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
                        willChange: 'transform, filter, opacity'
                    }}
                />
                {/* Outer glow ring - Safari fix with will-change + wave effect */}
                <motion.div
                    ref={glowRef2}
                    className="absolute -inset-4 rounded-full pointer-events-none -z-20"
                    style={{
                        background: 'radial-gradient(circle, transparent 40%, rgba(103, 232, 249, 0.4) 60%, transparent 80%)',
                        filter: useTransform(glowScale, (s) => {
                            const blur = 20 + s * 5;
                            return `blur(${blur}px)`;
                        }),
                        opacity: isActive,
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

                    {/* Right: 3D Icon with Dither Effect */}
                    <motion.div
                        className="hidden lg:flex items-center justify-center w-48 h-48"
                        style={{
                            opacity: iconOpacity,
                            rotate: useTransform(isActive, [0, 1], [-5, 0])
                        }}
                    >
                        <DitherShader
                            src={step.image3d}
                            colorMode="duotone"
                            primaryColor="#020617"
                            secondaryColor={ditherStyles[index % ditherStyles.length].color}
                            ditherMode={ditherStyles[index % ditherStyles.length].ditherMode}
                            gridSize={ditherStyles[index % ditherStyles.length].gridSize}
                            threshold={ditherStyles[index % ditherStyles.length].threshold}
                            contrast={ditherStyles[index % ditherStyles.length].contrast}
                            objectFit="contain"
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
