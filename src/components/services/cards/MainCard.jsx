import React from 'react';
import Link from 'next/link';
import { DitherShader } from '../../ui/dither-shader';
import { MovingBorderButton } from '../../ui/moving-border-button';
import { useMainCardWaves } from '../hooks';
import RotatingText from '../sections/RotatingText';
import { WobbleCard } from '../../ui/wobble-card';

const MainCard = ({ service }) => {
    const waveBg = useMainCardWaves();

    return (
        <WobbleCard
            containerClassName="bg-slate-950 border border-gray-800 hover:border-cyan-500/50 h-full"
            className="p-0 flex flex-col"
        >
            {/* Wave Background - increased visibility */}
            {waveBg && (
                <div
                    className="absolute inset-0 opacity-70"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Lighter overlay for better wave visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950/70" />

            {/* Text Content with Rotating Text */}
            <div className="relative z-10 p-6 md:p-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter">
            <RotatingText
                        phrases={service.rotatingPhrases}
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
                    />
                </h1>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {service.description}
                </p>
            </div>

            {/* Image with DitherShader */}
            <div className="relative z-10 px-8 md:px-10">
                <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-lg h-48 md:h-56">
                    <DitherShader
                        src={service.heroImage}
                        colorMode="grayscale"
                        ditherMode="bayer"
                        gridSize={4}
                        threshold={0.5}
                        contrast={1.1}
                    />
                </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 flex flex-1 items-center justify-center w-full py-8 md:py-10">
                <Link href="/contact">
                    <MovingBorderButton
                        borderRadius="0.75rem"
                        containerClassName="min-w-[240px] h-16"
                        borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                        className="border-2 border-slate-700/80 text-white font-bold text-base bg-slate-950"
                        duration={2500}
                    >
                        Get in Touch
                    </MovingBorderButton>
                </Link>
            </div>
        </WobbleCard>
    );
};

export default MainCard;
