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
    const MobileCard = ({ step, cardRef, index, totalSteps, scrollProgress }) => {
        const thisCardRef = useRef(null);
        const isLastCard = index === totalSteps - 1;
        const [cardExitProgress, setCardExitProgress] = React.useState(0);
        const startPositionRef = useRef(null);

        // Calcola quando questa card è al centro dello schermo
        // Per 5 card: card 0 al centro quando progress = 0, card 1 quando = 0.25, ecc.
        const cardCenterProgress = index / (totalSteps - 1);

        // Range di attivazione del glow - aumentato per durare di più
        const glowRange = 0.18;

        // Per l'ultima card: traccia quando esce dal viewport con scroll listener
        React.useEffect(() => {
            if (!isLastCard) return;

            console.log('🎯 Last card effect mounted');

            const handleScroll = () => {
                if (!thisCardRef.current) {
                    console.log('⚠️ thisCardRef.current is null');
                    return;
                }

                // Ottieni il progresso orizzontale corrente
                const currentHorizontalProgress = scrollProgress.get();

                const rect = thisCardRef.current.getBoundingClientRect();
                const currentTop = rect.top;

                // Salva la posizione iniziale SOLO quando lo scroll orizzontale è completo (= 1)
                if (startPositionRef.current === null && currentHorizontalProgress >= 0.99) {
                    startPositionRef.current = currentTop;
                    console.log('📍 Start position saved:', currentTop, 'at horizontalProgress:', currentHorizontalProgress);
                }

                // Se non abbiamo ancora la posizione iniziale, non calcolare nulla
                if (startPositionRef.current === null) {
                    console.log('⏳ Waiting for horizontal scroll to complete...');
                    return;
                }

                // Calcola il progress: da posizione iniziale (0) a top = 0 (1)
                const startPos = startPositionRef.current;
                const distance = startPos; // Distanza da percorrere fino a top = 0
                const traveled = startPos - currentTop; // Quanto è salita la card

                const progress = distance > 0 ? Math.min(1, Math.max(0, traveled / distance)) : 0;

                console.log('📊 Card Exit Progress:', {
                    currentTop: currentTop.toFixed(2),
                    startPos: startPos.toFixed(2),
                    distance: distance.toFixed(2),
                    traveled: traveled.toFixed(2),
                    progress: progress.toFixed(3)
                });

                setCardExitProgress(progress);
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Chiamata iniziale

            return () => {
                console.log('🧹 Cleaning up scroll listener');
                window.removeEventListener('scroll', handleScroll);
            };
        }, [isLastCard, scrollProgress]);

        // Comportamento standard per tutte le card: glow sale e scende
        const baseActive = useTransform(
            scrollProgress,
            [
                Math.max(0, cardCenterProgress - glowRange),
                cardCenterProgress,
                Math.min(1, cardCenterProgress + glowRange)
            ],
            [0, 1, 0]  // Sale e scende
        );

        // Per l'ultima card: glow resta a 1 dopo il centro, poi diminuisce quando la card esce
        const isActive = isLastCard
            ? useTransform(
                scrollProgress,
                (horizontalProgress) => {
                    // Fase 1: Glow sale normalmente fino al centro (scroll orizzontale)
                    if (horizontalProgress < cardCenterProgress) {
                        const normalizedProgress = (horizontalProgress - (cardCenterProgress - glowRange)) / glowRange;
                        const result = Math.max(0, Math.min(1, normalizedProgress));
                        console.log('✨ Phase 1 - Rising:', { horizontalProgress: horizontalProgress.toFixed(3), result: result.toFixed(3) });
                        return result;
                    }

                    // Fase 2: Glow rimane a 1 durante tutto lo scroll orizzontale
                    if (horizontalProgress < 1) {
                        console.log('✨ Phase 2 - Plateau:', { horizontalProgress: horizontalProgress.toFixed(3), result: 1 });
                        return 1;
                    }

                    // Fase 3: Scroll orizzontale finito (horizontalProgress = 1)
                    // Usa cardExitProgress dallo stato (calcolato con JS listener)
                    // exitProgress: 0 = card ancora visibile, 1 = top card al top schermo
                    // Glow diminuisce mentre la card sale e esce
                    const result = Math.max(0, 1 - cardExitProgress);
                    console.log('✨ Phase 3 - Exit:', { horizontalProgress: horizontalProgress.toFixed(3), cardExitProgress: cardExitProgress.toFixed(3), result: result.toFixed(3) });
                    return result;
                }
            )
            : baseActive;

        const glowScale = useTransform(isActive, [0, 1], [1, 1.8]);

        return (
            <div
                ref={(el) => {
                    thisCardRef.current = el;
                    if (cardRef) cardRef.current = el;
                }}
                className="mobile-timeline-card-wrapper"
            >
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
                    className="mobile-timeline-card"
                    style={{
                        borderColor: useTransform(
                            isActive,
                            [0, 1],
                            ['rgba(71, 85, 105, 0.5)', '#67e8f9']
                        )
                    }}
                >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6 flex-shrink-0">
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
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm flex-shrink-0">
                        {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 flex-grow flex flex-col justify-end">
                        {step.details.map((detail, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                                <span className="text-sm text-gray-200 leading-relaxed">
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
            className="engine-timeline-section"
        >
            <div className="relative z-10">
                {/* Desktop Version */}
                <div className="hidden md:block">
                    {/* Content container */}
                    <div className="engine-timeline-container engine-timeline-title-container">
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
                    <div className="engine-timeline-container">
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
                    <div ref={mobileTitleRef} className="mobile-timeline-container">
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
                            className="mobile-timeline-sticky"
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
