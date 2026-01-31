import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis } from 'recharts';
import ScrollRevealText from './ScrollRevealText';
import { processSteps, ditherStyles } from './constants';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import ShaderBackground from '@/components/home/ShaderBackground';
import { DitherShader } from '@/components/ui/dither-shader';
import { useNumberImage } from '@/components/services/hooks';


// Dati per i grafici Recharts
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

// Grafico a barre con Recharts
const RechartsBarChart = ({ color }) => (
    <div className="w-full max-w-sm h-40">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
                <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

// Grafico a linea con Recharts
const RechartsLineChart = ({ color }) => (
    <div className="w-full max-w-sm h-40">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
                <defs>
                    <linearGradient id={`lineGradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
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
                    dot={{ fill: color, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1500}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// Grafico a torta con Recharts
const RechartsPieChart = ({ color }) => {
    const colors = [color, 'rgba(255,255,255,0.15)'];
    return (
        <div className="relative w-44 h-44">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                        animationDuration={1200}
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
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
                    <p className="text-2xl font-bold text-white">54%</p>
                    <p className="text-xs text-slate-400">Organic</p>
                </div>
            </div>
        </div>
    );
};

// Blocchi metriche animati
const MetricBlocks = ({ color, isActive }) => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {[
            { value: '+127%', label: 'Growth' },
            { value: '3.2x', label: 'ROAS' },
            { value: '48h', label: 'Response' },
            { value: '99.9%', label: 'Uptime' }
        ].map((metric, i) => (
            <motion.div
                key={i}
                className="px-5 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                style={{ opacity: isActive }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
            >
                <span className="text-2xl font-bold block" style={{ color }}>{metric.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">{metric.label}</span>
            </motion.div>
        ))}
    </div>
);

// Grafico di crescita con AreaChart
const GrowthAreaChart = ({ color }) => (
    <div className="w-full max-w-sm h-40">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthChartData}>
                <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#growthGradient)"
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

// Mappa degli step ai componenti grafici
const chartComponents = [
    RechartsBarChart,      // Step 1: Discovery - bar chart per analisi
    RechartsPieChart,      // Step 2: Design - pie per distribuzione
    RechartsLineChart,     // Step 3: Launch - line per trend
    MetricBlocks,          // Step 4: Reporting - metriche
    GrowthAreaChart,       // Step 5: Growth - area chart crescita
];

// Card info dello step
const StepCard = ({ step, index, color, isLeft, isFullyActive }) => {
    const numberImage = useNumberImage(step.step, index);
    const align = isLeft ? 'text-right' : 'text-left';
    const tagJustify = isLeft ? 'justify-end' : 'justify-start';

    return (
        <div
            className={`max-w-md rounded-2xl border overflow-hidden ${align}`}
            style={{
                borderColor: `${color}25`,
                backgroundColor: '#020617',
                boxShadow: `6px 6px 0px ${color}`,
            }}
        >
            <div className="p-7">
                {/* Dithered step number */}
                <div className={`flex mb-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
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

                <h3 className="heading-h3 text-white mb-1">{step.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color }}>{step.subtitle}</p>
                <p className="text-body text-slate-300 leading-relaxed">{step.description}</p>

                <div className={`flex flex-wrap gap-2 mt-5 ${tagJustify}`}>
                    {step.details.slice(0, 2).map((detail, i) => (
                        <MovingBorderButton key={i} variant="tag" color={color} as="span" paused={!isFullyActive}>
                            <span className="text-xs text-slate-300">{detail}</span>
                        </MovingBorderButton>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Singolo step della timeline
const STEP_COUNT = processSteps.length;

const TimelineStep = ({ step, index, isLeft, isLast, scrollYProgress }) => {
    const color = ditherStyles[index % ditherStyles.length].color;

    const segment = 1 / STEP_COUNT;
    const overlap = segment * 0.2;
    const fadeInStart = Math.max(0, index * segment - overlap);
    const fullStart = index * segment + segment * 0.1;
    const fullEnd = (index + 1) * segment - segment * 0.1;
    const fadeOutEnd = Math.min(1, (index + 1) * segment + overlap);

    const isActive = useTransform(
        scrollYProgress,
        isLast
            ? [fadeInStart, fullStart]
            : [fadeInStart, fullStart, fullEnd, fadeOutEnd],
        isLast
            ? [0.35, 1]
            : [0.35, 1, 1, 0.35]
    );

    const [isFullyActive, setIsFullyActive] = useState(false);
    useMotionValueEvent(isActive, "change", (v) => setIsFullyActive(v > 0.85));

    const ChartComponent = chartComponents[index % chartComponents.length];

    return (
        <div
            className="relative grid grid-cols-[1fr_1fr] items-center py-6 gap-20"
        >
            {/* Colonna Sinistra */}
            <motion.div
                className="flex justify-end"
                style={{ opacity: isActive }}
            >
                {isLeft ? (
                    <StepCard step={step} index={index} color={color} isLeft={true} isFullyActive={isFullyActive} />
                ) : (
                    <ChartComponent color={color} isActive={isActive} />
                )}
            </motion.div>

            {/* Colonna Destra */}
            <motion.div
                className="flex justify-start"
                style={{ opacity: isActive }}
            >
                {isLeft ? (
                    <div className="w-full max-w-sm">
                        <ChartComponent color={color} isActive={isActive} />
                    </div>
                ) : (
                    <StepCard step={step} index={index} color={color} isLeft={false} isFullyActive={isFullyActive} />
                )}
            </motion.div>
        </div>
    );
};

const DemoTimeline = () => {
    const timelineRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 0.8", "end 0.2"]
    });

    const barHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const barOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
    const glowOpacity = useTransform(scrollYProgress, [0.04, 0.06], [0, 1]);

    return (
        <div className="hidden lg:block">
            {/* Header */}
            <div className="engine-timeline-container engine-timeline-title-container">
                <ScrollRevealText
                    text="Our proven process ensures clarity, efficiency, and exceptional results"
                    className="heading-h1 text-white text-center max-w-4xl mx-auto"
                />
                <motion.p
                    className="text-subheader max-w-2xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    Every stage is designed to deliver measurable impact, from strategy to scale
                </motion.p>
            </div>

            {/* Timeline */}
            <div className="engine-timeline-container">
                <div className="relative" ref={timelineRef}>
                    {/* Brutalist progress bar */}
                    {/* Glow tip — separate element, behind bar */}
                    <motion.div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[32px] pointer-events-none"
                        style={{
                            height: barHeight,
                            opacity: glowOpacity,
                            x: 2,
                        }}
                    >
                        <motion.div
                            className="absolute bottom-0 inset-x-0 h-6 rounded-2xl"
                            animate={{
                                boxShadow: [
                                    '0 4px 20px 8px rgba(34, 211, 238, 0.5)',
                                    '0 6px 28px 12px rgba(34, 211, 238, 0.65)',
                                    '0 4px 18px 6px rgba(34, 211, 238, 0.45)',
                                    '0 5px 24px 10px rgba(34, 211, 238, 0.6)',
                                    '0 4px 20px 8px rgba(34, 211, 238, 0.5)',
                                ],
                            }}
                            transition={{
                                boxShadow: { duration: 4.7, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        />
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[32px] rounded-2xl origin-top border border-slate-700 z-10"
                        style={{
                            height: barHeight,
                            opacity: barOpacity,
                            boxShadow: '3px 3px 0px rgba(34, 211, 238, 0.7)',
                        }}
                    >
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-slate-950" />
                            <ShaderBackground className="absolute inset-0" />
                        </div>
                    </motion.div>


                    {/* Steps */}
                    {processSteps.map((step, index) => (
                        <TimelineStep
                            key={step.step}
                            step={step}
                            index={index}
                            isLeft={index % 2 === 0}
                            isLast={index === processSteps.length - 1}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            {/* Hook text after timeline */}
            <div className="campaign-header text-right">
                <h3 className="heading-h2 text-white">
                    From Strategy to Scale
                </h3>
                <p className="text-subheader mt-4">
                    A systematic approach that transforms insights into growth. Every step is optimized for maximum impact.
                </p>
            </div>
        </div>
    );
};

export default DemoTimeline;
