"use client";
import React, { useRef, useEffect } from 'react';

const AnimatedWaveCanvas = ({ variant = 1, className = '' }) => {
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

        // Bento card accent colors
        const color1 = '#06b6d4'; // cyan
        const color2 = '#8b5cf6'; // purple
        const color3 = '#10b981'; // emerald

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

                    // Check if inside blob
                    const { inside, edgeDist } = isInsideBlob(baseX, baseY, t);
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
                const baseOpacity = 0.25 + depth * 0.65;
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

            // Soft glow at center
            ctx.globalAlpha = 0.12;
            const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160);
            glow.addColorStop(0, color2);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

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
