import React from 'react';
import { cn } from '@/lib/utils';
import { WobbleCard } from '../../ui/wobble-card';
import { accentColors } from '../utils';

const FeatureCard = ({ feature, index, variant, h, fullWidth }) => {
    const isTablet = variant === 'tablet';
    const isFull = h === 'full';
    const accentColor = accentColors[index % accentColors.length];
    const variantColors = {
        cyan: "#06b6d4",
        purple: "#a855f7",
    };
    const titleColor = accentColor.startsWith("#") ? accentColor : (variantColors[accentColor] || variantColors.cyan);

    return (
        <WobbleCard
            containerClassName={cn(
                "bg-slate-950 border border-slate-800 hover:border-cyan-500/50",
                isTablet || fullWidth ? 'max-w-none' : 'max-w-[min(80vw,300px)] md:max-w-[min(80vw,320px)] laptop:max-w-none laptop:min-w-[350px]',
                isFull && "h-full"
            )}
            className={isTablet ? 'p-4' : 'p-6 py-6'}
        >
            <div className="relative z-10">
                {/* Title */}
                <h4 className="mb-2 text-xl font-semibold" style={{ color: titleColor }}>
                    {feature.title}
                </h4>
                {/* Description */}
                {isTablet ? (
                    <p className="text-body-sm text-slate-400">
                        {feature.description}
                    </p>
                ) : (
                    <>
                        <p className="text-body-sm text-slate-400 md:hidden">
                            {feature.description}
                        </p>
                        <p className="text-body-sm text-slate-400 hidden md:block">
                            {feature.description}
                        </p>
                    </>
                )}
            </div>
        </WobbleCard>
    );
};

export default FeatureCard;
