import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'motion/react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { useScrollAnimation } from '../PerformanceMetrics/hooks/useScrollAnimation';
import { useFadeMask } from '../PerformanceMetrics/hooks/useFadeMask';
import { useCardHeight } from '../CampaignShowcase/hooks/useCardHeight';
import { useCenteredPosition } from '../PerformanceMetrics/hooks/useCenteredPosition';
import { processSteps, ditherStyles } from './constants';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import { DitherShader } from '@/components/ui/dither-shader';
import { useNumberImage } from '@/components/services/hooks';


// --- Chart data ---
const barChartData = [
    { name: 'W1', value: 40 },
    { name: 'W2', value: 65 },
    { name: 'W3', value: 55 },
    { name: 'W4', value: 80 },
    { name: 'W5', value: 70 },
    { name: 'W6', value: 95 },
];

const lineChartData = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 35 },
    { name: 'Mar', value: 28 },
    { name: 'Apr', value: 52 },
    { name: 'May', value: 45 },
    { name: 'Jun', value: 68 },
    { name: 'Jul', value: 78 },
];

const pieChartData = [
    { name: 'Organic', value: 54 },
    { name: 'Paid', value: 46 },
];

const growthChartData = [
    { name: 'Q1', value: 20 },
    { name: 'Q2', value: 35 },
    { name: 'Q3', value: 55 },
    { name: 'Q4', value: 90 },
    { name: 'Q5', value: 140 },
    { name: 'Q6', value: 210 },
];


// --- Chart components (mobile-adapted, prefixed gradient IDs) ---

const MobileBarChart = ({ color }) => (
    <div className="w-full h-36">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
                <defs>
                    <linearGradient id="mobile-barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Bar
                    dataKey="value"
                    fill="url(#mobile-barGradient)"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const MobileLineChart = ({ color }) => (
    <div className="w-full h-36">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
                <defs>
                    <linearGradient id={`mobile-lineGradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={3}
                    dot={{ fill: color, r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1500}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const MobilePieChart = ({ color }) => {
    const colors = [color, 'rgba(255,255,255,0.15)'];
    return (
        <div className="relative w-36 h-36 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={4}
                        dataKey="value"
                        animationDuration={1200}
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell
                                key={`mobile-cell-${index}`}
                                fill={colors[index]}
                                stroke="rgba(0,0,0,0.3)"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-xl font-bold text-white">54%</p>
                    <p className="text-xs text-slate-400">Organic</p>
                </div>
            </div>
        </div>
    );
};

const MobileMetricBlocks = ({ color, isActive }) => (
    <div className="grid grid-cols-2 gap-3 w-full">
        {[
            { value: '+127%', label: 'Growth' },
            { value: '3.2x', label: 'ROAS' },
            { value: '48h', label: 'Response' },
            { value: '99.9%', label: 'Uptime' }
        ].map((metric, i) => (
            <motion.div
                key={i}
                className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                style={{ opacity: isActive }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
            >
                <span className="text-xl font-bold block" style={{ color }}>{metric.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">{metric.label}</span>
            </motion.div>
        ))}
    </div>
);

const MobileGrowthAreaChart = ({ color }) => (
    <div className="w-full h-36">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthChartData}>
                <defs>
                    <linearGradient id="mobile-growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={3}
                    fill="url(#mobile-growthGradient)"
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const chartComponents = [
    MobileBarChart,       // Step 1: Discovery
    MobilePieChart,       // Step 2: Design
    MobileLineChart,      // Step 3: Launch
    MobileMetricBlocks,   // Step 4: Reporting
    MobileGrowthAreaChart // Step 5: Growth
];


// --- DemoMobileCard ---

const DemoMobileCard = ({ step, index, totalSteps, scrollProgress }) => {
    const numberImage = useNumberImage(step.step, index);
    const dStyle = ditherStyles[index % ditherStyles.length];
    const color = dStyle.color;
    const chartFirst = index % 2 === 0;

    // Crossfade logic (same as MobileCard.js)
    const numTransitions = totalSteps - 1;
    const transitionWidth = 1 / numTransitions;
    const center = index / numTransitions;
    const isFirstVisible = index === 0;
    const isLastVisible = index === totalSteps - 1;

    const inputRange = isFirstVisible
        ? [center, center + transitionWidth]
        : isLastVisible
            ? [center - transitionWidth, center]
            : [center - transitionWidth, center, center + transitionWidth];

    const outputRange = isFirstVisible
        ? [1, 0.35]
        : isLastVisible
            ? [0.35, 1]
            : [0.35, 1, 0.35];

    const isActive = useTransform(scrollProgress, inputRange, outputRange);

    const [isFullyActive, setIsFullyActive] = useState(false);
    useMotionValueEvent(isActive, "change", (v) => setIsFullyActive(v > 0.5));

    const ChartComponent = chartComponents[index % chartComponents.length];

    const chartSection = (
        <div className={`${chartFirst ? 'mb-5' : 'mt-5'} flex-1 flex items-center`}>
            <ChartComponent color={color} isActive={isActive} />
        </div>
    );

    const contentSection = (
        <>
            {/* Dithered step number — matching desktop StepCard */}
            <div className="flex mb-4">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    {numberImage && (
                        <DitherShader
                            src={numberImage}
                            colorMode="duotone"
                            primaryColor="#020617"
                            secondaryColor={color}
                            ditherMode="bayer"
                            gridSize={2}
                            threshold={0.3}
                            contrast={1.8}
                            objectFit="contain"
                        />
                    )}
                </div>
            </div>

            {/* Title & subtitle — matching desktop */}
            <h3 className="heading-h3 text-white mb-1">{step.title}</h3>
            <p className="text-sm font-medium mb-3" style={{ color }}>{step.subtitle}</p>
            <p className="text-body text-slate-300 leading-relaxed demo-card-description">{step.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-5">
                {step.details.slice(0, 2).map((detail, i) => (
                    <MovingBorderButton key={i} variant="tag" color={color} as="span" paused={!isFullyActive}>
                        <span className="text-xs text-slate-300">{detail}</span>
                    </MovingBorderButton>
                ))}
            </div>
        </>
    );

    return (
        <motion.div
            className="demo-timeline-mobile-card flex flex-col items-center pb-2 pr-2"
            style={{ opacity: isActive }}
        >
            <div
                className="w-full h-full rounded-2xl border overflow-hidden flex flex-col"
                style={{
                    borderColor: `${color}25`,
                    backgroundColor: '#020617',
                    boxShadow: `6px 6px 0px ${color}`,
                    minHeight: 520,
                }}
            >
                <div className="p-6 flex flex-col flex-1">
                    {chartFirst ? (
                        <>{chartSection}{contentSection}</>
                    ) : (
                        <>{contentSection}{chartSection}</>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


// --- DemoTimelineMobile ---

const DemoTimelineMobile = () => {
    const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd, scrollYProgress } =
        useScrollAnimation(true);
    const stickyContentRef = useRef(null);
    const maskImage = useFadeMask(isAtStart, isAtEnd, 32);
    const { showText: showTextFromHook } = useCardHeight(stickyContentRef);
    const topPosition = useCenteredPosition(stickyContentRef);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        const checkWidth = () => setIsSmallScreen(window.innerWidth < 500);
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    const showText = isSmallScreen ? false : showTextFromHook;

    return (
        <div className="lg:hidden mobile-timeline-container">
            {/* Title */}
            <div className="mobile-timeline-title">
                <h2 className="heading-h1 text-white text-center max-w-4xl mx-auto">
                    Our proven process ensures clarity, efficiency, and exceptional results
                </h2>
                <p className="text-subheader text-center max-w-2xl mx-auto">
                    Every stage is designed to deliver measurable impact, from strategy to scale
                </p>
            </div>

            {/* Scroll container */}
            <div style={{ height: `${processSteps.length * 100}vh`, position: 'relative' }} ref={containerRef}>
                <div
                    ref={stickyContentRef}
                    className="sticky flex flex-col"
                    style={{ top: topPosition, overflowX: 'clip', overflowY: 'visible' }}
                >
                    {/* Cards */}
                    <div className="w-full relative">
                        <div
                            ref={wrapperRef}
                            className="relative mobile-timeline-wrapper"
                            style={{
                                opacity: isReady ? 1 : 0,
                                transition: 'opacity 0.2s ease-out',
                                overflowX: 'clip',
                                overflowY: 'visible',
                                paddingBottom: showText ? 0 : undefined,
                            }}
                        >
                            {/* Content layer with fade mask */}
                            <div style={{ maskImage, WebkitMaskImage: maskImage }}>
                                <motion.div
                                    ref={cardsRef}
                                    className="flex items-stretch mobile-timeline-cards"
                                    style={{ x }}
                                >
                                    {processSteps.map((step, index) => (
                                        <DemoMobileCard
                                            key={`demo-mobile-${step.step}`}
                                            step={step}
                                            index={index}
                                            totalSteps={processSteps.length}
                                            scrollProgress={scrollYProgress}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Hook text inside sticky - shown conditionally */}
                    {showText && (
                        <div className="campaign-header text-right">
                            <h3 className="heading-h2 text-white">
                                From Strategy to Scale
                            </h3>
                            <p className="text-subheader mt-4">
                                A systematic approach that transforms insights into growth. Every step is optimized for maximum impact.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hook text after scroll - shown when not enough space in sticky */}
            {!showText && (
                <div className="campaign-header text-right">
                    <h3 className="heading-h2 text-white">
                        From Strategy to Scale
                    </h3>
                    <p className="text-subheader mt-4">
                        A systematic approach that transforms insights into growth. Every step is optimized for maximum impact.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DemoTimelineMobile;
