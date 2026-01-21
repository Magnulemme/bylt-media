import { useState, useEffect } from 'react';

// Generate 3D wave background with dots - contemporary generative art style
export const useWaveBackground = (variant = 0, transparent = false) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');

        // Dark base (skip if transparent for mask usage)
        if (!transparent) {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, 500, 250);
        }

        // 3-color gradients for each variant [start, mid, end]
        const gradients = [
            ['#06b6d4', '#8b5cf6', '#ec4899'], // Cyan -> Purple -> Pink
            ['#8b5cf6', '#ec4899', '#f97316'], // Purple -> Pink -> Orange
            ['#10b981', '#06b6d4', '#8b5cf6'], // Green -> Cyan -> Purple
        ];
        const [color1, color2, color3] = gradients[variant % 3];

        // Parse hex to RGB for interpolation
        const parseHex = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        });
        const rgb1 = parseHex(color1);
        const rgb2 = parseHex(color2);
        const rgb3 = parseHex(color3);

        const points = [];

        if (variant === 0) {
            // Flowing sine waves - multiple layers creating depth
            for (let layer = 0; layer < 6; layer++) {
                const layerOffset = layer * 0.7;
                const amplitude = 20 + layer * 10;
                const frequency = 0.02 - layer * 0.002;
                const yBase = 60 + layer * 30;

                for (let x = 0; x < 500; x += 7) {
                    const wave1 = Math.sin(x * frequency + layerOffset) * amplitude;
                    const wave2 = Math.sin(x * frequency * 1.7 + layerOffset + 1.5) * amplitude * 0.35;
                    const y = yBase + wave1 + wave2;
                    const z = layer * 20 - 50;
                    points.push({ x: x + 30, y, z });
                }
            }
        } else if (variant === 1) {
            // Intersecting wave grid - creates dynamic mesh effect
            const gridSize = 14;
            for (let i = 0; i < 30; i++) {
                for (let j = 0; j < 16; j++) {
                    const baseX = i * gridSize + 60;
                    const baseY = j * gridSize + 15;

                    // Wave displacement creating 3D surface
                    const wave1 = Math.sin(i * 0.35) * Math.cos(j * 0.4) * 25;
                    const wave2 = Math.cos(i * 0.2 + j * 0.3) * 18;
                    const z = wave1 + wave2;

                    const x = baseX + wave1 * 0.25;
                    const y = baseY + z * 0.35;

                    points.push({ x, y, z });
                }
            }
        } else {
            // Ripple waves - concentric emanating from offset center
            const centerX = 370;
            const centerY = 125;

            for (let ring = 0; ring < 14; ring++) {
                const radius = 15 + ring * 16;
                const pointsInRing = Math.floor(10 + ring * 3.5);

                for (let i = 0; i < pointsInRing; i++) {
                    const angle = (i / pointsInRing) * Math.PI * 2;
                    const waveOffset = Math.sin(ring * 0.7) * 18;
                    const r = radius + waveOffset;

                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r * 0.55;
                    const z = Math.sin(ring * 0.6) * 45 + Math.cos(angle * 2) * 12;

                    points.push({ x, y, z });
                }
            }
        }

        // Sort by z for depth effect
        points.sort((a, b) => a.z - b.z);

        // Draw points with 3-color gradient based on x position
        points.forEach(point => {
            const depth = (point.z + 60) / 120;
            const size = 1.3 + depth * 2.4;
            const opacity = 0.18 + depth * 0.7;

            // Interpolate across 3 colors based on x position
            const t = Math.min(1, Math.max(0, point.x / 500));
            let r, g, b;

            if (t < 0.5) {
                // First half: color1 -> color2
                const t2 = t * 2;
                r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t2);
                g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t2);
                b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t2);
            } else {
                // Second half: color2 -> color3
                const t2 = (t - 0.5) * 2;
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

        // Add subtle glow with middle color
        ctx.globalAlpha = 0.12;
        const glowX = variant === 2 ? 370 : 300;
        const glow = ctx.createRadialGradient(glowX, 125, 0, glowX, 125, 150);
        glow.addColorStop(0, color2);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 500, 250);

        ctx.globalAlpha = 1;
        setImageUrl(canvas.toDataURL('image/png'));
    }, [variant, transparent]);

    return imageUrl;
};
