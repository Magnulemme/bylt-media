import React from 'react';
import { getIcon, accentColors } from '../utils';
import { useWaveBackground } from '../hooks';

const FeatureCard = ({ feature, index }) => {
    const Icon = getIcon(feature.icon);
    const waveBg = useWaveBackground(index);
    const accentColor = accentColors[index % accentColors.length];

    return (
        <div
            className="group relative rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
            style={{ minHeight: '140px' }}
        >
            {/* Wave Background */}
            {waveBg && (
                <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-slate-950/70" />

            {/* Content */}
            <div className="relative z-10 p-6">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                        boxShadow: `0 0 20px ${accentColor}10`
                    }}
                >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-inter">
                    {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
