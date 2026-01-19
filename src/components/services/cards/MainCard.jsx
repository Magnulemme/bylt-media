import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MovingBorderButton } from '../../ui/moving-border-button';
import RotatingText from '../sections/RotatingText';
import VerticalLinesCanvas from '../sections/VerticalLinesCanvas';
import { WobbleCard } from '../../ui/wobble-card';

const MainCard = ({ service }) => {
    return (
        <WobbleCard
            containerClassName="bg-slate-950 border border-gray-800 hover:border-cyan-500/50 h-full"
            className="p-0 flex flex-col"
        >
            {/* Aurora Wave Background - extends into padding area */}
            <VerticalLinesCanvas className="-inset-4 md:-inset-6" />

            {/* Lighter overlay for better content visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60" />

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

            {/* Hero Image */}
            <div className="relative z-10 px-8 md:px-10">
                <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-lg h-48 md:h-56">
                    <Image
                        src={service.heroImage}
                        alt={service.title || 'Service image'}
                        fill
                        className="object-cover"
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
