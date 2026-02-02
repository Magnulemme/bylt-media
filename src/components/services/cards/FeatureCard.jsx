import React from 'react';
import { getIcon, accentColors } from '../utils';
import { useWaveBackground } from '../hooks';
import { WobbleCard } from '../../ui/wobble-card';

const FeatureCard = ({ feature, index, variant }) => {
    const Icon = getIcon(feature.icon);
    const waveBg = useWaveBackground(index);
    const accentColor = accentColors[index % accentColors.length];

    // Per tablet variant, sempre shortDescription
    const isTablet = variant === 'tablet';

    return (
        <WobbleCard
            containerClassName={`h-full min-h-[140px] bg-slate-950 border border-slate-800 hover:border-cyan-500/50 ${
                isTablet ? 'max-w-none' : 'max-w-[min(80vw,300px)] md:max-w-[min(80vw,320px)] xl:max-w-none'
            }`}
            className={isTablet ? 'p-4' : 'p-6 py-6'}
        >
            {/* Wave Background */}
            {waveBg && (
                <div
                    className="absolute inset-0 transition-opacity duration-300 z-0"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Dark overlay — allineato a MainCard */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />

            {/* Content */}
            <div className="relative z-10">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                        boxShadow: `0 0 20px ${accentColor}10`
                    }}
                >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <h3 className="heading-h4 text-white mb-2">
                    {feature.title}
                </h3>
                {isTablet ? (
                    <p className="text-body leading-relaxed">
                        {feature.shortDescription}
                    </p>
                ) : (
                    <>
                        <p className="text-body leading-relaxed md:hidden">
                            {feature.shortDescription}
                        </p>
                        <p className="text-body leading-relaxed hidden md:block">
                            {feature.description}
                        </p>
                    </>
                )}
            </div>
        </WobbleCard>
    );
};

export default FeatureCard;
