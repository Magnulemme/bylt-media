import { useState, useEffect } from 'react';

// Generate icon image with gradient background for dithering
export const useIconImage = (svgDataUrl, variant = 0) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (!svgDataUrl) return;

        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Pure black base
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 500, 500);

        // Smooth diagonal gradient (different direction per variant)
        const gradientConfigs = [
            { x1: 0, y1: 0, x2: 500, y2: 500 },
            { x1: 500, y1: 0, x2: 0, y2: 500 },
            { x1: 0, y1: 250, x2: 500, y2: 250 },
            { x1: 250, y1: 0, x2: 250, y2: 500 },
        ];
        const config = gradientConfigs[variant % gradientConfigs.length];

        const bgGradient = ctx.createLinearGradient(config.x1, config.y1, config.x2, config.y2);
        bgGradient.addColorStop(0, '#000000');
        bgGradient.addColorStop(0.5, '#454545');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 500, 500);

        // Subtle radial spotlight (different position per card)
        const spotPositions = [
            { x: 150, y: 150 },
            { x: 350, y: 150 },
            { x: 250, y: 350 },
            { x: 350, y: 350 },
        ];
        const spot = spotPositions[variant % spotPositions.length];
        const radial = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 250);
        radial.addColorStop(0, '#505050');
        radial.addColorStop(0.5, '#252525');
        radial.addColorStop(1, '#000000');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, 500, 500);
        ctx.globalCompositeOperation = 'source-over';

        // Load and draw the SVG icon
        const img = new Image();
        img.onload = () => {
            // Draw icon centered, scaled up
            const iconSize = 320;
            const x = (500 - iconSize) / 2;
            const y = (500 - iconSize) / 2;

            // Shadow for depth
            ctx.globalAlpha = 0.3;
            ctx.drawImage(img, x + 8, y + 8, iconSize, iconSize);
            ctx.globalAlpha = 1;

            // Main icon with slight glow effect
            ctx.drawImage(img, x, y, iconSize, iconSize);

            setImageUrl(canvas.toDataURL('image/png'));
        };
        img.src = svgDataUrl;
    }, [svgDataUrl, variant]);

    return imageUrl;
};

// Generate number image - balanced contrast for clean dithering
export const useNumberImage = (number, variant = 0) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Pure black base
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 500, 500);

        // Smooth diagonal gradient (different direction per variant)
        const gradientConfigs = [
            { x1: 0, y1: 0, x2: 500, y2: 500 },
            { x1: 500, y1: 0, x2: 0, y2: 500 },
            { x1: 0, y1: 250, x2: 500, y2: 250 },
        ];
        const config = gradientConfigs[variant % 3];

        const bgGradient = ctx.createLinearGradient(config.x1, config.y1, config.x2, config.y2);
        bgGradient.addColorStop(0, '#000000');
        bgGradient.addColorStop(0.5, '#454545');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 500, 500);

        // Subtle radial spotlight (attenuated, different position per card)
        const spotPositions = [
            { x: 150, y: 150 },
            { x: 350, y: 150 },
            { x: 250, y: 350 },
        ];
        const spot = spotPositions[variant % 3];
        const radial = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 250);
        radial.addColorStop(0, '#505050');
        radial.addColorStop(0.5, '#252525');
        radial.addColorStop(1, '#000000');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, 500, 500);
        ctx.globalCompositeOperation = 'source-over';

        // Number styling
        ctx.font = '900 420px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Shadow for depth
        ctx.fillStyle = '#000000';
        ctx.fillText(number.toString(), 258, 268);

        // Number with gradient
        const numGradient = ctx.createLinearGradient(100, 100, 400, 400);
        numGradient.addColorStop(0, '#ffffff');
        numGradient.addColorStop(0.5, '#aaaaaa');
        numGradient.addColorStop(1, '#ffffff');
        ctx.fillStyle = numGradient;
        ctx.fillText(number.toString(), 250, 260);

        setImageUrl(canvas.toDataURL('image/png'));
    }, [number, variant]);

    return imageUrl;
};
