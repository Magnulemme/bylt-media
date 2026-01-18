import React from 'react';
import { useShaderBackground } from '@/hooks/useShaderBackground';

/**
 * ShaderBackground che usa lo sharedRenderer per performance ottimali.
 * Il WebGL context viene condiviso tra tutte le istanze e persiste tra le navigazioni.
 */
const ShaderBackgroundStandalone = ({ onReady = null }) => {
    const { containerRef, canvasRef } = useShaderBackground({
        priority: 1, // Alta priorità per l'hero
        targetFPS: 24, // 24fps per il grain effect
        enableVisibilityTracking: false, // Sempre visibile nell'hero
        onReady,
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                }}
            />
        </div>
    );
};

export default ShaderBackgroundStandalone;
