import React from 'react';
import { DitherShader } from '../../ui/dither-shader';
import { useNumberImage } from '../hooks';
import { ditherPatterns, accentColors } from '../utils';
import { WobbleCard } from '../../ui/wobble-card';

const ProcessCard = ({ step, index }) => {
    const numberImage = useNumberImage(step.step, index);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <WobbleCard
            containerClassName="group bg-slate-950 border border-gray-800 hover:border-cyan-500/50 h-52 cursor-pointer"
            className="p-0"
        >
            {/* Dither Background */}
            <div className="absolute inset-0">
                {numberImage && (
                    <DitherShader
                        src={numberImage}
                        colorMode="duotone"
                        primaryColor="#020617"
                        secondaryColor={accentColor}
                        ditherMode={ditherPatterns[index % ditherPatterns.length]}
                        gridSize={6}
                        threshold={0.4}
                        contrast={1.2}
                    />
                )}
            </div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.6) 100%)'
            }} />

            {/* Bottom gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent group-hover:from-slate-950 group-hover:via-slate-950/70 transition-all duration-300" />

            {/* Default State - Title at bottom (desktop only) */}
            <div className="absolute inset-0 hidden md:flex flex-col justify-end p-6 transition-all duration-300 group-hover:opacity-0">
                <h3 className="text-lg font-bold text-white font-inter drop-shadow-lg">
                    {step.title}
                </h3>
            </div>

            {/* Mobile/Tablet - Title only at bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:hidden">
                <h3 className="text-lg font-bold text-white font-inter drop-shadow-lg">
                    {step.title}
                </h3>
            </div>

            {/* Desktop Hover State - Full Content */}
            <div className="absolute inset-0 hidden lg:flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-lg font-bold text-white font-inter mb-3">
                    {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                </p>
            </div>
        </WobbleCard>
    );
};

export default ProcessCard;
