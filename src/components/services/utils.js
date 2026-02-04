import * as LucideIcons from 'lucide-react';

// Icon resolver - converts string name to Lucide component
export const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Circle;
};

// Different dither patterns for each step
export const ditherPatterns = ['bayer', 'halftone', 'crosshatch'];

// Different accent colors for each card
export const accentColors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];
