import { useState, useEffect } from 'react';

// Generate large wave background for main card
export const useMainCardWaves = () => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');

        // Dark base
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, 600, 800);

        // 3-color gradient
        const colors = ['#06b6d4', '#8b5cf6', '#ec4899'];
        const parseHex = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        });
        const rgb1 = parseHex(colors[0]);
        const rgb2 = parseHex(colors[1]);
        const rgb3 = parseHex(colors[2]);

        const points = [];

        // Large flowing waves across the card
        for (let layer = 0; layer < 8; layer++) {
            const layerOffset = layer * 0.5;
            const amplitude = 30 + layer * 12;
            const frequency = 0.012 - layer * 0.001;
            const yBase = 80 + layer * 90;

            for (let x = 0; x < 600; x += 10) {
                const wave1 = Math.sin(x * frequency + layerOffset) * amplitude;
                const wave2 = Math.sin(x * frequency * 1.5 + layerOffset + 2) * amplitude * 0.3;
                const y = yBase + wave1 + wave2;
                const z = layer * 15 - 50;
                points.push({ x, y, z });
            }
        }

        // Sort by z for depth
        points.sort((a, b) => a.z - b.z);

        // Draw with gradient
        points.forEach(point => {
            const depth = (point.z + 50) / 120;
            const size = 1.5 + depth * 2;
            const opacity = 0.1 + depth * 0.4;

            // Color based on y position
            const t = Math.min(1, Math.max(0, point.y / 800));
            let r, g, b;
            if (t < 0.5) {
                const t2 = t * 2;
                r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t2);
                g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t2);
                b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t2);
            } else {
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

        ctx.globalAlpha = 1;
        setImageUrl(canvas.toDataURL('image/png'));
    }, []);

    return imageUrl;
};
