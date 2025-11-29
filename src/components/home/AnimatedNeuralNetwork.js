import React from 'react';

// Optimized Animated SVG with reduced complexity
const AnimatedNeuralNetwork = () => {
    return (
        <svg
            className="animated-neural-bg"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 100 100"
            style={{
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <defs>
                <radialGradient id="node-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: 'var(--minimal-accent)', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--minimal-accent)', stopOpacity: 0 }} />
                </radialGradient>
            </defs>
            <style>
                {`
                    .animated-neural-bg .node {
                        fill: var(--minimal-accent);
                        animation: simplePulse 6s ease-in-out infinite alternate;
                        will-change: transform, opacity;
                    }
                    .animated-neural-bg .glow {
                        fill: url(#node-glow);
                        animation: simplePulse 6s ease-in-out infinite alternate;
                        will-change: transform, opacity;
                    }
                    .animated-neural-bg .connection {
                        stroke: var(--minimal-subtle);
                        stroke-width: 0.1;
                        stroke-dasharray: 2;
                        stroke-dashoffset: 4;
                        animation: simpleDash 8s linear infinite;
                        opacity: 0.3;
                        will-change: stroke-dashoffset;
                    }
                    @keyframes simplePulse {
                        0% { transform: scale3d(0.9, 0.9, 1); opacity: 0.6; }
                        100% { transform: scale3d(1.1, 1.1, 1); opacity: 0.9; }
                    }
                    @keyframes simpleDash {
                        to { stroke-dashoffset: 0; }
                    }
                `}
            </style>
            <g>
                {/* Reduced from 5 nodes to 3 for better performance */}
                <circle cx="30" cy="30" r="1" className="node" style={{ animationDelay: '0s' }} />
                <circle cx="30" cy="30" r="2" className="glow" style={{ animationDelay: '0s' }} />
                <circle cx="70" cy="70" r="1" className="node" style={{ animationDelay: '-2s' }} />
                <circle cx="70" cy="70" r="2" className="glow" style={{ animationDelay: '-2s' }} />
                <circle cx="50" cy="50" r="1" className="node" style={{ animationDelay: '-4s' }} />
                <circle cx="50" cy="50" r="2" className="glow" style={{ animationDelay: '-4s' }} />

                {/* Reduced connections for better performance */}
                <line x1="30" y1="30" x2="50" y2="50" className="connection" />
                <line x1="50" y1="50" x2="70" y2="70" className="connection" />
                <line x1="30" y1="30" x2="70" y2="70" className="connection" style={{ animationDelay: '-1s' }} />
            </g>
        </svg>
    );
};

export default AnimatedNeuralNetwork;
