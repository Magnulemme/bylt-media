import React from 'react';
import { useShaderBackground } from '@/hooks/useShaderBackground';

/**
 * ShaderBackground - Componente che usa lo shared renderer
 *
 * Props:
 * - colors: { color1, color2, color3 } - Colori del gradiente (hex numbers)
 * - priority: number - Priorità di rendering (0 = più alta)
 * - targetFPS: number - Target FPS per l'animazione
 * - className: string - Classe CSS aggiuntiva
 * - style: object - Stili inline aggiuntivi
 */
const ShaderBackground = ({
    colors,
    priority = 5,
    targetFPS = 24,
    className = '',
    style = {},
}) => {
    const { containerRef, canvasRef } = useShaderBackground({
        colors,
        priority,
        targetFPS,
        enableVisibilityTracking: true,
        visibilityThreshold: 0.1,
    });

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                    display: 'block',
                }}
            />
        </div>
    );
};

export default ShaderBackground;
