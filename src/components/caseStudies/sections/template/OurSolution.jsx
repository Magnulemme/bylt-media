import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { getIcon, accentColors } from './utils';

const OurSolution = ({ solution }) => {
    if (!solution) return null;

    return (
        <div className="case-study-solution-section">
            <SectionHeader description={solution.description} />
            <PillarsGrid pillars={solution.pillars} />
        </div>
    );
};

// Section Header sub-component
const SectionHeader = ({ description }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-padding-md text-right"
        >
            <h2 className="heading-h2 text-white mb-4">
                The Solution
            </h2>
            <p className="text-subheader ml-auto max-w-2xl">
                {description}
            </p>
        </motion.div>
    );
};

// Pillars Grid sub-component
const PillarsGrid = ({ pillars }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
        ))}
    </div>
);

// Animated Wave Canvas for card background
const AnimatedWaveCardCanvas = ({ variant = 0 }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = 300;
        const height = 200;

        canvas.width = width;
        canvas.height = height;

        // 3-color gradients for each variant
        const gradients = [
            ['#06b6d4', '#8b5cf6', '#ec4899'],
            ['#8b5cf6', '#ec4899', '#f97316'],
            ['#10b981', '#06b6d4', '#8b5cf6'],
            ['#06b6d4', '#10b981', '#0ea5e9'],
        ];
        const [color1, color2, color3] = gradients[variant % gradients.length];

        const parseHex = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        });
        const rgb1 = parseHex(color1);
        const rgb2 = parseHex(color2);
        const rgb3 = parseHex(color3);

        const animate = (time) => {
            const t = time * 0.0004; // Much slower animation

            ctx.clearRect(0, 0, width, height);

            const points = [];

            if (variant % 3 === 0) {
                // Flowing sine waves
                for (let layer = 0; layer < 5; layer++) {
                    const layerOffset = layer * 0.7 + t * 0.3;
                    const amplitude = 15 + layer * 8;
                    const frequency = 0.025 - layer * 0.003;
                    const yBase = 40 + layer * 28;

                    for (let x = 0; x < width; x += 10) {
                        const wave1 = Math.sin(x * frequency + layerOffset) * amplitude;
                        const wave2 = Math.sin(x * frequency * 1.7 + layerOffset + 1.5) * amplitude * 0.35;
                        const y = yBase + wave1 + wave2;
                        const z = layer * 15 - 30;
                        points.push({ x: x + 20, y, z });
                    }
                }
            } else if (variant % 3 === 1) {
                // Intersecting wave grid
                const gridSize = 12;
                for (let i = 0; i < 22; i++) {
                    for (let j = 0; j < 14; j++) {
                        const baseX = i * gridSize + 30;
                        const baseY = j * gridSize + 15;

                        const wave1 = Math.sin(i * 0.35 + t * 0.25) * Math.cos(j * 0.4 + t * 0.2) * 18;
                        const wave2 = Math.cos(i * 0.2 + j * 0.3 + t * 0.15) * 12;
                        const z = wave1 + wave2;

                        const x = baseX + wave1 * 0.2;
                        const y = baseY + z * 0.3;

                        points.push({ x, y, z });
                    }
                }
            } else {
                // Soft breathing ripple - gentler pattern
                const centerX = 150;
                const centerY = 100;

                for (let ring = 0; ring < 8; ring++) {
                    const radius = 20 + ring * 16;
                    const pointsInRing = Math.floor(12 + ring * 3);

                    for (let i = 0; i < pointsInRing; i++) {
                        const angle = (i / pointsInRing) * Math.PI * 2;
                        // Gentle breathing effect instead of rotation
                        const breathe = Math.sin(t * 0.4 + ring * 0.3) * 6;
                        const r = radius + breathe;

                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r * 0.6;
                        const z = Math.sin(ring * 0.4 + t * 0.2) * 15;

                        points.push({ x, y, z });
                    }
                }
            }

            points.sort((a, b) => a.z - b.z);

            points.forEach(point => {
                const depth = (point.z + 40) / 80;
                const size = 1.2 + depth * 2;
                const opacity = 0.2 + depth * 0.6;

                const tx = Math.min(1, Math.max(0, point.x / width));
                let r, g, b;

                if (tx < 0.5) {
                    const t2 = tx * 2;
                    r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t2);
                    g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t2);
                    b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t2);
                } else {
                    const t2 = (tx - 0.5) * 2;
                    r = Math.round(rgb2.r + (rgb3.r - rgb2.r) * t2);
                    g = Math.round(rgb2.g + (rgb3.g - rgb2.g) * t2);
                    b = Math.round(rgb2.b + (rgb3.b - rgb2.b) * t2);
                }

                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.globalAlpha = opacity;
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [variant]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            style={{ objectFit: 'cover' }}
        />
    );
};

// Pillar Card sub-component
const PillarCard = ({ pillar, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const Icon = getIcon(pillar.icon);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl border border-slate-700/60 overflow-hidden hover:border-cyan-500/30 transition-[border-color,transform] duration-300 hover:-translate-y-1 shadow-[6px_6px_0px_rgba(34,211,238,1)]"
        >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-slate-950/10 backdrop-blur-xl" />

            {/* Animated Wave Background */}
            <AnimatedWaveCardCanvas variant={index} />

            {/* Content */}
            <div className="relative z-10 p-6">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                        boxShadow: `0 0 20px ${accentColor}10`
                    }}
                >
                    <Icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <h4 className="heading-h4 text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                </h4>
                <p className="text-body-sm">
                    {pillar.text}
                </p>
            </div>
        </motion.div>
    );
};

export default OurSolution;
