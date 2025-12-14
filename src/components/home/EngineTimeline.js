import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Lightbulb, Construction, Rocket, BarChart, TrendingUp } from 'lucide-react';

// Word Component with Motion (same as OfficialPartnerSection)
const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block mr-[0.25em]"
        >
            {children}
        </motion.span>
    );
};

// Scroll Reveal Text Component
const ScrollRevealText = ({ text, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });

    const words = text.split(' ');

    return (
        <h3 ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;

                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </h3>
    );
};

const EngineTimeline = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const mobileTitleRef = useRef(null);
    const sectionRef = useRef(null);
    const [cardHeight, setCardHeight] = React.useState(0);
    const [isMounted, setIsMounted] = React.useState(false);

    // Mobile scroll progress per il card switching
    const { scrollYProgress: mobileScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Scroll progress per gestire la scomparsa del glow alla fine
    const { scrollYProgress: sectionExitProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Forza un re-render dopo il mount per inizializzare useScroll correttamente
    React.useEffect(() => {
        setIsMounted(true);

        // Forza un piccolo scroll per attivare i calcoli di Framer Motion
        const timer = setTimeout(() => {
            if (containerRef.current) {
                const currentScroll = window.scrollY;
                window.scrollTo({ top: currentScroll + 1, behavior: 'instant' });
                window.scrollTo({ top: currentScroll, behavior: 'instant' });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Calcola l'altezza della card per il posizionamento sticky
    React.useEffect(() => {
        const updateCardHeight = () => {
            if (cardRef.current) {
                const height = cardRef.current.offsetHeight;
                setCardHeight(height);
            }
        };

        updateCardHeight();
        window.addEventListener('resize', updateCardHeight);
        return () => window.removeEventListener('resize', updateCardHeight);
    }, []);

    // Step Component with scroll-driven spotlight activation
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

        // Icon colors - più netti per evitare momenti senza contrasto
        const iconBackground = useTransform(
            isActive,
            [0, 0.3, 0.7, 1],
            ['rgba(51, 65, 85, 0.4)', 'rgba(51, 65, 85, 0.4)', '#67e8f9', '#67e8f9']
        );

        const iconColor = useTransform(
            isActive,
            [0, 0.3, 0.7, 1],
            ['rgba(209, 213, 219, 1)', 'rgba(209, 213, 219, 1)', '#0f172a', '#0f172a']
        );

        const glowScale = useTransform(isActive, [0, 1], [1, 1.8]);

        // Log per debug scale del glow e blur
        React.useEffect(() => {
            const unsubscribeActive = isActive.on('change', (v) => {
                console.log(`📍 Step ${step.step} - isActive:`, v.toFixed(3));
            });
            const unsubscribeScale = glowScale.on('change', (v) => {
                const innerBlur = 15 + v * 5;
                const outerBlur = 20 + v * 5;
                console.log(`✨ Step ${step.step} - glowScale: ${v.toFixed(3)} | innerBlur: ${innerBlur.toFixed(1)}px | outerBlur: ${outerBlur.toFixed(1)}px`);
            });

            // Log iniziale
            console.log(`🚀 Step ${step.step} initialized - Device: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`);

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
                className="relative flex items-center justify-center gap-6 md:gap-8 mb-16"
            >
                {/* Step Number Circle - centered vertically to card */}
                <div className="relative flex-shrink-0 rounded-full overflow-visible">
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
                                console.log(`🔵 Inner glow blur for Step ${step.step}:`, blur.toFixed(1) + 'px');
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
                                console.log(`🟣 Outer glow blur for Step ${step.step}:`, blur.toFixed(1) + 'px');
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
                    className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border"
                    style={{
                        borderColor,
                        x: cardX
                    }}
                >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: iconBackground,
                                color: iconColor
                            }}
                        >
                            {step.icon}
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white font-inter mb-1">
                                {step.title}
                            </h3>
                            <p className="text-sm text-cyan-400 font-medium">
                                {step.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                        {step.description}
                    </p>

                    {/* Details Grid */}
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

    const processSteps = [
        {
            step: "01",
            title: "Discovery & Strategy",
            subtitle: "Foundation & Alignment",
            description: "We dive deep into your business, market, and goals. This phase is about aligning on a data-driven strategy that sets the foundation for success.",
            icon: <Lightbulb size={24} />,
            details: [
                "Comprehensive business analysis",
                "Goal setting and KPI definition",
                "Competitive landscape assessment",
                "Strategic roadmap development"
            ]
        },
        {
            step: "02",
            title: "Design & Development",
            subtitle: "Architecture & Creation",
            description: "Our team architects and builds the solution. We focus on quality, performance, and user experience.",
            icon: <Construction size={24} />,
            details: [
                "Technical architecture planning",
                "User experience design",
                "Development with modern frameworks",
                "Quality assurance and testing"
            ]
        },
        {
            step: "03",
            title: "Launch & Optimisation",
            subtitle: "Deployment & Refinement",
            description: "Deployment is just the beginning. We manage the launch, gather data, and begin our continuous optimisation cycle.",
            icon: <Rocket size={24} />,
            details: [
                "Staged deployment and monitoring",
                "Performance metrics tracking",
                "A/B testing implementation",
                "Continuous optimisation cycles"
            ]
        },
        {
            step: "04",
            title: "Reporting & Analytics",
            subtitle: "Transparency & Insights",
            description: "We believe in complete transparency. Our reports provide comprehensive insights and actionable recommendations.",
            icon: <BarChart size={24} />,
            details: [
                "Real-time dashboard creation",
                "Comprehensive performance reports",
                "ROI analysis and attribution",
                "Data-driven recommendations"
            ]
        },
        {
            step: "05",
            title: "Growth & Scaling",
            subtitle: "Expansion & Evolution",
            description: "Using insights gained, we identify new opportunities and scale what works, turning success into long-term growth.",
            icon: <TrendingUp size={24} />,
            details: [
                "Growth opportunity identification",
                "Scaling strategy development",
                "Resource optimisation",
                "Long-term partnership planning"
            ]
        }
    ];

    // Mobile Card Component - singola card con numero e contenuto
    const MobileCard = ({ step, cardRef, index, totalSteps, scrollProgress, exitProgress }) => {
        // Calcola quando questa card è al centro dello schermo
        // Per 5 card: card 0 al centro quando progress = 0, card 1 quando = 0.25, ecc.
        const cardCenterProgress = index / (totalSteps - 1);

        // Range di attivazione del glow - aumentato per durare di più
        const glowRange = 0.18;

        const isLastCard = index === totalSteps - 1;

        // Ultima card: rimane attiva dopo aver raggiunto il centro
        // Altre card: comportamento normale con range lungo
        const baseActive = useTransform(
            scrollProgress,
            isLastCard
                ? [
                    Math.max(0, cardCenterProgress - glowRange),
                    cardCenterProgress,
                    1  // Rimane a 1 fino alla fine
                ]
                : [
                    Math.max(0, cardCenterProgress - glowRange),
                    cardCenterProgress,
                    Math.min(1, cardCenterProgress + glowRange)
                ],
            isLastCard
                ? [0, 1, 1]  // Sale a 1 e ci rimane
                : [0, 1, 0]  // Sale e scende
        );

        // Per l'ultima card, riduci l'attivazione quando la sezione sta per finire
        // Il glow è in cima, quindi inizia a scomparire quando la sezione esce dal viewport
        const exitFade = useTransform(
            exitProgress,
            [0.7, 0.85],  // Inizia a scomparire dal 70% all'85% dello scroll
            [1, 0]
        );

        // Combina baseActive con exitFade solo per l'ultima card
        const isActive = isLastCard
            ? useTransform([baseActive, exitFade], ([active, fade]) => active * fade)
            : baseActive;

        const glowScale = useTransform(isActive, [0, 1], [1, 1.8]);

        return (
            <div ref={cardRef} className="flex-shrink-0 w-full h-full px-4 flex flex-col items-center justify-center">
                {/* Step Number Circle */}
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center font-mono font-bold text-2xl mb-6 border-2 bg-slate-900/80 backdrop-blur-lg flex-shrink-0"
                    style={{
                        borderColor: useTransform(
                            isActive,
                            [0, 1],
                            ['rgba(103, 232, 249, 0.3)', 'rgba(103, 232, 249, 0.8)']
                        )
                    }}
                >
                    {/* Number - gray when inactive */}
                    <motion.span
                        className="absolute text-gray-400"
                        style={{
                            opacity: useTransform(isActive, [0, 1], [1, 0])
                        }}
                    >
                        {step.step}
                    </motion.span>
                    {/* Number - gradient when active */}
                    <motion.span
                        className="absolute bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                        style={{
                            opacity: isActive
                        }}
                    >
                        {step.step}
                    </motion.span>

                    {/* Inner glow effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none -z-10"
                        style={{
                            background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6) 0%, rgba(103, 232, 249, 0.3) 50%, transparent 70%)',
                            filter: useTransform(glowScale, (s) => `blur(${15 + s * 5}px)`),
                            opacity: isActive,
                            transform: useTransform(glowScale, (s) => `scale(${s})`),
                            willChange: 'transform, filter, opacity'
                        }}
                    />
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-4 rounded-full pointer-events-none -z-20"
                        style={{
                            background: 'radial-gradient(circle, transparent 40%, rgba(103, 232, 249, 0.4) 60%, transparent 80%)',
                            filter: useTransform(glowScale, (s) => `blur(${20 + s * 5}px)`),
                            opacity: isActive,
                            transform: useTransform(glowScale, (s) => `scale(${s})`),
                            willChange: 'transform, filter, opacity'
                        }}
                    />
                </div>

                {/* Card Content */}
                <motion.div
                    className="w-full max-w-sm bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border flex flex-col flex-1"
                    style={{
                        borderColor: useTransform(
                            isActive,
                            [0, 1],
                            ['rgba(71, 85, 105, 0.5)', '#67e8f9']
                        )
                    }}
                >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4 flex-shrink-0">
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: useTransform(
                                    isActive,
                                    [0, 0.3, 0.7, 1],
                                    ['rgba(51, 65, 85, 0.4)', 'rgba(51, 65, 85, 0.4)', '#67e8f9', '#67e8f9']
                                ),
                                color: useTransform(
                                    isActive,
                                    [0, 0.3, 0.7, 1],
                                    ['rgba(209, 213, 219, 1)', 'rgba(209, 213, 219, 1)', '#0f172a', '#0f172a']
                                )
                            }}
                        >
                            {step.icon}
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white font-inter mb-1">
                                {step.title}
                            </h3>
                            <p className="text-sm text-cyan-400 font-medium">
                                {step.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm flex-shrink-0">
                        {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 flex-1 flex flex-col justify-start">
                        {step.details.map((detail, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-white/[0.03] rounded-lg p-2"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                                <span className="text-xs text-gray-200">
                                    {detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="process"
            className="relative pt-12 pb-32"
            style={{ background: '#020617' }}
        >
            <div className="relative z-10">
                {/* Minimal mono title */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="flex items-center gap-3 justify-end">
                        <span className="text-cyan-400 font-mono text-sm tracking-wide">
                            5)
                        </span>
                        <span className="text-white font-mono text-sm tracking-wide">
                            The BYLT Engine
                        </span>
                        <span className="text-gray-500 font-mono text-sm tracking-wide">
                            [Process]
                        </span>
                    </div>
                </div>

                {/* Desktop Version - unchanged */}
                <div className="hidden md:block">
                    {/* Content container */}
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                        <ScrollRevealText
                            text="Our proven process ensures clarity, efficiency, and exceptional results"
                            className="text-2xl md:text-4xl font-bold font-inter text-center leading-tight text-white mb-6"
                        />
                        <motion.p
                            className="text-gray-400 text-lg max-w-2xl mx-auto text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            Every stage is designed to deliver measurable impact, from strategy to scale
                        </motion.p>
                    </div>

                    {/* Steps Container */}
                    <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-8 relative">
                        {/* Steps */}
                        <div>
                            {processSteps.map((step, index) => (
                                <ProcessStep key={step.step} step={step} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Version - Horizontal scroll driven by vertical scroll */}
                <div className="md:hidden">
                    {/* Title - static */}
                    <div ref={mobileTitleRef} className="px-4 mb-8">
                        <h2 className="text-2xl font-bold font-inter text-center leading-tight text-white mb-4">
                            Our proven process ensures clarity, efficiency, and exceptional results
                        </h2>
                        <p className="text-gray-400 text-base text-center">
                            Every stage is designed to deliver measurable impact, from strategy to scale
                        </p>
                    </div>

                    {/* Tall container for vertical scroll space */}
                    <div style={{ height: '500vh' }} ref={containerRef}>
                        {/* Sticky wrapper - stays in viewport while scrolling */}
                        <div
                            className="sticky flex items-center overflow-x-clip py-12"
                            style={{
                                top: cardHeight > 0 ? `calc(50vh - ${cardHeight / 2}px - 3rem)` : 'calc(50% - 3rem)'
                            }}
                        >
                            {/* Horizontal scrolling cards container */}
                            <motion.div
                                className="flex items-stretch w-full"
                                style={{
                                    x: useTransform(
                                        mobileScrollProgress,
                                        [0, 1],
                                        ['0%', `-${(processSteps.length - 1) * 100}%`]
                                    )
                                }}
                            >
                                {processSteps.map((step, index) => (
                                    <MobileCard
                                        key={step.step}
                                        step={step}
                                        index={index}
                                        totalSteps={processSteps.length}
                                        scrollProgress={mobileScrollProgress}
                                        exitProgress={sectionExitProgress}
                                        cardRef={index === 0 ? cardRef : null}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EngineTimeline;
