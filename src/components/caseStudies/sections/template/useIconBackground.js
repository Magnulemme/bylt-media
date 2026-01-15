import { useState, useEffect } from 'react';

const ICON_PATHS = {
    User: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
    Car: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2 M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M17 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
    Clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M12 6v6l4 2',
    Globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z'
};

export const useIconBackground = (iconName, variant = 0) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const size = 400;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Dark base with subtle gradient
        const bgGradient = ctx.createRadialGradient(
            size / 2, size / 2, 0,
            size / 2, size / 2, size * 0.7
        );
        bgGradient.addColorStop(0, '#0f172a');
        bgGradient.addColorStop(1, '#020617');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, size, size);

        // Subtle cyan glow in center
        const glowGradient = ctx.createRadialGradient(
            size / 2, size / 2, 0,
            size / 2, size / 2, size * 0.5
        );
        glowGradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        glowGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, size, size);

        // Draw the icon
        const iconPath = ICON_PATHS[iconName];
        if (iconPath) {
            ctx.save();

            const iconScale = 12;
            const iconSize = 24 * iconScale;
            const offsetX = (size - iconSize) / 2;
            const offsetY = (size - iconSize) / 2;

            ctx.translate(offsetX, offsetY);
            ctx.scale(iconScale, iconScale);

            const path = new Path2D(iconPath);
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2 / iconScale;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke(path);

            ctx.restore();
        }

        setImageUrl(canvas.toDataURL('image/png'));
    }, [iconName, variant]);

    return imageUrl;
};
