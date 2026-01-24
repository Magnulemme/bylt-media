"use client";
import React, { useRef, useEffect } from 'react';

const AnimatedWaveCanvas = ({ variant = 1, className = '', colors = null, shape = 'blob' }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Reference aspect ratio (original design)
        const refAspect = 500 / 350;

        // Calculate canvas size: use full width, height based on aspect ratio
        const updateSize = () => {
            const parentWidth = container.clientWidth;

            if (parentWidth === 0) {
                return { width: 500, height: 350 }; // Fallback
            }

            const canvasWidth = parentWidth;
            const canvasHeight = parentWidth / refAspect;

            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            return { width: canvasWidth, height: canvasHeight };
        };

        let { width, height } = updateSize();
        let centerX = width / 2;
        let centerY = height / 2;

        // Handle resize
        const handleResize = () => {
            const size = updateSize();
            width = size.width;
            height = size.height;
            centerX = width / 2;
            centerY = height / 2;
        };
        window.addEventListener('resize', handleResize);

        // Use custom colors or shape-specific defaults
        const getDefaultColors = () => {
            if (shape === 'arrow') {
                return ['#f97316', '#ef4444', '#dc2626']; // orange-500 → red-500 → red-600
            }
            return ['#06b6d4', '#8b5cf6', '#10b981']; // cyan → purple → emerald
        };
        const defaultColors = getDefaultColors();
        const color1 = colors?.[0] || defaultColors[0];
        const color2 = colors?.[1] || defaultColors[1];
        const color3 = colors?.[2] || defaultColors[2];

        const parseHex = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        });
        const rgb1 = parseHex(color1);
        const rgb2 = parseHex(color2);
        const rgb3 = parseHex(color3);

        // Organic blob shape function
        const isInsideBlob = (x, y, t) => {
            const dx = (x - centerX) / (width * 0.42);
            const dy = (y - centerY) / (height * 0.42);
            const angle = Math.atan2(dy, dx);
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Animated organic blob radius
            const blobRadius = 1
                + Math.sin(angle * 3 + t * 0.3) * 0.15
                + Math.sin(angle * 2 - t * 0.2) * 0.1
                + Math.cos(angle * 4 + t * 0.25) * 0.08;

            return { inside: dist < blobRadius, edgeDist: blobRadius - dist };
        };

        // Downward arrow/chart shape function with zigzag
        const isInsideArrow = (x, y, t) => {
            const nx = x / width;
            const ny = y / height;

            // Chart curve function with zigzag (descending trend) - steeper slope
            const slope = 0.55;
            const zigzagFreq = 4.5;
            const zigzagAmpBase = 0.05;
            const zigzagAmpGrow = 0.02;

            const getChartY = (xPos) => {
                const baseTrend = 0.18 + xPos * slope;
                const zigzagPhase = xPos * zigzagFreq + t * 0.35;
                const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;
                const zigzagAmp = zigzagAmpBase + xPos * zigzagAmpGrow;
                return baseTrend + zigzag * zigzagAmp + Math.sin(t * 0.3) * 0.015;
            };

            const chartY = getChartY(nx);
            const zigzagPhase = nx * zigzagFreq + t * 0.35;
            const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;

            // Line thickness - increases towards tip for arrow effect
            const baseThickness = 0.09 + Math.abs(zigzag) * 0.02 + Math.sin(t * 0.5) * 0.01;
            const tipX = 0.92;
            const wideningStart = 0.5;
            const tipProgress = Math.max(0, (nx - wideningStart) / (tipX - wideningStart));
            const thickness = baseThickness * (1 + tipProgress * 2.5);

            const distFromChart = Math.abs(ny - chartY);

            // Body with gradual widening towards tip
            const inside = distFromChart < thickness && nx > 0.08 && nx < tipX;

            // Taper at the end for pointed triangle tip
            const taperStart = 0.68;
            let taperFactor = 1;
            if (nx > taperStart) {
                const taperProgress = (nx - taperStart) / (tipX - taperStart);
                taperFactor = 1 - taperProgress;
            }
            const taperInside = distFromChart < thickness * taperFactor && nx > 0.08 && nx <= tipX;

            const finalInside = nx < taperStart ? inside : taperInside;

            // Edge distance
            const effectiveThickness = nx < taperStart ? thickness : thickness * taperFactor;
            const edgeDist = finalInside ? (effectiveThickness - distFromChart) * 3 : 0;

            return { inside: finalInside, edgeDist: Math.max(0.1, edgeDist) };
        };

        // Upward zigzag growth chart shape function
        const isInsideGrowth = (x, y, t) => {
            const nx = x / width;
            const ny = y / height;

            // Chart curve function with zigzag (ascending trend) - steeper slope
            const slope = 0.55;
            const zigzagFreq = 4.5;
            const zigzagAmpBase = 0.05;
            const zigzagAmpGrow = 0.02;

            const getChartY = (xPos) => {
                const baseTrend = 0.82 - xPos * slope;
                const zigzagPhase = xPos * zigzagFreq + t * 0.35;
                const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;
                const zigzagAmp = zigzagAmpBase + xPos * zigzagAmpGrow;
                return baseTrend + zigzag * zigzagAmp + Math.sin(t * 0.3) * 0.015;
            };

            const chartY = getChartY(nx);
            const zigzagPhase = nx * zigzagFreq + t * 0.35;
            const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;

            // Line thickness - increases towards tip for arrow effect
            const baseThickness = 0.09 + Math.abs(zigzag) * 0.02 + Math.sin(t * 0.5) * 0.01;
            const tipX = 0.92;
            const wideningStart = 0.5;
            const tipProgress = Math.max(0, (nx - wideningStart) / (tipX - wideningStart));
            const thickness = baseThickness * (1 + tipProgress * 2.5);

            const distFromChart = Math.abs(ny - chartY);

            // Body with gradual widening towards tip
            const inside = distFromChart < thickness && nx > 0.08 && nx < tipX;

            // Taper at the end for pointed triangle tip
            const taperStart = 0.68;
            let taperFactor = 1;
            if (nx > taperStart) {
                const taperProgress = (nx - taperStart) / (tipX - taperStart);
                taperFactor = 1 - taperProgress;
            }
            const taperInside = distFromChart < thickness * taperFactor && nx > 0.08 && nx <= tipX;

            const finalInside = nx < taperStart ? inside : taperInside;

            // Edge distance
            const effectiveThickness = nx < taperStart ? thickness : thickness * taperFactor;
            const edgeDist = finalInside ? (effectiveThickness - distFromChart) * 3 : 0;

            return { inside: finalInside, edgeDist: Math.max(0.1, edgeDist) };
        };

        const getShapeFunction = () => {
            switch (shape) {
                case 'arrow': return isInsideArrow;
                case 'growth': return isInsideGrowth;
                default: return isInsideBlob;
            }
        };
        const isInsideShape = getShapeFunction();

        const animate = (time) => {
            const t = time * 0.001;

            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, width, height);

            const points = [];

            // Scale factor based on reference size (500x350)
            const sizeScale = Math.min(width, height) / 350;

            // Organic flowing particles
            for (let i = 0; i < 35; i++) {
                for (let j = 0; j < 25; j++) {
                    const baseX = (i / 34) * width;
                    const baseY = (j / 24) * height;

                    // Check if inside shape
                    const { inside, edgeDist } = isInsideShape(baseX, baseY, t);
                    if (!inside) continue;

                    // Wave displacement (scaled)
                    const wave1 = Math.sin(i * 0.3 + t * 0.4) * Math.cos(j * 0.35 + t * 0.3) * 22 * sizeScale;
                    const wave2 = Math.cos(i * 0.18 + j * 0.25 + t * 0.2) * 16 * sizeScale;
                    const z = wave1 + wave2;

                    const x = baseX + wave1 * 0.2;
                    const y = baseY + z * 0.3;

                    // Fade near edges
                    const edgeFade = Math.min(1, edgeDist * 4);

                    points.push({ x, y, z, edgeFade });
                }
            }

            points.sort((a, b) => a.z - b.z);

            points.forEach(point => {
                const depth = (point.z / sizeScale + 50) / 100;
                const size = (1.8 + depth * 2.5) * sizeScale;
                const baseOpacity = 0.4 + depth * 0.6;
                const opacity = baseOpacity * point.edgeFade;

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
            window.removeEventListener('resize', handleResize);
        };
    }, [variant, colors, shape]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', background: '#020617' }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
};

export default AnimatedWaveCanvas;
