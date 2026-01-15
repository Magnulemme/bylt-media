"use client";
import React, { useRef, useEffect } from 'react';

const AnimatedWaveCanvas = ({ variant = 1, className = '', colors = null, shape = 'blob' }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = 500;
        const height = 350;
        canvas.width = width;
        canvas.height = height;

        const centerX = width / 2;
        const centerY = height / 2;

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

            // Chart curve function with zigzag (descending trend)
            const getChartY = (xPos) => {
                const baseTrend = 0.28 + xPos * 0.44; // Descending (y increases = goes down)
                const zigzagFreq = 4.5;
                const zigzagPhase = xPos * zigzagFreq + t * 0.35;
                const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;
                const zigzagAmp = 0.06 + xPos * 0.03;
                return baseTrend + zigzag * zigzagAmp + Math.sin(t * 0.3) * 0.015;
            };

            const chartY = getChartY(nx);
            const zigzagFreq = 4.5;
            const zigzagPhase = nx * zigzagFreq + t * 0.35;
            const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;

            // Line thickness
            const thickness = 0.09 + Math.abs(zigzag) * 0.02 + Math.sin(t * 0.5) * 0.01;
            const distFromChart = Math.abs(ny - chartY);

            // Arrow tip - follows the base trend direction (downward)
            const tipX = 0.85;
            const tipY = 0.28 + tipX * 0.44 + Math.sin(t * 0.3) * 0.015;

            // Tangent direction: base trend goes down-right (dx positive, dy positive)
            const dirX = 1;
            const dirY = 0.44;
            const dirLen = Math.sqrt(dirX * dirX + dirY * dirY);
            const normDirX = dirX / dirLen;
            const normDirY = dirY / dirLen;

            // Perpendicular vector
            const perpX = -normDirY;
            const perpY = normDirX;

            // Arrow head parameters
            const arrowLength = 0.14;
            const arrowWidth = 0.10;

            // Vector from tip to current point
            const toPointX = nx - tipX;
            const toPointY = ny - tipY;

            // Project onto direction and perpendicular
            const alongDir = toPointX * normDirX + toPointY * normDirY;
            const alongPerp = toPointX * perpX + toPointY * perpY;

            // Triangle: starts at tip, extends forward along tangent
            const maxWidth = arrowWidth * (1 - alongDir / arrowLength);
            const inArrowHead = alongDir >= 0 && alongDir < arrowLength &&
                Math.abs(alongPerp) < maxWidth;

            // Body: slight overlap with arrow head for smooth transition
            const inside = distFromChart < thickness && nx > 0.08 && nx < tipX + 0.03;

            // Edge distance - use same scale as body for consistency
            const lineEdgeDist = inside ? (thickness - distFromChart) * 3 : 0;
            // Arrow uses similar calculation: distance from edge, scaled same as body
            const arrowEdgeDist = inArrowHead ? (maxWidth - Math.abs(alongPerp)) * 3 : 0;
            const edgeDist = Math.max(lineEdgeDist, arrowEdgeDist);

            return { inside: inside || inArrowHead, edgeDist: Math.max(0.1, edgeDist) };
        };

        // Upward zigzag growth chart shape function
        const isInsideGrowth = (x, y, t) => {
            const nx = x / width;
            const ny = y / height;

            // Chart curve function (base trend only for arrow, zigzag for body)
            const getChartY = (xPos) => {
                const baseTrend = 0.72 - xPos * 0.44;
                const zigzagFreq = 4.5;
                const zigzagPhase = xPos * zigzagFreq + t * 0.35;
                const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;
                const zigzagAmp = 0.06 + xPos * 0.03;
                return baseTrend + zigzag * zigzagAmp + Math.sin(t * 0.3) * 0.015;
            };

            const chartY = getChartY(nx);
            const zigzagFreq = 4.5;
            const zigzagPhase = nx * zigzagFreq + t * 0.35;
            const zigzag = Math.abs((zigzagPhase % 1) - 0.5) * 2 - 0.5;

            // Line thickness
            const thickness = 0.09 + Math.abs(zigzag) * 0.02 + Math.sin(t * 0.5) * 0.01;
            const distFromChart = Math.abs(ny - chartY);

            // Arrow tip - follows the base trend direction (upward)
            const tipX = 0.85;
            const tipY = 0.72 - tipX * 0.44 + Math.sin(t * 0.3) * 0.015;

            // Tangent direction: base trend goes up-right (dx positive, dy negative)
            const dirX = 1;
            const dirY = -0.44;
            const dirLen = Math.sqrt(dirX * dirX + dirY * dirY);
            const normDirX = dirX / dirLen;
            const normDirY = dirY / dirLen;

            // Perpendicular vector
            const perpX = -normDirY;
            const perpY = normDirX;

            // Arrow head parameters
            const arrowLength = 0.14;
            const arrowWidth = 0.10;

            // Vector from tip to current point
            const toPointX = nx - tipX;
            const toPointY = ny - tipY;

            // Project onto direction and perpendicular
            const alongDir = toPointX * normDirX + toPointY * normDirY;
            const alongPerp = toPointX * perpX + toPointY * perpY;

            // Triangle: starts at tip, extends forward along tangent
            const maxWidth = arrowWidth * (1 - alongDir / arrowLength);
            const inArrowHead = alongDir >= 0 && alongDir < arrowLength &&
                Math.abs(alongPerp) < maxWidth;

            // Body: slight overlap with arrow head for smooth transition
            const inside = distFromChart < thickness && nx > 0.08 && nx < tipX + 0.03;

            // Edge distance - use same scale as body for consistency
            const lineEdgeDist = inside ? (thickness - distFromChart) * 3 : 0;
            // Arrow uses similar calculation: distance from edge, scaled same as body
            const arrowEdgeDist = inArrowHead ? (maxWidth - Math.abs(alongPerp)) * 3 : 0;
            const edgeDist = Math.max(lineEdgeDist, arrowEdgeDist);

            return { inside: inside || inArrowHead, edgeDist: Math.max(0.1, edgeDist) };
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

            // Organic flowing particles
            for (let i = 0; i < 35; i++) {
                for (let j = 0; j < 25; j++) {
                    const baseX = (i / 34) * width;
                    const baseY = (j / 24) * height;

                    // Check if inside shape
                    const { inside, edgeDist } = isInsideShape(baseX, baseY, t);
                    if (!inside) continue;

                    // Wave displacement
                    const wave1 = Math.sin(i * 0.3 + t * 0.4) * Math.cos(j * 0.35 + t * 0.3) * 22;
                    const wave2 = Math.cos(i * 0.18 + j * 0.25 + t * 0.2) * 16;
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
                const depth = (point.z + 50) / 100;
                const size = 1.8 + depth * 2.5;
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
        };
    }, [variant, colors, shape]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }}
        />
    );
};

export default AnimatedWaveCanvas;
