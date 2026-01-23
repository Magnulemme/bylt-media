import { useState, useEffect } from 'react';
import {
    Car, Target, Users, TrendingUp, Search, Code, Rocket,
    MousePointerClick, Building, Clock, Globe, Briefcase, User
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
export const iconMap = {
    Car, Target, Users, TrendingUp, Search, Code, Rocket,
    MousePointerClick, Building, Clock, Globe, Briefcase, User
};

export const getIcon = (iconName) => iconMap[iconName] || Target;

// Dither patterns for variety
export const ditherPatterns = ['bayer', 'halftone', 'crosshatch'];

// Generate icon image for dither shader - renders icon with stylized background
export const useIconImage = (iconName, variant = 0) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Pure black base
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 200, 200);

        // Smooth diagonal gradient (different direction per variant)
        const gradientConfigs = [
            { x1: 0, y1: 0, x2: 200, y2: 200 },
            { x1: 200, y1: 0, x2: 0, y2: 200 },
            { x1: 0, y1: 100, x2: 200, y2: 100 },
            { x1: 100, y1: 0, x2: 100, y2: 200 },
        ];
        const config = gradientConfigs[variant % 4];

        const bgGradient = ctx.createLinearGradient(config.x1, config.y1, config.x2, config.y2);
        bgGradient.addColorStop(0, '#000000');
        bgGradient.addColorStop(0.5, '#404040');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 200, 200);

        // Subtle radial spotlight
        const spotPositions = [
            { x: 60, y: 60 },
            { x: 140, y: 60 },
            { x: 100, y: 140 },
            { x: 100, y: 100 },
        ];
        const spot = spotPositions[variant % 4];
        const radial = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 100);
        radial.addColorStop(0, '#505050');
        radial.addColorStop(0.5, '#252525');
        radial.addColorStop(1, '#000000');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, 200, 200);
        ctx.globalCompositeOperation = 'source-over';

        // Get SVG path data for the icon
        const iconPaths = {
            Car: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2 M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
            Target: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
            Users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
            TrendingUp: 'M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6',
            Search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.35-4.35',
            Code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
            Rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
            MousePointerClick: 'M9 9l5 12 1.8-5.2L21 14Z M7.2 2.2L8 5.1 M5.1 8l-2.9-.8 M14 4.1L12 6 M6 12l-1.9 2',
            Building: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2 M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2 M10 6h4 M10 10h4 M10 14h4 M10 18h4',
            Clock: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M12 6v6l4 2',
            Globe: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z',
            Briefcase: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z M12 14v4',
            User: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M20 21a8 8 0 1 0-16 0',
        };

        const pathData = iconPaths[iconName] || iconPaths.Target;

        // Draw the icon
        ctx.save();
        ctx.translate(100, 100);
        ctx.scale(5.5, 5.5);
        ctx.translate(-12, -12);

        // Shadow for depth
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const shadowPath = new Path2D(pathData);
        ctx.save();
        ctx.translate(0.3, 0.3);
        ctx.stroke(shadowPath);
        ctx.restore();

        // Icon with gradient
        const iconGradient = ctx.createLinearGradient(4, 4, 20, 20);
        iconGradient.addColorStop(0, '#ffffff');
        iconGradient.addColorStop(0.5, '#b0b0b0');
        iconGradient.addColorStop(1, '#ffffff');
        ctx.strokeStyle = iconGradient;
        ctx.lineWidth = 2;
        const iconPath = new Path2D(pathData);
        ctx.stroke(iconPath);

        ctx.restore();

        setImageUrl(canvas.toDataURL('image/png'));
    }, [iconName, variant]);

    return imageUrl;
};

// Accent colors matching the site design
export const accentColors = ['#06b6d4', '#0ea5e9', '#14b8a6', '#10b981'];

// Generate 3D wave background with dots - contemporary generative art style
export const useWaveBackground = (variant = 0) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');

        // Dark base
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, 500, 250);

        // 3-color gradients for each variant [start, mid, end]
        const gradients = [
            ['#06b6d4', '#8b5cf6', '#ec4899'], // Cyan -> Purple -> Pink
            ['#8b5cf6', '#ec4899', '#f97316'], // Purple -> Pink -> Orange
            ['#10b981', '#06b6d4', '#8b5cf6'], // Green -> Cyan -> Purple
            ['#06b6d4', '#10b981', '#0ea5e9'], // Cyan -> Green -> Blue
        ];
        const [color1, color2, color3] = gradients[variant % gradients.length];

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

        if (variant % 3 === 0) {
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
        } else if (variant % 3 === 1) {
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

        // Add subtle glow with middle color
        ctx.globalAlpha = 0.12;
        const glowX = variant % 3 === 2 ? 370 : 300;
        const glow = ctx.createRadialGradient(glowX, 125, 0, glowX, 125, 150);
        glow.addColorStop(0, color2);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 500, 250);

        ctx.globalAlpha = 1;
        setImageUrl(canvas.toDataURL('image/png'));
    }, [variant]);

    return imageUrl;
};
