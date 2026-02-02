import React from 'react';
import Image from 'next/image';
import RotatingText from '../sections/RotatingText';

import { WobbleCard } from '../../ui/wobble-card';

const MainCard = ({ service }) => {
    return (
        <WobbleCard
            containerClassName="bg-slate-950 border border-slate-800 hover:border-cyan-500/50 h-full"
            className="p-0 py-4 flex flex-col"
        >

            {/* Text Content with Rotating Text */}
            <div className="relative z-10 p-6 md:p-8">
                <h1 className="heading-page">
                    <RotatingText
                        phrases={service.rotatingPhrases}
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
                    />
                </h1>
                <p className="text-body-lg leading-relaxed">
                    {service.description}
                </p>
            </div>

            {/* Hero Image */}
            <div className="relative z-10 px-6 md:px-8">
                <div className="relative rounded-xl overflow-hidden border border-slate-700/50 shadow-lg h-48 md:h-56">
                    <Image
                        src={service.heroImage}
                        alt={service.title || 'Service image'}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Stats */}
            {service.details?.stats && (
                <div className="relative z-10 grid grid-cols-3 gap-4 px-6 md:px-8 py-6 md:py-8">
                    {service.details.stats.slice(0, 3).map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </WobbleCard>
    );
};

export default MainCard;
